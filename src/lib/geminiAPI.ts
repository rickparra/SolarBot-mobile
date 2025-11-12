import { GoogleGenerativeAI } from '@google/generative-ai';

interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface ChatCompletionRequest {
  model: string;
  messages: Message[];
  temperature?: number;
  max_tokens?: number;
}

interface ChatCompletionResponse {
  id: string;
  object: string;
  created: number;
  choices: {
    index: number;
    message: {
      role: 'assistant';
      content: string;
    };
    finish_reason: string;
  }[];
}

export const geminiAPI = async (
  apiKey: string,
  request: ChatCompletionRequest
): Promise<ChatCompletionResponse> => {
  if (!apiKey || apiKey.trim().length === 0) {
    throw new Error('API Key do Gemini não configurada');
  }

  try {
    // Inicializar o cliente do Gemini
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Converter mensagens para o formato do Gemini
    // O Gemini não usa system messages da mesma forma, então vamos incluir no contexto
    const systemMessage = request.messages.find(m => m.role === 'system')?.content || '';
    const conversationHistory = request.messages.filter(m => m.role !== 'system');
    
    // Construir o prompt completo
    let fullPrompt = '';
    if (systemMessage) {
      fullPrompt = `${systemMessage}\n\n`;
    }
    
    // Adicionar histórico de conversa
    conversationHistory.forEach(msg => {
      if (msg.role === 'user') {
        fullPrompt += `Usuário: ${msg.content}\n\n`;
      } else if (msg.role === 'assistant') {
        fullPrompt += `Assistente: ${msg.content}\n\n`;
      }
    });

    // Pegar apenas a última mensagem do usuário para enviar
    const lastUserMessage = conversationHistory
      .filter(m => m.role === 'user')
      .pop()?.content || '';

    // Se temos histórico, incluir contexto
    const promptToSend = conversationHistory.length > 1 
      ? `${systemMessage}\n\nContexto da conversa anterior:\n${conversationHistory.slice(0, -1).map(m => 
          m.role === 'user' ? `Usuário: ${m.content}` : `Assistente: ${m.content}`
        ).join('\n')}\n\nPergunta atual:\n${lastUserMessage}`
      : `${systemMessage}\n\n${lastUserMessage}`;

    // Configurar parâmetros de geração
    const generationConfig = {
      temperature: request.temperature || 0.3,
      maxOutputTokens: request.max_tokens || 600,
      topP: 0.8,
      topK: 40,
    };

    // Fazer a chamada à API
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: promptToSend }] }],
      generationConfig,
    });

    const response = result.response;
    const text = response.text();

    // Retornar no formato compatível
    return {
      id: `gemini-${Date.now()}`,
      object: 'chat.completion',
      created: Math.floor(Date.now() / 1000),
      choices: [
        {
          index: 0,
          message: {
            role: 'assistant',
            content: text,
          },
          finish_reason: 'stop',
        },
      ],
    };
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    // Tratamento de erros específicos
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key')) {
      throw new Error('API Key inválida. Verifique sua chave do Gemini.');
    } else if (error.message?.includes('RATE_LIMIT') || error.message?.includes('quota')) {
      throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
    } else if (error.message?.includes('SAFETY')) {
      throw new Error('Conteúdo bloqueado por filtros de segurança.');
    } else {
      throw new Error(`Erro ao chamar API do Gemini: ${error.message || 'Erro desconhecido'}`);
    }
  }
};

