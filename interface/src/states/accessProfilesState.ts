import { atom } from 'recoil';

export const defaultAccessProfilesState = {
  seizureSafeProfile: false,
  visionImpairedProfile: false,
  adhdFriendlyProfile: false,
  cognitiveDisabilityProfile: false,
  keyboardNavigationProfile: false,
  blindUsersProfile: false,
};
export type AccessProfilesStateType = typeof defaultAccessProfilesState;

export const accessProfilesState = atom<AccessProfilesStateType>({
  key: 'accessProfilesState',
  default: {...defaultAccessProfilesState},
});
