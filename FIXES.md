# 🔧 Correções Aplicadas - SolarBot Mobile

Documentação de todos os problemas encontrados e corrigidos durante o setup.

## ❌ Problemas Encontrados e ✅ Soluções Aplicadas

### 1. `babel-preset-expo` não encontrado

**Erro:**
```
ERROR  index.ts: Cannot find module 'babel-preset-expo'
```

**Causa:** Dependência faltando no `package.json`

**Solução:**
```json
// package.json - devDependencies
"babel-preset-expo": "~12.0.5"
```

---

### 2. `react-native-worklets/plugin` não encontrado

**Erro:**
```
ERROR  index.ts: [BABEL]: Cannot find module 'react-native-worklets/plugin'
```

**Causa:** `react-native-reanimated` requer dependências adicionais que não são necessárias para este projeto

**Solução:**
- Removido `react-native-reanimated` do `package.json`
- Removido `react-native-worklets-core` do `package.json`
- Removido plugin do `babel.config.js`:
```js
// babel.config.js
plugins: [
  'nativewind/babel',
  // ✅ Removido: 'react-native-reanimated/plugin',
],
```

---

### 3. Erro 500 - `contentContainerClassName` inválido

**Erro:**
```
Failed to load resource: the server responded with a status of 500
MIME type ('application/json') is not executable
```

**Causa:** `contentContainerClassName` não é uma prop válida do `ScrollView` no React Native. Apenas `className` e `contentContainerStyle` são válidos.

**Solução:** Substituído em todos os arquivos:

**Login.tsx & Signup.tsx:**
```tsx
// ❌ ANTES
<ScrollView
  contentContainerClassName="flex-1 items-center justify-center..."
  className="flex-1 bg-background"
>

// ✅ DEPOIS
<ScrollView
  contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 16 }}
  className="flex-1 bg-background"
>
```

**MessageList.tsx:**
```tsx
// ❌ ANTES
<ScrollView
  className="flex-1 p-4"
  contentContainerClassName="space-y-4"
>

// ✅ DEPOIS
<ScrollView
  className="flex-1 p-4"
  contentContainerStyle={{ gap: 16 }}
>
```

---

### 4. Versões incompatíveis com Expo 54

**Problema:** Avisos sobre versões de pacotes não compatíveis

**Solução:** Atualizadas as versões no `package.json`:
```json
"react-native-screens": "~4.16.0",
"react-native-safe-area-context": "~5.6.0",
"react-native-gesture-handler": "~2.28.0",
"react-native-svg": "~15.12.1"
```

---

### 5. Entry point incorreto

**Problema:** `main` apontando para `index.ts` customizado

**Solução:**
```json
// package.json
"main": "expo/AppEntry.js"  // ✅ Padrão do Expo
```

---

### 6. Configuração do Metro incompleta

**Problema:** Metro não processando CSS corretamente

**Solução:**
```js
// metro.config.js
config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'css'],
};

module.exports = withNativeWind(config, { 
  input: './global.css',
  inlineRem: false,
});
```

---

### 7. Configuração do app.json incompleta

**Problema:** Faltando configurações para bundler

**Solução:**
```json
// app.json
{
  "expo": {
    "bundler": "metro",
    "web": {
      "bundler": "metro"
    },
    "experiments": {
      "tsconfigPaths": true
    }
  }
}
```

---

## 📦 Dependências Finais

```json
{
  "dependencies": {
    "@gluestack-style/react": "^1.0.52",
    "@gluestack-ui/themed": "^1.1.30",
    "@react-native-async-storage/async-storage": "^2.1.0",
    "@react-navigation/native": "^6.1.18",
    "@react-navigation/stack": "^6.4.1",
    "clsx": "^2.1.1",
    "expo": "~54.0.23",
    "expo-status-bar": "~3.0.8",
    "lucide-react-native": "^0.453.0",
    "nativewind": "^4.0.1",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "react-native": "0.81.5",
    "react-native-gesture-handler": "~2.28.0",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-native-svg": "~15.12.1",
    "react-native-web": "^0.21.0"
  },
  "devDependencies": {
    "@types/react": "~19.1.0",
    "babel-preset-expo": "~12.0.5",
    "tailwindcss": "^3.4.17",
    "typescript": "~5.9.2"
  }
}
```

---

## ✅ Checklist de Verificação

Antes de iniciar, verificar:

- [x] `babel-preset-expo` instalado
- [x] `react-native-reanimated` removido
- [x] `contentContainerClassName` substituído por `contentContainerStyle`
- [x] Versões dos pacotes alinhadas com Expo 54
- [x] Entry point correto (`expo/AppEntry.js`)
- [x] Metro config com suporte a CSS
- [x] app.json com bundler configurado
- [x] `npm install --legacy-peer-deps` executado
- [x] TypeScript sem erros (`npx tsc --noEmit`)

---

## 🚀 Como Iniciar Após as Correções

```bash
# 1. Limpar cache
npm run start:clean

# 2. Aguardar servidor iniciar

# 3. Pressionar 'w' para web
# Ou acessar: http://localhost:8081
```

---

## 📝 Lições Aprendidas

1. **NativeWind Props:** Nem todas as props CSS funcionam diretamente no React Native
   - Use `contentContainerStyle` ao invés de `contentContainerClassName`
   - Combine `className` (NativeWind) com `style` (inline) quando necessário

2. **React Native Reanimated:** Só incluir se realmente precisar de animações complexas
   - Requer dependências extras (`worklets`)
   - Adiciona complexidade ao build

3. **Expo Entry Point:** Sempre usar `expo/AppEntry.js` como main
   - Permite que o Expo gerencie o registro do componente
   - Funciona melhor para web e native

4. **Metro Config:** Sempre configurar sourceExts para CSS quando usar NativeWind
   - Necessário para processamento correto do CSS
   - Web requer configuração explícita

5. **Versões:** Sempre alinhar versões com a versão do Expo
   - Use `expo doctor` para verificar compatibilidade
   - Instale com `--legacy-peer-deps` quando necessário

---

## 🎯 Status Atual

✅ **APLICAÇÃO FUNCIONANDO 100%**

Todas as correções foram aplicadas e testadas. A aplicação está pronta para uso!

