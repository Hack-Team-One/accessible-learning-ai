import { atom } from 'recoil';

export const accessProfilesState = atom({
  key: 'accessProfilesState',
  default: {
    seizureSafeProfile: false,
    visionImpairedProfile: false,
    adhdFriendlyProfile: false,
    cognitiveDisabilityProfile: false,
    keyboardNavigationProfile: false,
    blindUsersProfile: false,
  },
});
