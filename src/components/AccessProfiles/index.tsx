import React from 'react';
import { accessProfilesState } from '../../states/accessProfilesState';
import { useRecoilState } from 'recoil';
import CustomSwitch from '../CustomSwitch';
import { camelCaseToUpperCaseSpaces } from '../../utils/helpers/text-helpers';

const AccessProfiles: React.FC = () => {
  const [accessProfiles, setAccessProfiles] = useRecoilState(accessProfilesState);

  const handleSwitchChange = (profileKey: keyof typeof accessProfiles) => (newValue: boolean) => {
    setAccessProfiles((prev) => ({
      ...prev,
      [profileKey]: newValue,
    }));
  };

  return (
    <div>
      <h1>Accessibility Profiles</h1>
      {Object.keys(accessProfiles).map((profileKey) => (
        <CustomSwitch
          key={profileKey}
          label={camelCaseToUpperCaseSpaces(profileKey) || ''}
          value={accessProfiles[profileKey as keyof typeof accessProfiles]}
          onChange={handleSwitchChange(profileKey as keyof typeof accessProfiles)}
        />
      ))}
    </div>
  );
};

export default AccessProfiles;
