# SolarBot Mobile

Aplicação mobile do SkillUpPlus Solar - Assistente de Energia Solar Fotovoltaica

## 🚀 Tecnologias

- **React Native** com **Expo** (~54.0.23)
- **NativeWind** (Tailwind CSS para React Native)
- **React Navigation** (navegação mobile)
- **AsyncStorage** (persistência local)
- **TypeScript**
- **lucide-react-native** (ícones)

## 📱 Funcionalidades

- ✅ Autenticação (Login/Signup) com mock
- ✅ Chat interativo sobre energia solar fotovoltaica
- ✅ Base de conhecimento local (mock da OpenAI)
- ✅ Perfil do usuário configurável
- ✅ Interface responsiva 100% mobile-first
- ✅ Suporte para Web, iOS e Android

## 🏗️ Estrutura do Projeto

```
SolarBot-mobile/
├── src/
│   ├── components/
│   │   ├── chat/           # Componentes de chat
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   └── Composer.tsx
│   │   ├── layout/         # Componentes de layout
│   │   │   └── Header.tsx
│   │   ├── AuthGate.tsx    # Proteção de rotas
│   │   ├── ProfilePanel.tsx
│   │   └── LLMPanel.tsx
│   ├── contexts/           # React Contexts
│   │   ├── AuthContext.tsx
│   │   ├── ChatContext.tsx
│   │   └── ProfileContext.tsx
│   ├── lib/                # Utilitários e lógica
│   │   ├── mockOpenAI.ts   # Simulação da OpenAI
│   │   ├── solarKnowledge.ts # Base de conhecimento
│   │   ├── storage.ts      # Helper AsyncStorage
│   │   └── utils.ts
│   ├── navigation/         # Navegação
│   │   ├── RootNavigator.tsx
│   │   └── types.ts
│   └── screens/            # Telas
│       ├── Login.tsx
│       ├── Signup.tsx
│       └── ChatApp.tsx
├── App.tsx                 # Componente raiz
├── global.css              # Estilos globais Tailwind
├── tailwind.config.js      # Configuração Tailwind
└── metro.config.js         # Configuração Metro

```

## 🎨 Temas e Cores

O projeto utiliza um sistema de cores consistente via Tailwind CSS:

- **Primary**: `#3b82f6` (Azul)
- **Secondary**: `#64748b` (Cinza)
- **Background**: `#ffffff` (Branco)
- **Muted**: `#f1f5f9` (Cinza claro)
- **Destructive**: `#ef4444` (Vermelho)

## 📦 Instalação

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Iniciar em desenvolvimento
npm start

# Rodar na web
npm run web

# Rodar no Android
npm run android

# Rodar no iOS
npm run ios
```

## 🔧 Configuração

### NativeWind

O NativeWind está configurado para usar Tailwind CSS no React Native. As classes CSS funcionam diretamente nos componentes nativos:

```tsx
<View className="flex-1 bg-background">
  <Text className="text-lg font-semibold text-foreground">
    Título
  </Text>
</View>
```

### Navegação

A navegação utiliza React Navigation com autenticação integrada:

- **AuthStack**: Login e Signup (usuários não autenticados)
- **AppStack**: ChatApp (usuários autenticados)

O fluxo de navegação é automático baseado no estado de autenticação.

### Persistência

Os dados são persistidos usando AsyncStorage:

- Usuário autenticado: `mockUser`
- Perfil do usuário: `profile-{userId}`

## 📚 Base de Conhecimento

O chatbot possui conhecimento especializado em:

- Dimensionamento de sistemas fotovoltaicos
- Seleção e configuração de inversores
- Cálculo de strings e MPPT
- Irradiância solar e fatores climáticos
- Perdas e eficiência de sistemas
- Manutenção preventiva e corretiva
- LCOE e análise de viabilidade
- Segurança elétrica em instalações

## 🌐 Compatibilidade Web

A aplicação funciona 100% na web mantendo a experiência mobile-first:

- Interface responsiva e touch-friendly
- NativeWind compila para CSS padrão
- Componentes otimizados para mobile e desktop
- SafeAreaView e ScrollView funcionam no web

## 🚧 Próximos Passos

- [ ] Integração com Firebase Authentication
- [ ] Integração com OpenAI API real
- [ ] Histórico de conversas persistente
- [ ] Modo offline com sincronização
- [ ] Notificações push
- [ ] Compartilhamento de conversas

## 📄 Licença

Este projeto foi desenvolvido como parte do programa SkillUpPlus da FIAP.

