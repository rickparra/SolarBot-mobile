import React, { useEffect, useRef } from 'react';
import { ScrollView, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-paper';
import { useChat } from '../../contexts/ChatContext';
import MessageItem from './MessageItem';
import { colors, spacing } from '../../theme/theme';

const MessageList = () => {
  const { messages, isLoading } = useChat();
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, isLoading]);

  return (
    <ScrollView
      ref={scrollViewRef}
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      {messages.length === 0 ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyContent}>
            <Text variant="headlineSmall" style={styles.emptyTitle}>
              Bem-vindo ao Chat Solar
            </Text>
            <Text variant="bodyMedium" style={styles.emptySubtitle}>
              Faça perguntas sobre dimensionamento, inversores, manutenção e muito mais sobre
              energia solar fotovoltaica.
            </Text>
          </View>
        </View>
      ) : (
        <>
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
          {isLoading && (
            <View style={styles.loadingContainer}>
              <View style={styles.loadingBubble}>
                <ActivityIndicator size="small" color={colors.textSecondary} />
                <Text style={styles.loadingText}>Gerando resposta...</Text>
              </View>
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 400,
  },
  emptyContent: {
    maxWidth: 400,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    color: colors.text,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  emptySubtitle: {
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  loadingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: spacing.md,
  },
  loadingBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.muted,
    borderRadius: 12,
    padding: spacing.md,
    gap: spacing.sm,
  },
  loadingText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
});

export default MessageList;
