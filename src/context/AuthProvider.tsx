import React, { createContext, useEffect, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from 'firebase/auth';
import { auth } from '../config/firebase';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  createUser: (props: BaseLoginType) => Promise<UserCredential>;
  loginUser: (props: BaseLoginType) => Promise<UserCredential>;
  logOutUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  createUser: async () => ({} as UserCredential),
  loginUser: async () => ({} as UserCredential),
  logOutUser: async () => {},
});

type BaseLoginType = {
  email: string;
  password: string;
};

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const createUser = async ({ email, password }: BaseLoginType) => {
    setIsLoading(true);
    return await createUserWithEmailAndPassword(auth, email, password);
  };

  const loginUser = async ({ email, password }: BaseLoginType) => {
    setIsLoading(true);
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const logOutUser = async () => {
    setIsLoading(true);
    return await signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const authValue = {
    user,
    isLoading,
    createUser,
    loginUser,
    logOutUser,
  };

  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
