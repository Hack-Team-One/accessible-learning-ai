import { atom } from 'recoil';

export type AccessProfilesType = {
  seizureSafeProfile: boolean;
  visionImpairedProfile: boolean;
  adhdFriendlyProfile: boolean;
  cognitiveDisabilityProfile: boolean;
  keyboardNavigationProfile: boolean;
  blindUsersProfile: boolean;
};

export const accessProfilesState = atom<AccessProfilesType>({
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
