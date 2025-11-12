import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Text, TextInput, Button, Appbar, List } from 'react-native-paper';
import { useProfile } from '../contexts/ProfileContext';
import { colors, spacing } from '../theme/theme';

interface ProfilePanelProps {
  visible: boolean;
  onClose: () => void;
}

const ProfilePanel = ({ visible, onClose }: ProfilePanelProps) => {
  const { profile, updateProfile } = useProfile();
  const [displayName, setDisplayName] = useState(profile.displayName);
  const [role, setRole] = useState(profile.role);
  const [region, setRegion] = useState(profile.region);
  const [showRolePicker, setShowRolePicker] = useState(false);

  useEffect(() => {
    setDisplayName(profile.displayName);
    setRole(profile.role);
    setRegion(profile.region);
  }, [profile]);

  const handleSave = () => {
    updateProfile({ displayName, role, region });
    onClose();
  };

  const roles = [
    { label: 'Instalador', value: 'instalador' as const },
    { label: 'Cliente', value: 'cliente' as const },
    { label: 'Pesquisador', value: 'pesquisador' as const },
  ];

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modal}
      >
        <Appbar.Header>
          <Appbar.Content title="Perfil do Usuário" />
          <Appbar.Action icon="close" onPress={onClose} />
        </Appbar.Header>

        <ScrollView style={styles.content}>
          <Text variant="bodyMedium" style={styles.description}>
            Configure suas informações pessoais
          </Text>

          <TextInput
            label="Nome de exibição"
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.input}
            mode="outlined"
          />

          <Text variant="labelLarge" style={styles.label}>
            Função
          </Text>
          <List.Section>
            {roles.map((r) => (
              <List.Item
                key={r.value}
                title={r.label}
                onPress={() => setRole(r.value)}
                left={() => (
                  <List.Icon
                    icon={role === r.value ? 'radiobox-marked' : 'radiobox-blank'}
                    color={role === r.value ? colors.primary : colors.textSecondary}
                  />
                )}
              />
            ))}
          </List.Section>

          <TextInput
            label="Região"
            value={region}
            onChangeText={setRegion}
            placeholder="Ex: São Paulo, SP"
            style={styles.input}
            mode="outlined"
          />

          <View style={styles.buttons}>
            <Button
              mode="contained"
              onPress={handleSave}
              style={styles.button}
            >
              Salvar
            </Button>
            <Button
              mode="outlined"
              onPress={onClose}
              style={styles.button}
            >
              Fechar
            </Button>
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
  input: {
    marginBottom: spacing.md,
  },
  label: {
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  buttons: {
    marginTop: spacing.lg,
    gap: spacing.sm,
  },
  button: {
    marginBottom: spacing.sm,
  },
});

export default ProfilePanel;
