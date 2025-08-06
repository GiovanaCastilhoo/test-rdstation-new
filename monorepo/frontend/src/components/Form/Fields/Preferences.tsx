import React, { useState } from 'react';
import Checkbox from '../../shared/Checkbox';
import { PreferencesProps } from '../../../types/product.types';


const Preferences: React.FC<PreferencesProps> = ({
  preferences,
  selectedPreferences = [],
  onPreferenceChange,
}) => {
  const [currentPreferences, setCurrentPreferences] = useState<string[]>(selectedPreferences);

  const handlePreferenceChange = (preference: string) => {
    const updatedPreferences = currentPreferences.includes(preference)
      ? currentPreferences.filter((pref) => pref !== preference)
      : [...currentPreferences, preference];

    setCurrentPreferences(updatedPreferences);
    onPreferenceChange(updatedPreferences);
  };

  return (
  <div className="max-w-sm rounded overflow-hidden">
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Preferências:</h2>
      <ul>
        {preferences.map((preference, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={preference}
              checked={currentPreferences.includes(preference)}
              onChange={() => handlePreferenceChange(preference)}
              className="text-blue-500"
            >
              {preference}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div> 
  </div>
  );
};

export default Preferences;


 