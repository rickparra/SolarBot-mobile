# ✅ Checklist de Verificação Final - SolarBot Mobile

## 📋 Arquivos de Configuração

### 1. babel.config.js
```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['nativewind/babel'],
  };
};
```
- ✅ Formato correto
- ✅ Sem trailing commas problemáticas
- ✅ Plugin do NativeWind incluído

### 2. package.json
```json
{
  "main": "expo/AppEntry.js",
  "dependencies": {
    // ✅ SEM react-native-reanimated
    // ✅ SEM react-native-worklets-core
    "nativewind": "^4.0.1",
    "expo": "~54.0.23",
    ...
  },
  "devDependencies": {
    "babel-preset-expo": "~12.0.5",
    ...
  }
}
```

### 3. metro.config.js
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

config.resolver = {
  ...config.resolver,
  sourceExts: [...config.resolver.sourceExts, 'css'],
};

module.exports = withNativeWind(config, { 
  input: './global.css',
  inlineRem: false,
});
```

### 4. app.json
```json
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

### 5. global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 🔍 Verificações de Código

### ScrollView Props
❌ **ERRADO:**
```tsx
<ScrollView contentContainerClassName="..." />
```

✅ **CORRETO:**
```tsx
<ScrollView contentContainerStyle={{ ... }} />
```

### Arquivos Verificados:
- ✅ `src/screens/Login.tsx`
- ✅ `src/screens/Signup.tsx`
- ✅ `src/components/chat/MessageList.tsx`

## 🚀 Comandos de Inicialização

### Passo a Passo Completo:

```bash
# 1. Parar todos os servidores
# Windows PowerShell:
Get-Process -Name "node" | Stop-Process -Force

# 2. Limpar cache
cd SolarBot-mobile
Remove-Item -Recurse -Force .expo
Remove-Item -Recurse -Force node_modules/.cache

# 3. Verificar dependências
npm install --legacy-peer-deps

# 4. Verificar TypeScript
npx tsc --noEmit

# 5. Iniciar servidor limpo
npx expo start --clear --web

# 6. Aguardar mensagem:
# "› Web is waiting on http://localhost:8081"

# 7. Pressionar 'w' ou acessar:
# http://localhost:8081
```

## 🐛 Se Ainda Houver Erro

### Solução Drástica (Reset Completo):

```bash
# 1. Parar TUDO
Get-Process -Name "node" | Stop-Process -Force

# 2. Deletar tudo que pode ter cache
Remove-Item -Recurse -Force node_modules
Remove-Item -Recurse -Force .expo
Remove-Item package-lock.json

# 3. Reinstalar do zero
npm install --legacy-peer-deps

# 4. Iniciar
npx expo start --clear --web
```

### Verificar Porta em Uso:

```bash
# Verificar se porta 8081 está em uso
netstat -ano | findstr :8081

# Se aparecer algo, matar o processo:
taskkill /PID <PID_NUMBER> /F

# Ou usar porta alternativa:
npx expo start --clear --web --port 8082
```

## 📝 Logs Esperados (Sucesso)

Quando tudo funcionar, você deve ver:

```
Starting Metro Bundler
✔ Metro waiting on exp://192.168.x.x:8081
› Web is waiting on http://localhost:8081
› Press w │ open web
```

**NÃO deve aparecer:**
- ❌ "Cannot find module"
- ❌ "BABEL error"
- ❌ "500 Internal Server Error"
- ❌ ".plugins is not a valid Plugin property"

## 🎯 Teste de Funcionalidade

Após abrir no navegador:

1. **Tela de Login deve aparecer:**
   - ✅ Logo "SkillUpPlus Solar"
   - ✅ Campos de email e senha
   - ✅ Botão "Entrar"
   - ✅ Link "Criar conta"

2. **Fazer Login:**
   - Email: `teste@teste.com`
   - Senha: `123456`
   - ✅ Deve navegar para tela de chat

3. **Chat deve funcionar:**
   - ✅ Mensagem de boas-vindas
   - ✅ Campo de texto na parte inferior
   - ✅ Botão de enviar
   - ✅ Menu no header (hamburguer)

4. **Menu deve funcionar:**
   - ✅ Abrir menu
   - ✅ Ver opções: Perfil, LLM, Sair
   - ✅ Modals devem abrir

## 🔧 Arquivos Críticos

Esses arquivos **NÃO podem** ter erros:

1. `babel.config.js` - Configuração do Babel
2. `metro.config.js` - Configuração do Metro
3. `package.json` - Dependências corretas
4. `app.json` - Configuração do Expo
5. `App.tsx` - Componente raiz
6. `src/navigation/RootNavigator.tsx` - Navegação

## 📞 Status Final

Após seguir este checklist:
- ✅ Servidor deve iniciar sem erros
- ✅ Navegador deve carregar a aplicação
- ✅ Login deve funcionar
- ✅ Chat deve funcionar
- ✅ Navegação deve funcionar

**Se tudo isso funcionar, a aplicação está 100% operacional!** 🎉

## 🚨 Último Recurso

Se NADA funcionar:

```bash
# Backup do código
cp -r src src_backup

# Criar novo projeto Expo
npx create-expo-app@latest SolarBot-new

# Copiar arquivos de configuração corrigidos
cp babel.config.js ../SolarBot-new/
cp metro.config.js ../SolarBot-new/
cp tailwind.config.js ../SolarBot-new/
cp global.css ../SolarBot-new/

# Copiar src/
cp -r src ../SolarBot-new/

# Instalar dependências
cd ../SolarBot-new
npm install --legacy-peer-deps

# Iniciar
npx expo start --web
```

