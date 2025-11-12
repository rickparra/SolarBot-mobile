import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, Appbar, Chip, Divider, TextInput, Button, HelperText } from 'react-native-paper';
import { colors, spacing } from '../theme/theme';
import { useLLM } from '../contexts/LLMContext';

interface LLMPanelProps {
  visible: boolean;
  onClose: () => void;
}

const LLMPanel = ({ visible, onClose }: LLMPanelProps) => {
  const { config, updateApiKey, clearApiKey, hasApiKey } = useLLM();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (visible) {
      setApiKeyInput(config.apiKey);
      setError('');
      setSuccess('');
    }
  }, [visible, config.apiKey]);

  const handleSave = async () => {
    setError('');
    setSuccess('');
    setIsSaving(true);

    try {
      await updateApiKey(apiKeyInput);
      setSuccess('API Key salva com sucesso!');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao salvar API Key');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClear = async () => {
    setError('');
    setSuccess('');
    
    try {
      await clearApiKey();
      setApiKeyInput('');
      setSuccess('API Key removida com sucesso!');
      setTimeout(() => {
        setSuccess('');
      }, 3000);
    } catch (err: any) {
      setError(err.message || 'Erro ao remover API Key');
    }
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <Appbar.Header>
          <Appbar.Content title="Configuração LLM" />
          <Appbar.Action icon="close" onPress={onClose} />
        </Appbar.Header>

        <ScrollView style={styles.content}>
          <Text variant="bodyMedium" style={styles.description}>
            Configure a API Key do Gemini para usar IA real
          </Text>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text variant="titleMedium">Status</Text>
              <Chip mode="outlined" style={hasApiKey ? styles.chipConnected : styles.chipDisconnected}>
                {hasApiKey ? 'GEMINI' : 'MOCK'}
              </Chip>
            </View>
            <Text variant="bodySmall" style={styles.sectionText}>
              {hasApiKey 
                ? 'Sistema conectado ao Google Gemini. Suas mensagens serão processadas pela IA real.'
                : 'Sistema operando em modo simulado. Configure sua API Key para usar o Gemini.'
              }
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Configuração da API Key
            </Text>
            
            <TextInput
              label="Google Gemini API Key"
              value={apiKeyInput}
              onChangeText={setApiKeyInput}
              secureTextEntry={!showApiKey}
              style={styles.input}
              mode="outlined"
              placeholder="AIza..."
              right={
                <TextInput.Icon 
                  icon={showApiKey ? 'eye-off' : 'eye'} 
                  onPress={() => setShowApiKey(!showApiKey)}
                />
              }
            />
            
            {error ? (
              <HelperText type="error" visible={!!error}>
                {error}
              </HelperText>
            ) : null}
            
            {success ? (
              <HelperText type="info" visible={!!success} style={styles.successText}>
                {success}
              </HelperText>
            ) : null}

            <View style={styles.buttonRow}>
              <Button
                mode="contained"
                onPress={handleSave}
                loading={isSaving}
                disabled={isSaving || !apiKeyInput.trim()}
                style={styles.saveButton}
              >
                Salvar
              </Button>
              
              {hasApiKey && (
                <Button
                  mode="outlined"
                  onPress={handleClear}
                  disabled={isSaving}
                  style={styles.clearButton}
                >
                  Limpar
                </Button>
              )}
            </View>

            <Text variant="bodySmall" style={styles.helpText}>
              Obtenha sua API Key gratuita em: {'\n'}
              https://makersuite.google.com/app/apikey
            </Text>
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Informações do Modelo
            </Text>
            {[
              { label: 'Modelo', value: hasApiKey ? 'gemini-pro' : 'mock' },
              { label: 'Temperature', value: '0.3' },
              { label: 'Max tokens', value: '600' },
              { label: 'Provider', value: hasApiKey ? 'Google AI' : 'Local' },
            ].map((item, index) => (
              <View key={index} style={styles.infoRow}>
                <Text variant="bodySmall" style={styles.infoLabel}>
                  {item.label}:
                </Text>
                <Text variant="bodySmall" style={styles.infoValue}>
                  {item.value}
                </Text>
              </View>
            ))}
          </View>

          <Divider style={styles.divider} />

          <View style={styles.section}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Tópicos suportados
            </Text>
            {[
              'Dimensionamento de sistemas',
              'Inversores e strings',
              'Irradiância e perdas',
              'Manutenção (O&M)',
              'LCOE e custos',
              'Segurança elétrica',
            ].map((topic, index) => (
              <Text key={index} variant="bodySmall" style={styles.topic}>
                • {topic}
              </Text>
            ))}
          </View>
        </ScrollView>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: colors.background,
    margin: spacing.lg,
    maxHeight: '90%',
    borderRadius: 8,
  },
  content: {
    padding: spacing.lg,
  },
  description: {
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  sectionText: {
    color: colors.textSecondary,
    lineHeight: 20,
  },
  divider: {
    marginVertical: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xs,
  },
  infoLabel: {
    color: colors.textSecondary,
  },
  infoValue: {
    color: colors.text,
    fontWeight: '600',
  },
  topic: {
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  input: {
    marginBottom: spacing.sm,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  saveButton: {
    flex: 1,
  },
  clearButton: {
    flex: 1,
  },
  helpText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontStyle: 'italic',
  },
  successText: {
    color: colors.primary,
  },
  chipConnected: {
    backgroundColor: '#e8f5e9',
  },
  chipDisconnected: {
    backgroundColor: '#fff3e0',
  },
});

export default LLMPanel;
