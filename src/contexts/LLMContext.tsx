import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { storage } from '../lib/storage';

export interface LLMConfig {
  apiKey: string;
  model: string;
  isConnected: boolean;
}

interface LLMContextType {
  config: LLMConfig;
  updateApiKey: (apiKey: string) => Promise<void>;
  clearApiKey: () => Promise<void>;
  hasApiKey: boolean;
}

const defaultConfig: LLMConfig = {
  apiKey: '',
  model: 'gemini-2.5-flash',
  isConnected: false,
};

const LLMContext = createContext<LLMContextType | undefined>(undefined);

export const LLMProvider = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState<LLMConfig>(defaultConfig);

  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const storedApiKey = await storage.getItem('gemini-api-key');
      if (storedApiKey) {
        setConfig(prev => ({
          ...prev,
          apiKey: storedApiKey,
          isConnected: true,
        }));
      }
    } catch (error) {
      console.error('Error loading API key:', error);
    }
  };

  const updateApiKey = async (apiKey: string) => {
    try {
      if (!apiKey || apiKey.trim().length === 0) {
        throw new Error('API Key não pode estar vazia');
      }

      await storage.setItem('gemini-api-key', apiKey.trim());
      setConfig(prev => ({
        ...prev,
        apiKey: apiKey.trim(),
        isConnected: true,
      }));
    } catch (error) {
      console.error('Error saving API key:', error);
      throw error;
    }
  };

  const clearApiKey = async () => {
    try {
      await storage.removeItem('gemini-api-key');
      setConfig(defaultConfig);
    } catch (error) {
      console.error('Error clearing API key:', error);
      throw error;
    }
  };

  const hasApiKey = config.apiKey.length > 0;

  return (
    <LLMContext.Provider value={{ config, updateApiKey, clearApiKey, hasApiKey }}>
      {children}
    </LLMContext.Provider>
  );
};

export const useLLM = () => {
  const context = useContext(LLMContext);
  if (context === undefined) {
    throw new Error('useLLM must be used within a LLMProvider');
  }
  return context;
};

