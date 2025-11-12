import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { ref, set, onValue, off } from 'firebase/database';
import { database } from '../config/firebase';

export interface Profile {
  displayName: string;
  role: 'instalador' | 'cliente' | 'pesquisador';
  region: string;
}

interface ProfileContextType {
  profile: Profile;
  updateProfile: (updates: Partial<Profile>) => Promise<void>;
  isLoading: boolean;
}

const defaultProfile: Profile = {
  displayName: '',
  role: 'cliente',
  region: '',
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>(defaultProfile);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(defaultProfile);
      setIsLoading(false);
      return;
    }

    // Reference to user's profile in Firebase
    const profileRef = ref(database, `users/${user.id}/profile`);

    // Listen to profile changes in real-time
    const unsubscribe = onValue(profileRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setProfile(data);
      } else {
        // Create default profile if it doesn't exist
        const initialProfile = {
          ...defaultProfile,
          displayName: user.email.split('@')[0], // Use email prefix as default name
        };
        set(profileRef, initialProfile).catch(err => {
          console.error('Error creating default profile:', err);
        });
        setProfile(initialProfile);
      }
      setIsLoading(false);
    }, (error) => {
      console.error('Error loading profile:', error);
      setIsLoading(false);
    });

    // Cleanup listener on unmount or user change
    return () => {
      off(profileRef);
    };
  }, [user]);

  const updateProfile = async (updates: Partial<Profile>) => {
    if (!user) {
      throw new Error('Usuário não autenticado');
    }

    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);

    try {
      const profileRef = ref(database, `users/${user.id}/profile`);
      await set(profileRef, newProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      // Revert local changes on error
      setProfile(profile);
      throw new Error('Erro ao salvar perfil. Tente novamente');
    }
  };

  return (
    <ProfileContext.Provider value={{ profile, updateProfile, isLoading }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

