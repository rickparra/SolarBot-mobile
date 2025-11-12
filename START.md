# 🚀 Guia de Início Rápido - SolarBot Mobile

## Comandos para Iniciar a Aplicação

### 🌐 Iniciar na Web (Recomendado para teste)

```bash
# Limpar cache e iniciar
npm run start:clean

# Depois pressione 'w' para abrir no navegador
# Ou acesse: http://localhost:8081
```

### 📱 Iniciar no Mobile

```bash
# Android
npm run android

# iOS
npm run ios
```

### 🧹 Se tiver problemas

```bash
# 1. Limpar tudo
rm -rf node_modules .expo
npm install --legacy-peer-deps

# 2. Iniciar limpo
npm run start:clean
```

## ✅ Checklist Antes de Iniciar

- [ ] Node.js 16+ instalado
- [ ] Dependências instaladas (`npm install --legacy-peer-deps`)
- [ ] Porta 8081 livre (ou use outra com `--port 8082`)
- [ ] Internet conectada (para Expo Go)

## 🎯 Login de Teste

A aplicação usa autenticação mock:

- **Email**: qualquer@email.com
- **Senha**: qualquer senha com 6+ caracteres

## 📝 Estrutura da Aplicação

```
Login/Signup → Chat Solar → Menu (Perfil, LLM Config, Sair)
```

## 🔧 Resolução de Problemas

### Erro 500 no navegador

```bash
# Parar o servidor (Ctrl+C)
# Limpar cache
npx expo start --clear

# Ou use porta alternativa
npx expo start --web --port 8082
```

### Metro Bundler trava

```bash
# Kill processo na porta
# Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F

# Reiniciar
npm run start:clean
```

### CSS não funciona

```bash
# Verificar se global.css existe
cat global.css

# Deve conter:
# @tailwind base;
# @tailwind components;
# @tailwind utilities;
```

## 🎨 Testando Funcionalidades

1. **Autenticação**
   - Criar conta (Signup)
   - Fazer login
   - Ver persistência (recarregar página)

2. **Chat**
   - Perguntar sobre "dimensionamento de painéis solares"
   - Perguntar sobre "inversores"
   - Perguntar sobre "custos"
   - Ver histórico de mensagens

3. **Perfil**
   - Abrir menu → Perfil
   - Alterar nome, função, região
   - Salvar e verificar persistência

4. **LLM Config**
   - Abrir menu → LLM
   - Ver informações do modelo mock

## 🌟 Próximos Passos

Depois de testar:

1. **Integrar Firebase**
   - Substituir AuthContext mock
   - Usar Firebase Auth

2. **Integrar OpenAI**
   - Substituir mockOpenAI
   - Adicionar chave de API real

3. **Melhorias**
   - Histórico persistente de conversas
   - Compartilhamento de mensagens
   - Notificações push

## 📞 Suporte

Problemas? Consulte:

- `TROUBLESHOOTING.md` - Soluções detalhadas
- `PORTING.md` - Guia de porting
- `README.md` - Documentação completa

