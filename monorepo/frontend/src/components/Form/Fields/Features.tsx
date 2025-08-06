import React from 'react';
import Checkbox from '../../shared/Checkbox';
import { FeaturesProps } from '../../../types/product.types';

const Features: React.FC<FeaturesProps> = ({
  features,
  selectedFeatures = [],
  onFeatureChange,
  error = false
}) => {
  const handleFeatureChange = (feature: string) => {
    const updatedFeatures = selectedFeatures.includes(feature)
      ? selectedFeatures.filter((feat) => feat !== feature)
      : [...selectedFeatures, feature];

    onFeatureChange(updatedFeatures);
  };
  return (
    <div className="mb-4">
      <h2 className="text-lg font-bold mb-2">Funcionalidades:</h2>
      <ul>
        {features.map((feature, index) => (
          <li key={index} className="mb-2">
            <Checkbox
              value={feature}
              checked={selectedFeatures.includes(feature)}
              onChange={() => handleFeatureChange(feature)}
              error={error}
            >
              {feature}
            </Checkbox>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Features;