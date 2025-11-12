# 🔍 Instruções de Debug - Firebase Authentication Error 400

## ✅ Logs Detalhados Implementados!

Adicionei logging completo no sistema. Agora você verá **exatamente** o que está acontecendo e qual é o erro específico do Firebase.

---

## 📋 Como Testar e Coletar Logs

### Passo 1: Limpar o Console

1. Abra o **Console do Navegador** (F12)
2. Limpe os logs existentes (ícone 🚫 ou Ctrl+L)

### Passo 2: Recarregar o App

1. Recarregue a página (F5 ou Ctrl+R)
2. Você deverá ver logs de inicialização do Firebase:

```
🔥 [FIREBASE] Inicializando Firebase...
🌍 Platform: web
⚙️ [FIREBASE] Config: {...}
✅ [FIREBASE] App inicializado
🔐 [FIREBASE] Inicializando Authentication...
🌐 [FIREBASE] Usando browserLocalPersistence (web)
✅ [FIREBASE] Auth inicializado para WEB
💾 [FIREBASE] Inicializando Realtime Database...
✅ [FIREBASE] Database inicializado
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🎉 [FIREBASE] Todas as configurações completas!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Passo 3: Tentar Criar Conta (Signup)

1. Vá para a tela de **Criar Conta**
2. Insira:
   - Email: `teste@teste.com`
   - Senha: `123456` (ou mais caracteres)
3. Clique em **"Criar conta"**
4. **COPIE TODOS OS LOGS** que aparecerem no console

Você verá logs como:

```
📝 [AUTH] Tentando criar conta...
📧 Email: teste@teste.com
🔑 Senha length: 6
🌍 Platform: web
```

E depois, SE DER ERRO:

```
❌ [AUTH] ERRO AO CRIAR CONTA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Error Code: auth/xxxxx
Error Message: (mensagem detalhada)
Full Error Object: {...}
Custom Data: {...}
Token Response: {...}
HTTP Status: 400
Stack Trace: ...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

### Passo 4: Copiar e Enviar os Logs

**COPIE TUDO** que aparecer no console após clicar em "Criar conta", especialmente:

1. ✅ Os logs de **inicialização** do Firebase
2. ✅ Os logs de **tentativa de criar conta**
3. ✅ O **erro completo** (se houver)
4. ✅ O **Error Code** específico
5. ✅ O **Error Message**
6. ✅ O **Custom Data** e **Token Response**

---

## 🔍 O Que Procurar nos Logs

### Informações Críticas:

1. **Error Code** - O código específico do erro (ex: `auth/operation-not-allowed`)
2. **Error Message** - A mensagem de erro do Firebase
3. **HTTP Status** - Deve ser 400
4. **Custom Data** - Pode ter informações adicionais

---

## 🎯 Diagnóstico Automático

Com base no **Error Code**, vou identificar o problema:

### `auth/operation-not-allowed`
**Causa**: Email/Password authentication não está habilitado no Firebase Console  
**Solução**: Habilitar Email/Password em Authentication → Sign-in method

### `auth/api-key-not-valid`
**Causa**: API Key inválida ou com restrições  
**Solução**: Verificar API Key no Firebase Console → Project Settings

### `auth/unauthorized-domain`
**Causa**: Domínio não autorizado  
**Solução**: Adicionar domínio em Authentication → Settings → Authorized domains

### `auth/invalid-api-key`
**Causa**: API Key incorreta  
**Solução**: Verificar e corrigir API Key em `firebase.ts`

### `auth/app-not-authorized`
**Causa**: App não autorizado para usar Firebase Authentication  
**Solução**: Verificar configuração do projeto no Firebase Console

---

## 📝 Exemplo de Saída Esperada (Se Funcionar)

Se tudo estiver correto, você verá:

```
📝 [AUTH] Tentando criar conta...
📧 Email: teste@teste.com
🔑 Senha length: 6
🌍 Platform: web
✅ [AUTH] Conta criada com sucesso!
👤 User ID: abc123xyz456
```

---

## 🚀 Depois de Coletar os Logs

1. **Cole os logs completos** aqui
2. Eu vou identificar **exatamente** qual é o problema
3. Vou fornecer a **solução específica**
4. Vamos aplicar a correção
5. Removeremos os logs de debug

---

## 💡 Dicas

### Se não aparecer NENHUM log:
- O console está na aba correta? (Console, não Elements ou Network)
- Tente recarregar com cache limpo: Ctrl+Shift+R

### Se aparecer erro antes de tentar signup:
- Copie esse erro também! Pode ser um problema de configuração

### Se aparecer erro de CORS:
- Isso é outro problema relacionado a domínios autorizados

---

## ⏭️ Próximos Passos

1. ✅ **Execute os testes acima**
2. ✅ **Copie TODOS os logs do console**
3. ✅ **Me envie os logs**
4. ✅ Eu vou diagnosticar e corrigir o problema
5. ✅ Removeremos os logs de debug

**Aguardando seus logs!** 🔍

