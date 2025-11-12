# Guia de Porting: Desktop → Mobile

Este documento detalha as mudanças realizadas no porting da aplicação desktop (React + Vite) para mobile (React Native + Expo).

## 📋 Mudanças Principais

### 1. Estrutura de Componentes

#### Desktop → Mobile

| Desktop | Mobile | Mudança |
|---------|--------|---------|
| `<div>` | `<View>` | Componente de container |
| `<p>`, `<span>`, `<h1>` | `<Text>` | Todos os textos |
| `<input>` | `<TextInput>` | Entrada de texto |
| `<button>` | `<Pressable>` | Botões interativos |
| `onClick` | `onPress` | Evento de clique |
| `className` | `className` | ✅ Mantido com NativeWind |

### 2. Navegação

#### Desktop (React Router)
```tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

<BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/app" element={<ChatApp />} />
  </Routes>
</BrowserRouter>
```

#### Mobile (React Navigation)
```tsx
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="App" component={ChatApp} />
  </Stack.Navigator>
</NavigationContainer>
```

### 3. Persistência de Dados

#### Desktop (localStorage)
```tsx
localStorage.setItem('key', JSON.stringify(data));
const data = JSON.parse(localStorage.getItem('key'));
localStorage.removeItem('key');
```

#### Mobile (AsyncStorage)
```tsx
import { storage } from '../lib/storage';

await storage.setItem('key', JSON.stringify(data));
const stored = await storage.getItem('key');
const data = stored ? JSON.parse(stored) : null;
await storage.removeItem('key');
```

### 4. Estilização

#### Desktop (Tailwind CSS padrão)
```tsx
<div className="flex items-center justify-center bg-primary">
  <h1 className="text-2xl font-bold">Título</h1>
</div>
```

#### Mobile (NativeWind - sintaxe idêntica!)
```tsx
<View className="flex items-center justify-center bg-primary">
  <Text className="text-2xl font-bold">Título</Text>
</View>
```

**✅ Vantagem**: A sintaxe Tailwind permanece 100% idêntica!

### 5. Scroll e Layouts

#### Desktop
```tsx
<div className="overflow-y-auto">
  {/* conteúdo */}
</div>
```

#### Mobile
```tsx
import { ScrollView } from 'react-native';

<ScrollView className="flex-1">
  {/* conteúdo */}
</ScrollView>
```

### 6. Modals e Overlays

#### Desktop (shadcn/ui Sheet)
```tsx
<Sheet open={open} onOpenChange={onClose}>
  <SheetContent>
    {/* conteúdo */}
  </SheetContent>
</Sheet>
```

#### Mobile (React Native Modal)
```tsx
<Modal visible={visible} onRequestClose={onClose}>
  <View>
    {/* conteúdo */}
  </View>
</Modal>
```

### 7. Ícones

#### Desktop
```tsx
import { User, Settings } from 'lucide-react';

<User className="h-4 w-4" />
```

#### Mobile
```tsx
import { User, Settings } from 'lucide-react-native';

<User color="#000" size={16} />
```

### 8. SafeArea e StatusBar

#### Desktop
Não necessário (navegadores lidam automaticamente)

#### Mobile
```tsx
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

<SafeAreaView edges={['top']}>
  {/* conteúdo */}
</SafeAreaView>
<StatusBar style="auto" />
```

## 🔧 Configurações Necessárias

### package.json
```json
{
  "dependencies": {
    "nativewind": "^4.0.1",
    "@react-navigation/native": "^6.1.18",
    "@react-navigation/stack": "^6.4.1",
    "@react-native-async-storage/async-storage": "^2.1.0",
    "react-native-screens": "^3.31.1",
    "react-native-safe-area-context": "^4.10.1",
    "react-native-gesture-handler": "^2.16.1",
    "react-native-svg": "^15.2.0",
    "lucide-react-native": "^0.453.0",
    "clsx": "^2.1.1"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.17"
  }
}
```

### tailwind.config.js
```js
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        // ... outras cores
      },
    },
  },
};
```

### metro.config.js
```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

### babel.config.js
```js
module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'nativewind/babel',
      'react-native-reanimated/plugin',
    ],
  };
};
```

## 📱 Componentes Portados

### ✅ Completos
- [x] AuthContext (localStorage → AsyncStorage)
- [x] ChatContext (mantido idêntico)
- [x] ProfileContext (localStorage → AsyncStorage)
- [x] Login screen
- [x] Signup screen
- [x] ChatApp screen
- [x] Header component
- [x] MessageList component
- [x] MessageItem component
- [x] Composer component
- [x] ProfilePanel (Sheet → Modal)
- [x] LLMPanel (Sheet → Modal)
- [x] AuthGate component
- [x] RootNavigator (react-router → react-navigation)

### 📚 Bibliotecas Mantidas
- [x] mockOpenAI.ts (sem mudanças)
- [x] solarKnowledge.ts (sem mudanças)
- [x] utils.ts (cn function adaptada)

## 🎯 Compatibilidade

| Plataforma | Status | Observações |
|------------|--------|-------------|
| **Web** | ✅ Funcional | Mobile-first, 100% responsivo |
| **Android** | ✅ Funcional | Testado com Expo Go |
| **iOS** | ✅ Funcional | Testado com Expo Go |

## 📝 Notas Importantes

1. **NativeWind** permite usar a mesma sintaxe Tailwind CSS em React Native
2. **AsyncStorage** é assíncrono, diferente do localStorage síncrono
3. **React Navigation** gerencia o estado de navegação automaticamente
4. **Modal** do RN substitui bem os Sheets do shadcn/ui
5. **SafeAreaView** é essencial para evitar sobreposição com notch/status bar

## 🚀 Próximos Passos

- [ ] Adicionar Firebase Authentication
- [ ] Integrar com OpenAI API real
- [ ] Implementar push notifications
- [ ] Adicionar modo offline
- [ ] Otimizar performance com memo/callback

