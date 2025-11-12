import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { TextInput, IconButton, Text, Button } from 'react-native-paper';
import { useChat } from '../../contexts/ChatContext';
import { useLLM } from '../../contexts/LLMContext';
import { colors, spacing } from '../../theme/theme';

interface ComposerProps {
  onOpenSettings?: () => void;
}

const Composer = ({ onOpenSettings }: ComposerProps) => {
  const [input, setInput] = useState('');
  const { sendMessage, isLoading, error } = useChat();
  const { hasApiKey } = useLLM();

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const message = input.trim();
    setInput('');
    
    try {
      await sendMessage(message);
    } catch (err) {
      Alert.alert('Erro', 'Falha ao enviar mensagem. Tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      {!hasApiKey && (
        <View style={styles.warningContainer}>
          <Text style={styles.warningText}>
            ⚠️ Configure sua API Key do Gemini para começar a usar o chat
          </Text>
          {onOpenSettings && (
            <Button 
              mode="contained" 
              onPress={onOpenSettings}
              style={styles.configButton}
              compact
            >
              Configurar
            </Button>
          )}
        </View>
      )}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={hasApiKey ? "Pergunte sobre placas solares..." : "Configure a API Key para começar"}
          multiline
          style={styles.input}
          mode="outlined"
          disabled={!hasApiKey || isLoading}
          right={
            <TextInput.Icon
              icon="send"
              onPress={handleSubmit}
              disabled={!hasApiKey || !input.trim() || isLoading}
            />
          }
        />
      </View>
      <Text variant="labelSmall" style={styles.hint}>
        {hasApiKey ? 'Pressione o botão para enviar' : 'API Key necessária para usar o chat'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    padding: spacing.md,
  },
  warningContainer: {
    backgroundColor: '#fff3cd',
    padding: spacing.md,
    borderRadius: 8,
    marginBottom: spacing.sm,
    alignItems: 'center',
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  configButton: {
    marginTop: spacing.xs,
  },
  errorContainer: {
    backgroundColor: '#fee2e2',
    padding: spacing.sm,
    borderRadius: 8,
    marginBottom: spacing.sm,
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    minHeight: 60,
    maxHeight: 120,
  },
  hint: {
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
});

export default Composer;
