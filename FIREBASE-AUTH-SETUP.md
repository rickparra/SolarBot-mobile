# 🔐 CONFIGURAÇÃO OBRIGATÓRIA - Firebase Authentication

## ⚠️ ERRO 400 (Bad Request) - Como Resolver

O erro que você está vendo significa que o **Firebase Authentication não está habilitado**. Siga os passos abaixo:

---

## 📋 Passo a Passo - Habilitar Firebase Authentication

### 1. Acessar o Firebase Console

1. Abra: **https://console.firebase.google.com/**
2. Selecione seu projeto: **solarbot-4516b**

### 2. Habilitar Authentication

1. No menu lateral esquerdo, clique em **"Authentication"** (Autenticação)
2. Se aparecer um botão **"Começar"** ou **"Get Started"**, clique nele
3. Isso vai ativar o serviço de Authentication

### 3. Habilitar Email/Senha como Método de Login

1. Dentro de Authentication, clique na aba **"Sign-in method"** (Método de login)
2. Você verá uma lista de provedores (providers)
3. Encontre **"Email/Password"** (Email/Senha)
4. Clique nele
5. **Habilite** o toggle/switch para **"Enable"** (Ativar)
6. Clique em **"Save"** (Salvar)

### 4. Verificar se está ativo

Após salvar, você deve ver:
- ✅ **Email/Password** com status **"Enabled"** (Ativado)

---

## 🔐 Configurar Regras do Realtime Database (Também Obrigatório)

### 1. Acessar Realtime Database

1. No menu lateral, clique em **"Realtime Database"**
2. Se não existir, clique em **"Criar banco de dados"** (Create database)
3. Escolha a localização: **us-central1** (ou mais próxima)
4. Comece em **modo de teste** (pode alterar depois)

### 2. Configurar Regras de Segurança

1. Dentro do Realtime Database, clique na aba **"Regras"** (Rules)
2. **DELETE** tudo que estiver lá
3. **COLE** estas regras:

```json
{
  "rules": {
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid",
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

4. Clique em **"Publicar"** (Publish)

---

## ✅ Testar Novamente

Após completar os passos acima:

1. **Recarregue** o app no navegador (Ctrl+R ou Cmd+R)
2. Tente **criar uma conta**:
   - Email: teste@teste.com
   - Senha: 123456 (ou mais caracteres)
3. Se funcionar, você verá sua conta em:
   - Firebase Console → **Authentication** → **Users**

---

## 🐛 Ainda com Erro?

### Verificar no Firebase Console:

#### ✅ Authentication Habilitado?
- Firebase Console → **Authentication**
- Deve mostrar dashboard, não botão "Get Started"

#### ✅ Email/Password Ativo?
- Authentication → **Sign-in method**
- Email/Password deve ter status **"Enabled"**

#### ✅ Realtime Database Existe?
- Firebase Console → **Realtime Database**
- Deve mostrar o banco de dados (não botão "Create database")

#### ✅ Regras Publicadas?
- Realtime Database → **Rules**
- Devem ter as regras com `users/$userId`

---

## 📸 Referência Visual

### Como deve estar o Authentication:

```
Authentication
├── Users (aba) - Lista de usuários
├── Sign-in method (aba)
│   └── ✅ Email/Password [Enabled]
└── Settings (aba)
```

### Como devem estar as Rules do Database:

```json
{
  "rules": {
    "users": {
      "$userId": {
        ".read": "$userId === auth.uid",
        ".write": "$userId === auth.uid",
        ".indexOn": ["createdAt"]
      }
    }
  }
}
```

---

## 🆘 Ainda com problemas?

Verifique:
1. ✅ Você está no projeto correto? (**solarbot-4516b**)
2. ✅ Authentication está realmente habilitado?
3. ✅ Email/Password está com toggle verde (Enabled)?
4. ✅ Realtime Database foi criado?
5. ✅ As regras foram publicadas?

Se tudo estiver correto e ainda não funcionar:
- Limpe o cache do navegador
- Tente em uma aba anônima
- Verifique o console do navegador para outros erros

---

## 📞 Depois de Configurar

Quando estiver tudo funcionando:
1. Crie uma conta de teste
2. Faça login
3. Envie uma mensagem no chat
4. Verifique no Firebase Console:
   - **Authentication → Users**: Deve ter seu usuário
   - **Realtime Database → Data**: Deve ter `users/{userId}/profile` e `messages`

✅ **Pronto! O Firebase está configurado e funcional!**

