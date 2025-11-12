import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Appbar, Menu } from 'react-native-paper';
import { useAuth } from '../../contexts/AuthContext';
import ProfilePanel from '../ProfilePanel';

interface HeaderProps {
  onOpenLLMSettings?: () => void;
}

const Header = ({ onOpenLLMSettings }: HeaderProps) => {
  const { signOut } = useAuth();
  const [showProfile, setShowProfile] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleLogout = () => {
    setMenuVisible(false);
    signOut();
  };

  return (
    <>
      <Appbar.Header style={styles.header}>
        <Appbar.Content title="SkillUpPlus Solar" titleStyle={styles.title} />
        <Menu
          visible={menuVisible}
          onDismiss={() => setMenuVisible(false)}
          anchor={
            <Appbar.Action
              icon="menu"
              onPress={() => setMenuVisible(true)}
            />
          }
        >
          <Menu.Item
            leadingIcon="account"
            onPress={() => {
              setMenuVisible(false);
              setShowProfile(true);
            }}
            title="Perfil"
          />
          <Menu.Item
            leadingIcon="cog"
            onPress={() => {
              setMenuVisible(false);
              if (onOpenLLMSettings) {
                onOpenLLMSettings();
              }
            }}
            title="Configurações LLM"
          />
          <Menu.Item
            leadingIcon="logout"
            onPress={handleLogout}
            title="Sair"
          />
        </Menu>
      </Appbar.Header>

      <ProfilePanel visible={showProfile} onClose={() => setShowProfile(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
  },
  title: {
    fontWeight: '600',
  },
});

export default Header;
