// /states/authState.ts
import { atom } from 'recoil';

// NOTE: We may not use this auth state, it is currently just an example

export const isLoggedInState = atom({
  key: 'isLoggedInState',
  default: false,
});
