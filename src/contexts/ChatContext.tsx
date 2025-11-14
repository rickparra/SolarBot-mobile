import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ref, push, set, query, limitToLast, onValue, off, remove } from 'firebase/database';
import { database } from '../config/firebase';
import { mockOpenAI } from '../lib/mockOpenAI';
import { geminiAPI } from '../lib/geminiAPI';
import { useLLM } from './LLMContext';
import { useAuth } from './AuthContext';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  createdAt: number;
}

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  sendMessage: (content: string) => Promise<void>;
  clearMessages: () => Promise<void>;
  isSyncing: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

const MAX_MESSAGES = 50; // Limite de mensagens no Firebase

export const ChatProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const { config, hasApiKey } = useLLM();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync messages with Firebase
  useEffect(() => {
    if (!user) {
      setMessages([]);
      return;
    }

    setIsSyncing(true);
    const messagesRef = ref(database, `users/${user.id}/messages`);
    const messagesQuery = query(messagesRef, limitToLast(MAX_MESSAGES));

    // Listen to messages in real-time
    const unsubscribe = onValue(messagesQuery, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert Firebase object to array and sort by createdAt
        const messagesArray: Message[] = Object.entries(data).map(([id, msg]: [string, any]) => ({
          id,
          role: msg.role,
          content: msg.content,
          createdAt: msg.createdAt,
        })).sort((a, b) => a.createdAt - b.createdAt);
        
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
      setIsSyncing(false);
    }, (error) => {
      console.error('Error syncing messages:', error);
      setIsSyncing(false);
    });

    return () => {
      off(messagesQuery);
    };
  }, [user]);

  // Helper function to save message to Firebase
  const saveMessageToFirebase = async (message: Message) => {
    if (!user) return;

    try {
      const messagesRef = ref(database, `users/${user.id}/messages`);
      const newMessageRef = push(messagesRef);
      
      await set(newMessageRef, {
        role: message.role,
        content: message.content,
        createdAt: message.createdAt,
      });

      // Check if we need to remove old messages
      const allMessagesRef = ref(database, `users/${user.id}/messages`);
      onValue(allMessagesRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const messageIds = Object.keys(data);
          if (messageIds.length > MAX_MESSAGES) {
            // Remove oldest messages
            const messagesToRemove = messageIds
              .map(id => ({ id, createdAt: data[id].createdAt }))
              .sort((a, b) => a.createdAt - b.createdAt)
              .slice(0, messageIds.length - MAX_MESSAGES);

            messagesToRemove.forEach(async (msg) => {
              const msgRef = ref(database, `users/${user.id}/messages/${msg.id}`);
              await remove(msgRef);
            });
          }
        }
      }, { onlyOnce: true });
    } catch (error) {
      console.error('Error saving message to Firebase:', error);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      createdAt: Date.now(),
    };

    // Save user message to Firebase
    await saveMessageToFirebase(userMessage);

    console.log('💭 [CHAT] Preparando mensagem...');
    console.log('📨 [CHAT] Conteúdo:', content.substring(0, 50) + '...');
    console.log('🔑 [CHAT] Usando API Key:', hasApiKey ? 'SIM' : 'NÃO (modo mock)');
    
    setIsLoading(true);
    setError(null);

    try {
      const requestPayload = {
        model: hasApiKey ? 'gemini-2.5-flash' : 'gpt-4o-mini',
        messages: [
          {
            role: 'system' as const,
            content: 'Você é um assistente técnico especializado em energia solar fotovoltaica.',
          },
          ...messages.slice(-10).map(m => ({ role: m.role, content: m.content })),
          { role: 'user' as const, content: content.trim() },
        ],
        temperature: 0.3,
        max_tokens: 2000,
      };

      console.log('📡 [CHAT] Enviando para API...');
      console.log('📋 [CHAT] Payload:', { model: requestPayload.model, temperature: requestPayload.temperature, max_tokens: requestPayload.max_tokens });
      
      // Usar API real do Gemini se tiver API Key, senão usar mock
      const response = hasApiKey 
        ? await geminiAPI(config.apiKey, requestPayload)
        : await mockOpenAI(requestPayload);

      console.log('✅ [CHAT] Resposta recebida com sucesso');
      console.log('📝 [CHAT] ID da resposta:', response.id);

      const assistantMessage: Message = {
        id: response.id,
        role: 'assistant',
        content: response.choices[0].message.content,
        createdAt: Date.now(),
      };

      console.log('💬 [CHAT] Tamanho da resposta:', assistantMessage.content.length, 'caracteres');
      console.log('💾 [CHAT] Salvando no Firebase...');
      
      // Save assistant response to Firebase
      await saveMessageToFirebase(assistantMessage);
      
      console.log('✅ [CHAT] Mensagem salva no Firebase');
    } catch (err: any) {
      console.error('❌ [CHAT] Erro ao processar mensagem');
      console.error('🔴 [CHAT] Tipo:', err.name);
      console.error('🔴 [CHAT] Mensagem:', err.message);
      console.error('🔴 [CHAT] Stack:', err.stack?.substring(0, 200));
      
      const errorMessage = err.message || 'Falha ao obter resposta. Tente novamente.';
      setError(errorMessage);
      console.error('🔴 [CHAT] Mensagem de erro exibida:', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMessages = async () => {
    if (!user) return;

    try {
      const messagesRef = ref(database, `users/${user.id}/messages`);
      await remove(messagesRef);
      setMessages([]);
      setError(null);
    } catch (error) {
      console.error('Error clearing messages:', error);
      throw new Error('Erro ao limpar mensagens. Tente novamente');
    }
  };

  return (
    <ChatContext.Provider value={{ messages, isLoading, error, sendMessage, clearMessages, isSyncing }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

