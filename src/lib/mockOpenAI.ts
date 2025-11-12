import { solarKnowledge, defaultResponse } from './solarKnowledge';

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

export const mockOpenAI = async (
  request: ChatCompletionRequest
): Promise<ChatCompletionResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 700));

  const userMessage = request.messages
    .filter(m => m.role === 'user')
    .pop()?.content.toLowerCase() || '';

  // Match keywords to knowledge base
  let response = defaultResponse;
  
  const keywords = Object.keys(solarKnowledge);
  for (const keyword of keywords) {
    if (userMessage.includes(keyword)) {
      response = solarKnowledge[keyword];
      break;
    }
  }

  // Additional keyword variations
  if (userMessage.includes('módulo') || userMessage.includes('painel') || userMessage.includes('placa')) {
    response = `**Módulos Fotovoltaicos**

Tipos principais:
- **Monocristalino**: Maior eficiência (18-22%), mais caro, melhor para espaços reduzidos
- **Policristalino**: Eficiência média (15-18%), custo moderado
- **Filme fino**: Menor eficiência (10-13%), flexível, melhor para grandes áreas

**Especificações importantes**:
- Potência nominal (Wp): Típico 400-550W
- Eficiência: Quanto maior, menor a área necessária
- Coeficiente de temperatura: -0.3 a -0.5%/°C
- Garantia: 10-12 anos (produto) + 25 anos (performance >80%)

⚠️ **Dica**: Prefira marcas Tier 1 com certificação IEC e garantia linear de potência.`;
  }

  if (userMessage.includes('custo') || userMessage.includes('preço') || userMessage.includes('investimento')) {
    response = `**Custos de Sistemas Fotovoltaicos (Brasil 2024)**

**Residencial** (até 10kWp):
- R$ 4.000-6.000 por kWp instalado
- Sistema 5kWp: ~R$ 20.000-30.000
- Payback: 4-7 anos

**Comercial** (10-100kWp):
- R$ 3.500-5.000 por kWp
- Economia de escala

**Usina** (>1MWp):
- R$ 2.500-3.500 por kWp
- Payback: 5-10 anos

**Componentes do custo**:
- Módulos: 40-50%
- Inversor: 15-20%
- Estrutura e cabeamento: 15-20%
- Instalação: 15-20%

⚠️ **Variação**: Preços variam por região, complexidade da instalação e qualidade dos equipamentos.`;
  }

  if (userMessage.includes('geração') || userMessage.includes('produção') || userMessage.includes('quanto gera')) {
    response = `**Estimativa de Geração Fotovoltaica**

**Fórmula simplificada**:
Geração mensal (kWh) = Potência (kWp) × Irradiação média (h/dia) × 30 dias × Fator 0.8

**Exemplo**: Sistema 5kWp em São Paulo (4.5 kWh/m²/dia)
- 5 × 4.5 × 30 × 0.8 = **540 kWh/mês**

**Variação sazonal**:
- Verão: +20-30% acima da média
- Inverno: -15-25% abaixo da média

**Monitoramento**:
Use app do inversor para acompanhar geração em tempo real e identificar problemas.

⚠️ **Importante**: Valores são estimativas; geração real depende de sombreamento, limpeza e temperatura.`;
  }

  return {
    id: `mock-${Date.now()}`,
    object: 'chat.completion',
    created: Math.floor(Date.now() / 1000),
    choices: [
      {
        index: 0,
        message: {
          role: 'assistant',
          content: response,
        },
        finish_reason: 'stop',
      },
    ],
  };
};

