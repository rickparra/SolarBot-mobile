import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, browserLocalPersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { Platform } from 'react-native';

console.log('🔥 [FIREBASE] Inicializando Firebase...');
console.log('🌍 Platform:', Platform.OS);

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDPy3i5u9ZfyMiIrbIJLZsw4CVl-ZuZhfI",
  authDomain: "solarbot-4516b.firebaseapp.com",
  projectId: "solarbot-4516b",
  storageBucket: "solarbot-4516b.firebasestorage.app",
  messagingSenderId: "555129048249",
  appId: "1:555129048249:web:1f7891a0739ad68fb45f68",
  databaseURL: "https://solarbot-4516b-default-rtdb.firebaseio.com",
};

console.log('⚙️ [FIREBASE] Config:', {
  projectId: firebaseConfig.projectId,
  authDomain: firebaseConfig.authDomain,
  databaseURL: firebaseConfig.databaseURL,
  apiKey: firebaseConfig.apiKey.substring(0, 10) + '...',
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log('✅ [FIREBASE] App inicializado');

// Initialize Firebase Auth with platform-specific persistence
let auth;

console.log('🔐 [FIREBASE] Inicializando Authentication...');

if (Platform.OS === 'web') {
  console.log('🌐 [FIREBASE] Usando browserLocalPersistence (web)');
  // For web, use browser persistence
  auth = initializeAuth(app, {
    persistence: browserLocalPersistence
  });
  console.log('✅ [FIREBASE] Auth inicializado para WEB');
} else {
  console.log('📱 [FIREBASE] Usando AsyncStorage persistence (mobile)');
  // For native (iOS/Android), use AsyncStorage persistence
  // Dynamically import to avoid issues on web
  const { getReactNativePersistence } = require('firebase/auth');
  const AsyncStorage = require('@react-native-async-storage/async-storage').default;
  
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
  console.log('✅ [FIREBASE] Auth inicializado para MOBILE');
}

// Initialize Realtime Database
console.log('💾 [FIREBASE] Inicializando Realtime Database...');
const database = getDatabase(app);
console.log('✅ [FIREBASE] Database inicializado');

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('🎉 [FIREBASE] Todas as configurações completas!');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

export { auth, database };

