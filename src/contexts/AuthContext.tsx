import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { auth } from '../config/firebase';

interface User {
  id: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          email: firebaseUser.email || '',
        });
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }
    
    console.log('🔐 [AUTH] Tentando fazer login...');
    console.log('📧 Email:', email);
    console.log('🔑 Senha length:', password.length);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ [AUTH] Login bem-sucedido!');
    } catch (error: any) {
      // Log detalhado do erro
      console.error('❌ [AUTH] ERRO NO LOGIN:');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      console.error('Full Error Object:', error);
      console.error('Custom Data:', error.customData);
      if (error.customData?._tokenResponse) {
        console.error('Token Response:', error.customData._tokenResponse);
      }
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // Handle Firebase errors with friendly messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        throw new Error('Email ou senha incorretos');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Email inválido');
      } else if (error.code === 'auth/too-many-requests') {
        throw new Error('Muitas tentativas. Tente novamente mais tarde');
      } else {
        throw new Error(`Erro ao fazer login: ${error.code || error.message}`);
      }
    }
  };

  const signUp = async (email: string, password: string) => {
    if (!email || !password) {
      throw new Error('Email e senha são obrigatórios');
    }
    if (password.length < 6) {
      throw new Error('Senha deve ter pelo menos 6 caracteres');
    }
    if (!email.includes('@')) {
      throw new Error('Email inválido');
    }
    
    console.log('📝 [AUTH] Tentando criar conta...');
    console.log('📧 Email:', email);
    console.log('🔑 Senha length:', password.length);
    console.log('🌍 Platform:', require('react-native').Platform.OS);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('✅ [AUTH] Conta criada com sucesso!');
      console.log('👤 User ID:', userCredential.user.uid);
    } catch (error: any) {
      // Log detalhado do erro
      console.error('❌ [AUTH] ERRO AO CRIAR CONTA:');
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.error('Error Code:', error.code);
      console.error('Error Message:', error.message);
      console.error('Full Error Object:', error);
      console.error('Custom Data:', error.customData);
      if (error.customData?._tokenResponse) {
        console.error('Token Response:', error.customData._tokenResponse);
      }
      if (error.customData?.httpStatus) {
        console.error('HTTP Status:', error.customData.httpStatus);
      }
      console.error('Stack Trace:', error.stack);
      console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      
      // Handle Firebase errors with friendly messages
      if (error.code === 'auth/email-already-in-use') {
        throw new Error('Este email já está em uso');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Email inválido');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('Senha muito fraca. Use pelo menos 6 caracteres');
      } else if (error.code === 'auth/configuration-not-found') {
        throw new Error('Firebase Authentication não está habilitado. Configure no Firebase Console');
      } else {
        throw new Error(`Erro ao criar conta: ${error.code || error.message}`);
      }
    }
  };

  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

