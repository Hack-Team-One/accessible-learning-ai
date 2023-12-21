import { atom } from 'recoil';

export const defaultAuthState = { user: null, isAuthenticated: false };
export type AuthState = typeof defaultAuthState;

export const authState = atom<AuthState>({
  key: 'authState',
  default: {...defaultAuthState},
});

