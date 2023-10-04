import React from 'react';
import { accessProfilesState, AccessProfilesStateType } from '../../states/accessProfilesState';
import { useRecoilState } from 'recoil';
import CustomSwitch from '../CustomSwitch';
import { camelCaseToUpperCaseSpaces } from '../../utils/helpers/text-helpers';
import { AccessProfileNames } from '../../utils/enums';

const AccessProfiles: React.FC = () => {
  const [accessProfiles, setAccessProfiles] = useRecoilState<AccessProfilesStateType>(accessProfilesState);

  const handleSwitchChange = (accessProfileKey: keyof typeof accessProfiles) => {
    const updatedAccessProfile: Partial<AccessProfilesStateType> = { [accessProfileKey]: !accessProfiles[accessProfileKey] };
    setAccessProfiles(prev => ({ ...prev, ...updatedAccessProfile }));
  };

  return (
    <div className="grid-cols-2">
      {/* <h1>Accessibility Profiles</h1> */}
      <CustomSwitch
        key={AccessProfileNames.SeizureSafeProfile}
        label={camelCaseToUpperCaseSpaces(AccessProfileNames.SeizureSafeProfile) || ''}
        value={accessProfiles.seizureSafeProfile}
        onChange={() => handleSwitchChange(AccessProfileNames.SeizureSafeProfile)}
      />
      <CustomSwitch
        key={AccessProfileNames.VisionImpairedProfile}
        label={camelCaseToUpperCaseSpaces(AccessProfileNames.VisionImpairedProfile) || ''}
        value={accessProfiles.visionImpairedProfile}
        onChange={() => handleSwitchChange(AccessProfileNames.VisionImpairedProfile)}
      />
      <CustomSwitch
        key={AccessProfileNames.AdhdFriendlyProfile}
        label={camelCaseToUpperCaseSpaces(AccessProfileNames.AdhdFriendlyProfile) || ''}
        value={accessProfiles.adhdFriendlyProfile}
        onChange={() => handleSwitchChange(AccessProfileNames.AdhdFriendlyProfile)}
      />
      <CustomSwitch
        key={AccessProfileNames.CognitiveDisabilityProfile}
        label={camelCaseToUpperCaseSpaces(AccessProfileNames.CognitiveDisabilityProfile) || ''}
        value={accessProfiles.cognitiveDisabilityProfile}
        onChange={() => handleSwitchChange(AccessProfileNames.CognitiveDisabilityProfile)}
      />
      <CustomSwitch
        key={AccessProfileNames.KeyboardNavigationProfile}
        label={camelCaseToUpperCaseSpaces(AccessProfileNames.KeyboardNavigationProfile) || ''}
        value={accessProfiles.keyboardNavigationProfile}
        onChange={() => handleSwitchChange(AccessProfileNames.KeyboardNavigationProfile)}
      />
      <CustomSwitch
        key={AccessProfileNames.BlindUsersProfile}
        label={camelCaseToUpperCaseSpaces(AccessProfileNames.BlindUsersProfile) || ''}
        value={accessProfiles.blindUsersProfile}
        onChange={() => handleSwitchChange(AccessProfileNames.BlindUsersProfile)}
      />
    </div>
  );
};

export default AccessProfiles;
