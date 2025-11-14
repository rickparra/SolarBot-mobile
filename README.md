# ☀️ SolarBot Mobile

<div align="center">

**Assistente Inteligente de Energia Solar Fotovoltaica**

*Aplicativo mobile desenvolvido para o programa SkillUpPlus da FIAP*

[![React Native](https://img.shields.io/badge/React%20Native-0.81.5-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0.23-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue.svg)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-12.5.0-orange.svg)](https://firebase.google.com/)
[![License](https://img.shields.io/badge/License-FIAP-green.svg)](LICENSE)

[Sobre](#-sobre) • [Tecnologias](#-tecnologias) • [Instalação](#-instalação) • [Uso](#-como-usar) • [Arquitetura](#-arquitetura) • [Funcionalidades](#-funcionalidades) • [Firebase](#-firebase) • [API Gemini](#-integração-com-google-gemini-ai) • [Troubleshooting](#-troubleshooting)

</div>

---

## 📖 Sobre

O **SolarBot Mobile** é um aplicativo móvel desenvolvido em React Native que funciona como um assistente virtual especializado em energia solar fotovoltaica. Ele oferece respostas inteligentes sobre dimensionamento de sistemas, inversores, eficiência energética, custos e muito mais.

### 🎯 Objetivo

Fornecer uma ferramenta acessível e intuitiva para profissionais e interessados em energia solar, permitindo:
- Tirar dúvidas técnicas sobre sistemas fotovoltaicos
- Calcular dimensionamentos
- Obter orientações sobre instalação e manutenção
- Aprender sobre viabilidade econômica e LCOE

### 🌟 Diferenciais

- ✅ **100% Mobile-First**: Interface otimizada para dispositivos móveis
- ✅ **Multiplataforma**: Funciona em iOS, Android e Web
- ✅ **IA Real**: Integração com Google Gemini AI (gemini-2.5-flash)
- ✅ **Persistência**: Histórico de conversas salvo no Firebase Realtime Database
- ✅ **Autenticação**: Sistema completo com Firebase Authentication
- ✅ **Modo Offline**: Funciona com mock local quando sem API key

---

## 🚀 Tecnologias

### Core

- **[React Native](https://reactnative.dev/)** `0.81.5` - Framework mobile
- **[Expo](https://expo.dev/)** `~54.0.23` - Plataforma de desenvolvimento
- **[TypeScript](https://www.typescriptlang.org/)** `5.9.2` - Tipagem estática
- **[React](https://react.dev/)** `19.1.0` - Biblioteca UI

### UI & Styling

- **[React Native Paper](https://reactnativepaper.com/)** `5.14.5` - Componentes Material Design
- **[Lucide React Native](https://lucide.dev/)** `0.453.0` - Ícones SVG modernos
- **[React Native Vector Icons](https://oblador.github.io/react-native-vector-icons/)** `10.3.0` - Ícones adicionais

### Navegação

- **[React Navigation](https://reactnavigation.org/)** `6.1.18` - Sistema de navegação
- **[React Navigation Stack](https://reactnavigation.org/docs/stack-navigator/)** `6.4.1` - Stack navigator

### Backend & Persistência

- **[Firebase](https://firebase.google.com/)** `12.5.0` - Backend completo
  - **Firebase Auth** - Autenticação de usuários
  - **Firebase Realtime Database** - Banco de dados em tempo real
- **[AsyncStorage](https://react-native-async-storage.github.io/async-storage/)** `2.1.0` - Armazenamento local

### IA & APIs

- **[Google Generative AI](https://ai.google.dev/)** `0.24.1` - SDK do Google Gemini
  - Modelo: **gemini-2.5-flash**
  - Fallback para mock local sem API key

### Desenvolvimento

- **[Babel](https://babeljs.io/)** - Transpilador JavaScript
- **[Metro](https://metrobundler.dev/)** - Bundler para React Native
- **[Expo CLI](https://docs.expo.dev/more/expo-cli/)** - CLI do Expo

---

## 📦 Instalação

### Pré-requisitos

Antes de começar, você precisa ter instalado:

- **[Node.js](https://nodejs.org/)** 16.x ou superior
- **[npm](https://www.npmjs.com/)** ou **[yarn](https://yarnpkg.com/)**
- **[Git](https://git-scm.com/)**
- **[Expo Go](https://expo.dev/client)** (para testar no celular)

**Opcional** (para emuladores):
- **Android Studio** (para emulador Android)
- **Xcode** (para emulador iOS - somente macOS)

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/SolarBot-mobile.git
cd SolarBot-mobile
```

### Passo 2: Instale as Dependências

```bash
npm install --legacy-peer-deps
```

> **Nota**: Usamos `--legacy-peer-deps` devido a conflitos de dependências entre algumas bibliotecas.

### Passo 3: Configure o Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative **Authentication** (Email/Password)
3. Ative **Realtime Database**
4. Configure as regras de segurança (veja [Firebase Setup](#-firebase))
5. Copie as credenciais do Firebase
6. Atualize o arquivo `src/config/firebase.ts` com suas credenciais

```typescript
// src/config/firebase.ts
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  messagingSenderId: "SEU_MESSAGING_ID",
  appId: "SEU_APP_ID",
  databaseURL: "https://SEU_PROJETO-default-rtdb.firebaseio.com",
};
```

### Passo 4: Configure a API do Gemini (Opcional)

Para usar IA real, você precisa de uma API key do Google Gemini:

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Crie uma API key
3. Na aplicação, vá em **Menu → LLM → Configurar API Key**
4. Cole sua API key

> **Nota**: Sem API key, a aplicação funciona em modo mock com respostas predefinidas.

### Passo 5: Inicie o Servidor

```bash
# Iniciar com cache limpo (recomendado na primeira vez)
npm run start:clean

# Ou iniciar normalmente
npm start
```

---

## 💻 Como Usar

### Testando na Web (Recomendado)

A forma mais rápida de testar é na web:

```bash
npm run web
```

Ou pressione `w` no terminal após executar `npm start`.

O app abrirá em: `http://localhost:8081`

### Testando no Celular

#### Usando Expo Go

1. Instale o **Expo Go** no seu celular:
   - [Android - Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)
   - [iOS - App Store](https://apps.apple.com/app/expo-go/id982107779)

2. Execute `npm start`

3. Escaneie o QR Code:
   - **Android**: Use o app Expo Go
   - **iOS**: Use a câmera nativa do iPhone

### Testando no Emulador

```bash
# Android
npm run android

# iOS (somente macOS)
npm run ios
```

### Credenciais de Teste

A aplicação usa Firebase Authentication. Para testar:

1. **Criar nova conta**:
   - Clique em "Criar conta"
   - Preencha email e senha (mínimo 6 caracteres)
   - Clique em "Criar conta"

2. **Login**:
   - Use o email e senha que você criou
   - Clique em "Entrar"

---

## 🏗️ Arquitetura

### Visão Geral

```
┌─────────────────────────────────────────────────────┐
│                    App.tsx                          │
│              (RootNavigator)                        │
└──────────────────┬──────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        │                     │
   ┌────▼────┐          ┌─────▼─────┐
   │ Auth    │          │  App      │
   │ Stack   │          │  Stack    │
   └────┬────┘          └─────┬─────┘
        │                     │
   ┌────┴────┐           ┌────▼────┐
   │ Login   │           │ ChatApp │
   │ Signup  │           └────┬────┘
   └─────────┘                │
                         ┌────┴─────┬───────────┐
                         │          │           │
                    ┌────▼───┐ ┌────▼────┐ ┌───▼───┐
                    │ Chat   │ │ Profile │ │  LLM  │
                    │ View   │ │  Panel  │ │ Panel │
                    └────────┘ └─────────┘ └───────┘
```

### Fluxo de Dados

```
User Input → Context → Firebase/API → Context → UI Update
     ↓                                    ↓
  Storage                            Real-time Sync
```

### Estrutura de Pastas

```
SolarBot-mobile/
│
├── 📱 src/                          # Código-fonte principal
│   │
│   ├── 🎨 components/               # Componentes React
│   │   ├── chat/                   # Componentes do chat
│   │   │   ├── MessageList.tsx    # Lista de mensagens
│   │   │   ├── MessageItem.tsx    # Item individual de mensagem
│   │   │   └── Composer.tsx       # Input de mensagem
│   │   │
│   │   ├── layout/                 # Componentes de layout
│   │   │   └── Header.tsx          # Cabeçalho da aplicação
│   │   │
│   │   ├── AuthGate.tsx            # Proteção de rotas autenticadas
│   │   ├── ProfilePanel.tsx        # Painel de perfil do usuário
│   │   └── LLMPanel.tsx            # Painel de configuração da IA
│   │
│   ├── 🧠 contexts/                 # React Contexts (Estado Global)
│   │   ├── AuthContext.tsx         # Autenticação (Firebase Auth)
│   │   ├── ChatContext.tsx         # Gerenciamento do chat
│   │   ├── ProfileContext.tsx      # Perfil do usuário
│   │   └── LLMContext.tsx          # Configuração da IA
│   │
│   ├── 🔧 lib/                      # Bibliotecas e utilitários
│   │   ├── geminiAPI.ts            # Cliente da API do Gemini
│   │   ├── mockOpenAI.ts           # Mock da API (modo offline)
│   │   ├── solarKnowledge.ts       # Base de conhecimento solar
│   │   ├── storage.ts              # Helper AsyncStorage
│   │   └── utils.ts                # Funções utilitárias
│   │
│   ├── 🧭 navigation/               # Sistema de navegação
│   │   ├── RootNavigator.tsx       # Navegador principal
│   │   └── types.ts                # Tipos TypeScript da navegação
│   │
│   ├── 📱 screens/                  # Telas da aplicação
│   │   ├── Login.tsx               # Tela de login
│   │   ├── Signup.tsx              # Tela de cadastro
│   │   └── ChatApp.tsx             # Tela principal do chat
│   │
│   ├── ⚙️ config/                   # Configurações
│   │   └── firebase.ts             # Configuração do Firebase
│   │
│   └── 🎨 theme/                    # Tema da aplicação
│       └── theme.ts                # Cores e estilos
│
├── 📄 assets/                       # Recursos estáticos
│   ├── icon.png                    # Ícone do app
│   ├── splash-icon.png             # Splash screen
│   ├── adaptive-icon.png           # Ícone adaptativo (Android)
│   └── favicon.png                 # Favicon (Web)
│
├── 🔧 Arquivos de Configuração
│   ├── app.json                    # Configuração do Expo
│   ├── package.json                # Dependências npm
│   ├── tsconfig.json               # Configuração TypeScript
│   ├── babel.config.js             # Configuração Babel
│   ├── metro.config.js             # Configuração Metro Bundler
│   └── index.ts                    # Entry point
│
├── 📚 Documentação
│   ├── README.md                   # Este arquivo
│   ├── START.md                    # Guia de início rápido
│   ├── PRONTO-PARA-USAR.md        # Checklist de uso
│   ├── TROUBLESHOOTING.md         # Solução de problemas
│   ├── FIREBASE-SETUP.md          # Setup do Firebase
│   └── PORTING.md                 # Guia de porting
│
└── 📦 node_modules/                # Dependências instaladas
```

---

## ✨ Funcionalidades

### 🔐 Autenticação

- ✅ **Login com Email/Senha** - Firebase Authentication
- ✅ **Cadastro de Novos Usuários** - Validação completa
- ✅ **Logout** - Limpeza segura de sessão
- ✅ **Persistência de Sessão** - AsyncStorage + Firebase
- ✅ **Proteção de Rotas** - AuthGate para rotas privadas

### 💬 Chat Inteligente

- ✅ **IA Real** - Google Gemini AI (gemini-2.5-flash)
- ✅ **Modo Offline** - Mock local sem necessidade de API key
- ✅ **Histórico Persistente** - Firebase Realtime Database
- ✅ **Sincronização em Tempo Real** - Mensagens sincronizam entre dispositivos
- ✅ **Limite de Mensagens** - Mantém últimas 50 mensagens por usuário
- ✅ **Contexto de Conversa** - IA mantém contexto das últimas 10 mensagens
- ✅ **Indicador de Digitação** - Feedback visual durante processamento

### 📚 Base de Conhecimento

O chatbot é especializado em:

#### ⚡ Dimensionamento de Sistemas
- Cálculo de potência necessária
- Quantidade de painéis solares
- Área de instalação requerida
- Análise de consumo energético

#### 🔌 Inversores e Equipamentos
- Tipos de inversores (string, micro, central)
- Configuração de strings
- MPPT (Maximum Power Point Tracking)
- Compatibilidade de equipamentos

#### ☀️ Aspectos Técnicos
- Irradiância solar por região do Brasil
- Fatores climáticos e sombreamento
- Perdas do sistema (térmicas, cabeamento, etc.)
- Eficiência de módulos e inversores
- Ângulo de inclinação e orientação

#### 💰 Aspectos Econômicos
- LCOE (Levelized Cost of Energy)
- Análise de payback
- Custos de instalação
- Retorno sobre investimento (ROI)
- Programas de financiamento

#### 🔧 Manutenção
- Manutenção preventiva
- Limpeza de painéis
- Troubleshooting de problemas comuns
- Monitoramento de performance

#### ⚠️ Segurança
- Normas técnicas (NBR 16690, NBR 5410)
- Proteção contra surtos
- Aterramento adequado
- Segurança em instalações

### 👤 Perfil do Usuário

- ✅ **Nome de Exibição** - Personalize como quer ser chamado
- ✅ **Função** - Instalador, Cliente, Estudante, Pesquisador
- ✅ **Região** - Norte, Nordeste, Centro-Oeste, Sudeste, Sul
- ✅ **Persistência** - Salvamento automático no Firebase

### ⚙️ Configuração de IA

- ✅ **API Key do Gemini** - Configure sua própria chave
- ✅ **Visualização do Modelo** - Informações sobre o modelo ativo
- ✅ **Status da Conexão** - Indicador de API ativa ou modo mock
- ✅ **Parâmetros de Geração**:
  - Temperature: 0.3 (respostas mais precisas)
  - Max Tokens: 2000
  - Top P: 0.8
  - Top K: 40

### 🎨 Interface

- ✅ **Design Material** - React Native Paper
- ✅ **Responsivo** - Adapta-se a qualquer tamanho de tela
- ✅ **Ícones Modernos** - Lucide Icons
- ✅ **Tema Claro** - Interface clean e profissional
- ✅ **Animações Suaves** - Transições naturais
- ✅ **Feedback Visual** - Loading states e indicadores

---

## 🔥 Firebase

### Estrutura do Banco de Dados

```
solarbot-4516b-default-rtdb/
│
└── users/
    └── {userId}/
        ├── profile/
        │   ├── displayName: string
        │   ├── role: string
        │   └── region: string
        │
        └── messages/
            └── {messageId}/
                ├── role: "user" | "assistant"
                ├── content: string
                └── createdAt: number (timestamp)
```

### Regras de Segurança

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid",
        "profile": {
          ".validate": "newData.hasChildren(['displayName', 'role', 'region'])"
        },
        "messages": {
          "$messageId": {
            ".validate": "newData.hasChildren(['role', 'content', 'createdAt'])"
          }
        }
      }
    }
  }
}
```

### Configuração Passo a Passo

1. **Criar Projeto**:
   - Acesse [Firebase Console](https://console.firebase.google.com/)
   - Clique em "Adicionar projeto"
   - Siga o wizard de criação

2. **Ativar Authentication**:
   - Vá em "Authentication" → "Sign-in method"
   - Ative "Email/Password"
   - Salve

3. **Ativar Realtime Database**:
   - Vá em "Realtime Database" → "Criar banco de dados"
   - Escolha localização (preferencialmente `southamerica-east1`)
   - Inicie em **modo de teste** (depois configure as regras)

4. **Configurar Regras**:
   - Na aba "Regras", cole as regras de segurança acima
   - Publique as regras

5. **Obter Credenciais**:
   - Vá em "Configurações do projeto" (ícone de engrenagem)
   - Role até "Seus aplicativos"
   - Clique no ícone `</>` (Web)
   - Copie as credenciais
   - Cole em `src/config/firebase.ts`

### Persistência

- **Web**: Usa `browserLocalPersistence` (localStorage)
- **Mobile**: Usa `AsyncStorage` via `getReactNativePersistence`

---

## 🤖 Integração com Google Gemini AI

### Visão Geral

O SolarBot usa o modelo **gemini-2.5-flash** do Google para gerar respostas inteligentes sobre energia solar.

### Como Funciona

1. **Usuário envia mensagem** → `ChatContext.sendMessage()`
2. **Contexto é preparado**:
   ```typescript
   {
     model: "gemini-2.5-flash",
     messages: [
       { role: "system", content: "Você é um especialista em energia solar..." },
       ...historico_ultimas_10_mensagens,
       { role: "user", content: "pergunta do usuário" }
     ],
     temperature: 0.3,
     max_tokens: 2000
   }
   ```
3. **Chamada à API** → `geminiAPI.ts`
4. **Resposta processada** e salva no Firebase
5. **UI atualiza** em tempo real

### Configuração

```typescript
// src/lib/geminiAPI.ts
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

const generationConfig = {
  temperature: 0.3,      // Respostas mais precisas
  maxOutputTokens: 2000, // Resposta de até 2000 tokens
  topP: 0.8,            // Diversidade controlada
  topK: 40,             // Top 40 tokens mais prováveis
};
```

### Modo Mock

Se não houver API key configurada, o sistema automaticamente usa o modo mock:

```typescript
// src/lib/mockOpenAI.ts
// Responde com base em palavras-chave da pergunta
// Usa base de conhecimento em solarKnowledge.ts
```

### Obter API Key

1. Acesse [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Faça login com sua conta Google
3. Clique em "Create API Key"
4. Copie a chave
5. Na aplicação:
   - Menu → LLM → Configurar API Key
   - Cole a chave
   - Salvar

### Limites e Custos

- **Modelo**: gemini-2.5-flash
- **Gratuito**: 60 requisições/minuto
- **Pago**: Consulte [preços](https://ai.google.dev/pricing)

---

## 📱 Compatibilidade

### Plataformas Suportadas

| Plataforma | Status | Notas |
|------------|--------|-------|
| 🌐 **Web** | ✅ Testado | Chrome, Firefox, Safari, Edge |
| 🤖 **Android** | ✅ Testado | Android 8.0+ |
| 🍎 **iOS** | ⚠️ Não testado | Deve funcionar (Expo SDK 54) |

### Requisitos Mínimos

- **Web**: Navegador moderno (2020+)
- **Android**: Android 8.0 (API 26) ou superior
- **iOS**: iOS 13.0 ou superior
- **Internet**: Necessária para Firebase e Gemini AI

---

## 🎨 Personalização

### Cores do Tema

Edite `src/theme/theme.ts`:

```typescript
export const theme = {
  colors: {
    primary: '#3b82f6',      // Azul principal
    background: '#ffffff',    // Fundo
    surface: '#f1f5f9',      // Superfícies
    text: '#0f172a',         // Texto principal
    textSecondary: '#64748b', // Texto secundário
    border: '#e2e8f0',       // Bordas
    error: '#ef4444',        // Erros
    success: '#10b981',      // Sucesso
  },
  // ... mais configurações
};
```

### Adicionar Novos Tópicos

Edite `src/lib/solarKnowledge.ts`:

```typescript
export const solarKnowledge: Record<string, string> = {
  // Adicione novos tópicos aqui
  'seu_topico': 'Sua resposta detalhada sobre o tópico',
};
```

### Modificar Prompt do Sistema

Edite `src/contexts/ChatContext.tsx`:

```typescript
const requestPayload = {
  model: 'gemini-2.5-flash',
  messages: [
    {
      role: 'system',
      content: 'SEU NOVO PROMPT DE SISTEMA AQUI',
    },
    // ...
  ],
};
```

---

## 🧪 Testes

### Teste Manual

1. **Autenticação**:
   - Criar conta nova
   - Login com conta existente
   - Logout
   - Verificar persistência (recarregar página)

2. **Chat**:
   - Enviar mensagem
   - Verificar resposta da IA
   - Testar com e sem API key
   - Verificar histórico

3. **Perfil**:
   - Alterar nome, função, região
   - Salvar e verificar persistência

4. **LLM**:
   - Configurar API key
   - Verificar status (mock vs real)

### Comandos Úteis

```bash
# Limpar cache e reinstalar
npm run start:clean

# Ver logs em tempo real
npx expo start --dev-client

# Build de produção (web)
npx expo export --platform web
```

---

## 🐛 Troubleshooting

### Erro: "Metro bundler não inicia"

```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:8081 | xargs kill -9

# Reiniciar
npm run start:clean
```

### Erro: "Firebase Auth não funciona"

1. Verifique se o `apiKey` está correto em `firebase.ts`
2. Confirme que "Email/Password" está ativo no Console
3. Limpe o AsyncStorage:
   ```javascript
   // No código, adicione temporariamente:
   import AsyncStorage from '@react-native-async-storage/async-storage';
   AsyncStorage.clear();
   ```

### Erro: "Gemini API retorna 404"

1. Verifique se a API key é válida
2. Confirme que tem acesso ao modelo `gemini-2.5-flash`
3. Tente usar `gemini-1.5-flash` como alternativa:
   ```typescript
   // src/lib/geminiAPI.ts
   const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
   ```

### Erro: "Dependências conflitantes"

```bash
# Limpar tudo
rm -rf node_modules package-lock.json
npm cache clean --force

# Reinstalar
npm install --legacy-peer-deps
```

### Problema: "App não carrega na web"

1. Verifique se a porta 8081 está livre
2. Tente outra porta:
   ```bash
   npx expo start --web --port 8082
   ```
3. Desative extensões do navegador (especialmente AdBlock)

### Mais Problemas?

Consulte `TROUBLESHOOTING.md` para soluções detalhadas.

---

## 🚀 Deploy

### Web (Netlify/Vercel)

```bash
# Build
npx expo export --platform web

# Upload pasta web-build/ para Netlify/Vercel
```

### Android (Google Play)

```bash
# Configurar EAS Build
npm install -g eas-cli
eas login
eas build:configure

# Build APK
eas build --platform android --profile preview

# Build AAB (produção)
eas build --platform android --profile production
```

### iOS (App Store)

```bash
# Build (requer macOS)
eas build --platform ios --profile production
```

---

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

### Diretrizes

- Siga o padrão de código existente
- Adicione comentários em código complexo
- Teste suas mudanças antes de commitar
- Atualize a documentação se necessário

---

## 🗺️ Roadmap

### Versão 1.1

- [ ] Modo escuro
- [ ] Compartilhamento de conversas
- [ ] Export de conversas (PDF/TXT)
- [ ] Notificações push

### Versão 1.2

- [ ] Upload de fotos de instalações
- [ ] Análise de fotos com IA
- [ ] Calculadora de dimensionamento integrada
- [ ] Gráficos de geração e consumo

### Versão 2.0

- [ ] Múltiplos chats/conversas
- [ ] Tags e categorização de conversas
- [ ] Busca no histórico
- [ ] Modo offline completo
- [ ] Sincronização entre dispositivos

---

## 📄 Licença

Este projeto foi desenvolvido como parte do programa **SkillUpPlus** da **FIAP**.

**Todos os direitos reservados © 2025 FIAP**

---

## 👥 Autores

Desenvolvido por alunos do programa SkillUpPlus - FIAP

---

## 📞 Suporte

Encontrou um problema? Precisa de ajuda?

- 📧 Email: suporte@skillupplus.com.br
- 📚 Documentação: Veja os arquivos `.md` na raiz do projeto
- 🐛 Issues: Abra uma issue no GitHub

---

## 🙏 Agradecimentos

- **FIAP** - Pelo programa SkillUpPlus
- **Expo Team** - Pela excelente plataforma de desenvolvimento
- **Google** - Pela API Gemini
- **Firebase** - Pelo backend completo e gratuito
- **React Native Community** - Pelas bibliotecas incríveis

---

<div align="center">

**Feito com ❤️ e ☀️ para o futuro da energia solar no Brasil**

[⬆ Voltar ao topo](#️-solarbot-mobile)

</div>
