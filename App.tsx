import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider } from 'react-native-paper';
import { AuthProvider } from './src/contexts/AuthContext';
import { LLMProvider } from './src/contexts/LLMContext';
import RootNavigator from './src/navigation/RootNavigator';
import { theme } from './src/theme/theme';

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <AuthProvider>
        <LLMProvider>
          <RootNavigator />
          <StatusBar style="auto" />
        </LLMProvider>
      </AuthProvider>
    </PaperProvider>
  );
}
