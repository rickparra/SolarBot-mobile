import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/layout/Header';
import MessageList from '../components/chat/MessageList';
import Composer from '../components/chat/Composer';
import LLMPanel from '../components/LLMPanel';
import { ChatProvider } from '../contexts/ChatContext';
import { ProfileProvider } from '../contexts/ProfileContext';
import { colors } from '../theme/theme';

const ChatApp = () => {
  const [showLLMSettings, setShowLLMSettings] = useState(false);

  return (
    <ProfileProvider>
      <ChatProvider>
        <SafeAreaView edges={['bottom']} style={styles.container}>
          <View style={styles.content}>
            <Header onOpenLLMSettings={() => setShowLLMSettings(true)} />
            <View style={styles.chat}>
              <MessageList />
              <Composer onOpenSettings={() => setShowLLMSettings(true)} />
            </View>
          </View>
          <LLMPanel visible={showLLMSettings} onClose={() => setShowLLMSettings(false)} />
        </SafeAreaView>
      </ChatProvider>
    </ProfileProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    flexDirection: 'column',
  },
  chat: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default ChatApp;
