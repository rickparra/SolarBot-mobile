export const solarKnowledge: Record<string, string> = {
  dimensionamento: `**Dimensionamento de Sistema Solar**

Para dimensionar um sistema fotovoltaico:

1. **Consumo mensal**: Analise a conta de luz (kWh/mês)
2. **Irradiação local**: Consulte atlas solar (média 4-6 kWh/m²/dia no Brasil)
3. **Potência necessária**: Consumo ÷ (irradiação × 30 dias × fator de desempenho 0.75-0.8)
4. **Quantidade de módulos**: Potência necessária ÷ potência do módulo (ex: 450W)

⚠️ **Limitações**: Considere área disponível, sombreamento, orientação do telhado e regulamentações locais.`,

  inversor: `**Inversores Fotovoltaicos**

Tipos principais:
- **String**: Conecta múltiplos módulos em série (mais comum residencial)
- **Microinversor**: Um por módulo (melhor para sombreamento parcial)
- **Central**: Alta potência para usinas (>100kW)

**Critérios de seleção**:
- Potência: 80-120% da potência dos módulos
- Tensão MPPT compatível com string
- Eficiência >95%
- Certificações (Inmetro, IEC)

⚠️ **Atenção**: Subdimensionar o inversor pode causar limitação de potência; sobredimensionar aumenta custo sem benefício.`,

  string: `**Dimensionamento de String**

Parâmetros críticos:
- **Voc da string**: Soma das tensões de circuito aberto dos módulos
- **Vmp da string**: Tensão no ponto de máxima potência
- **Range MPPT do inversor**: Vmp deve estar dentro da faixa

**Cálculo**:
- Mínimo de módulos: Tensão mínima MPPT ÷ Vmp do módulo
- Máximo de módulos: Tensão máxima MPPT ÷ Voc do módulo (considerar temp. mínima)

⚠️ **Segurança**: Sempre verificar corrente máxima de entrada do inversor e compatibilidade dos conectores.`,

  irradiância: `**Irradiância Solar**

Definições:
- **Irradiância**: Potência solar instantânea (W/m²)
- **Irradiação**: Energia acumulada ao longo do tempo (kWh/m²/dia)

**Dados brasileiros típicos**:
- Nordeste: 5.5-6.5 kWh/m²/dia
- Centro-Oeste/Sudeste: 4.5-5.5 kWh/m²/dia
- Sul: 4.0-5.0 kWh/m²/dia

**Fatores que afetam**:
- Latitude e época do ano
- Inclinação e orientação dos módulos
- Sombreamento e sujeira

⚠️ **Nota**: Use dados históricos locais (CRESESB, NASA) para maior precisão.`,

  perdas: `**Perdas em Sistemas Fotovoltaicos**

Principais perdas:
1. **Temperatura**: -0.3 a -0.5% por °C acima de 25°C
2. **Sujeira**: 2-7% dependendo da limpeza
3. **Descasamento**: 1-3% entre módulos
4. **Cabeamento**: 1-3% (resistência dos cabos)
5. **Inversor**: 2-5% (eficiência <100%)
6. **Sombreamento**: Variável, pode ser crítico

**Fator de desempenho típico**: 0.75-0.85 (significa 15-25% de perdas totais)

⚠️ **Recomendação**: Use simuladores (PVsyst, SAM) para estimativa precisa de perdas.`,

  manutenção: `**Manutenção de Sistemas Fotovoltaicos**

**Preventiva**:
- Limpeza dos módulos: 2-4x/ano (ou conforme chuvas)
- Inspeção visual: Verificar rachaduras, corrosão, cabos soltos
- Monitoramento: Acompanhar geração diária

**Preditiva**:
- Análise de curvas I-V para detectar degradação
- Termografia para identificar células quentes

**Corretiva**:
- Substituição de módulos/inversores defeituosos
- Reaperto de conexões

⚠️ **Segurança**: Sempre desligar o sistema antes de manutenção elétrica; nunca subir no telhado em dias chuvosos.`,

  lcoe: `**LCOE (Levelized Cost of Energy)**

Custo nivelado da energia ao longo da vida útil do sistema.

**Fórmula simplificada**:
LCOE = (Investimento inicial + custos O&M) ÷ Energia gerada total

**Valores típicos no Brasil** (2024):
- Residencial: R$ 0.15-0.25/kWh
- Comercial: R$ 0.12-0.20/kWh
- Usina: R$ 0.10-0.15/kWh

**Fatores que influenciam**:
- Custo dos módulos e instalação
- Irradiação local
- Taxa de desconto (WACC)
- Vida útil (25-30 anos)

⚠️ **Limitação**: LCOE não considera volatilidade de preços de energia nem valor da energia em horários de pico.`,

  segurança: `**Segurança Elétrica em Sistemas Fotovoltaicos**

**Riscos principais**:
1. **Choque elétrico**: Strings com tensão DC alta (até 1000V)
2. **Arco elétrico**: Conexões mal feitas
3. **Incêndio**: Sobrecarga ou curto-circuito

**Boas práticas**:
- Use EPIs (luvas isolantes, óculos, capacete)
- Instale dispositivos de proteção (DPS, disjuntores, fusíveis)
- Aterramento adequado do sistema
- Nunca trabalhe sozinho em altura
- Desligue o inversor e cubra os módulos antes de manutenção

⚠️ **Normas**: Siga ABNT NBR 16690 (sistemas fotovoltaicos) e NR10 (segurança em eletricidade).`,
};

export const defaultResponse = `Sou um assistente especializado em energia solar fotovoltaica. Posso ajudar com:

- Dimensionamento de sistemas
- Seleção de inversores
- Cálculo de strings
- Irradiância e perdas
- Manutenção (O&M)
- LCOE e viabilidade
- Segurança elétrica

Faça sua pergunta sobre energia solar e fornecerei informações técnicas práticas!`;

