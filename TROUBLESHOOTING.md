# Troubleshooting - SolarBot Mobile

Guia de resolução de problemas comuns durante o desenvolvimento.

## 🔧 Problemas e Soluções

### 1. Erro: "Cannot find module 'babel-preset-expo'"

**Sintoma:**
```
ERROR  index.ts: Cannot find module 'babel-preset-expo'
```

**Causa:** O `babel-preset-expo` não está instalado como dependência.

**Solução:**
```bash
# Adicionar babel-preset-expo ao package.json devDependencies
# Depois reinstalar:
npm install --legacy-peer-deps
```

**Alternativa rápida:**
```bash
npm install --save-dev babel-preset-expo --legacy-peer-deps
```

---

### 2. Erro: "Cannot find module 'react-native-worklets/plugin'"

**Sintoma:**
```
ERROR  index.ts: [BABEL]: Cannot find module 'react-native-worklets/plugin'
```

**Causa:** O `react-native-reanimated` requer dependências adicionais que não são necessárias para este projeto.

**Solução:**
Como não estamos usando animações complexas, removemos o `react-native-reanimated`:

1. Remover o plugin do `babel.config.js`:
```js
plugins: [
  'nativewind/babel',
  // Removido: 'react-native-reanimated/plugin',
],
```

2. Remover as dependências do `package.json`:
```bash
# As dependências já foram removidas do package.json
npm install --legacy-peer-deps
npx expo start --clear
```

---

### 3. Avisos de versões incompatíveis do Expo

**Sintoma:**
```
The following packages should be updated for best compatibility with the installed expo version:
  react-native-screens@3.37.0 - expected version: ~4.16.0
  react-native-safe-area-context@4.14.1 - expected version: ~5.6.0
```

**Causa:** Versões dos pacotes não estão alinhadas com o Expo 54.

**Solução:**
As versões já estão corretas no `package.json`. Execute:
```bash
npm install --legacy-peer-deps
```

---

### 4. Erro ao remover node_modules no Windows

**Sintoma:**
```
Remove-Item : Não é possível remover o item [...]: O acesso ao caminho foi negado.
```

**Causa:** Arquivos `.node` nativos podem estar bloqueados no Windows.

**Solução:**
1. Feche todos os terminais e editores
2. Feche o Expo/Metro Bundler se estiver rodando
3. Tente novamente ou use:
```bash
# Alternativa: usar rimraf
npx rimraf node_modules
npm install --legacy-peer-deps
```

---

### 5. Erro de peer dependencies

**Sintoma:**
```
npm error ERESOLVE unable to resolve dependency tree
npm error Conflicting peer dependency
```

**Solução:**
Use a flag `--legacy-peer-deps`:
```bash
npm install --legacy-peer-deps
```

---

### 6. Metro Bundler não inicia

**Sintoma:**
O servidor não inicia ou trava em "Starting Metro Bundler"

**Solução:**
```bash
# Limpar cache do Metro
npx expo start --clear

# Ou limpar manualmente
npx expo start -c
```

---

### 7. Erro de importação CSS no NativeWind

**Sintoma:**
```
ERROR  Cannot find module './global.css'
```

**Solução:**
Verifique se o arquivo `global.css` existe na raiz do projeto:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

E se está sendo importado no `App.tsx`:
```tsx
import './global.css';
```

---

### 8. Classes Tailwind não funcionam

**Sintoma:**
Classes CSS não são aplicadas aos componentes.

**Solução:**
1. Verifique se o `babel.config.js` tem o plugin do NativeWind:
```js
plugins: [
  'nativewind/babel',
  'react-native-reanimated/plugin',
],
```

2. Verifique se o `metro.config.js` está configurado:
```js
const { withNativeWind } = require('nativewind/metro');
module.exports = withNativeWind(config, { input: './global.css' });
```

3. Limpe o cache e reinicie:
```bash
npx expo start -c
```

---

### 9. Erro no TypeScript

**Sintoma:**
```
TS2307: Cannot find module '@/...' or its corresponding type declarations.
```

**Solução:**
Verifique o `tsconfig.json`:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

---

### 10. AsyncStorage não funciona

**Sintoma:**
```
ERROR  Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'AsyncStorage' could not be found
```

**Solução:**
```bash
npm install @react-native-async-storage/async-storage --legacy-peer-deps
npx expo prebuild --clean
```

---

### 11. Navegação não funciona

**Sintoma:**
Tela branca ou erro ao navegar entre telas.

**Solução:**
1. Verifique se o `react-native-gesture-handler` está importado no topo do `App.tsx`:
```tsx
import 'react-native-gesture-handler';
```

2. Reinstale as dependências de navegação:
```bash
npm install @react-navigation/native @react-navigation/stack --legacy-peer-deps
npm install react-native-screens react-native-safe-area-context --legacy-peer-deps
```

---

### 12. Ícones do Lucide não aparecem

**Sintoma:**
Ícones não são renderizados ou aparecem como quadrados vazios.

**Solução:**
1. Verifique a importação:
```tsx
import { User } from 'lucide-react-native';
<User color="#000" size={24} />
```

2. Certifique-se de que `react-native-svg` está instalado:
```bash
npm install react-native-svg --legacy-peer-deps
```

---

### 13. Web não inicia (localhost)

**Sintoma:**
Erro ao acessar `http://localhost:8081`

**Solução:**
1. Verifique se outra aplicação está usando a porta 8081
2. Tente iniciar em outra porta:
```bash
npx expo start --web --port 8082
```

3. Ou mate o processo na porta 8081:
```bash
# Windows
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

---

## 🚀 Comandos Úteis

### Limpar cache e reiniciar
```bash
npx expo start --clear
```

### Reinstalar dependências do zero
```bash
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### Verificar versões instaladas
```bash
npm list react-native
npm list expo
```

### Atualizar Expo CLI
```bash
npm install -g expo-cli
```

### Build para produção
```bash
# Web
npx expo export:web

# Android
eas build --platform android

# iOS
eas build --platform ios
```

---

## 📱 Testando em Dispositivos

### Android (Expo Go)
1. Instale o Expo Go na Play Store
2. Escaneie o QR code mostrado no terminal
3. Ou digite a URL manualmente

### iOS (Expo Go)
1. Instale o Expo Go na App Store
2. Escaneie o QR code com a câmera nativa
3. Toque na notificação para abrir

### Web
1. Pressione `w` no terminal ou
2. Acesse `http://localhost:8081` no navegador

---

## 🔍 Debug

### Modo de debug
```bash
# Pressione 'j' no terminal para abrir o debugger
# Ou pressione 'm' para o menu de developer
```

### Logs
```bash
# Ver logs em tempo real
npx expo start

# Logs mais detalhados
npx expo start --dev-client
```

### React Native Debugger
```bash
# Instalar
npm install -g react-devtools

# Executar
react-devtools
```

---

## 📞 Suporte

Se o problema persistir:

1. **Verifique a documentação oficial:**
   - [Expo Docs](https://docs.expo.dev/)
   - [React Navigation](https://reactnavigation.org/docs/getting-started)
   - [NativeWind](https://www.nativewind.dev/)

2. **Crie uma issue no repositório**

3. **Verifique issues similares:**
   - [Expo GitHub](https://github.com/expo/expo/issues)
   - [React Navigation GitHub](https://github.com/react-navigation/react-navigation/issues)

---

## ✅ Checklist de Verificação

Antes de reportar um problema, verifique:

- [ ] Node.js versão 16+ instalado
- [ ] npm ou yarn atualizado
- [ ] Dependências instaladas com `--legacy-peer-deps`
- [ ] Cache limpo (`npx expo start -c`)
- [ ] `babel.config.js` configurado corretamente
- [ ] `metro.config.js` configurado corretamente
- [ ] `global.css` existe e está importado
- [ ] Sem erros de TypeScript
- [ ] Porta 8081 está livre
- [ ] Internet conectada (para Expo Go)

