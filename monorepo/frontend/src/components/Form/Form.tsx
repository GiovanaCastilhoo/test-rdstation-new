import React, { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { FormProps } from '../../types/component.types';
import { FormData } from '../../types/product.types';

import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import Card from '../shared/Card';

const Form: React.FC<FormProps> = ({ setRecommendations }) => {
  const { preferences, features, products } = useProducts();
  const { getRecommendations } = useRecommendations(products);
  const { formData, handleChange } = useForm<FormData>({
    selectedPreferences: [],
    selectedFeatures: [],
    selectedRecommendationType: undefined,
  });

  const [errors, setErrors] = useState({
    preferences: '',
    features: '',
    recommendationType: '',
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const newErrors = {
      preferences: '',
      features: '',
      recommendationType: '',
    };

    if (formData.selectedPreferences.length === 0) {
      newErrors.preferences = 'Por favor, selecione pelo menos uma preferência.';
    }
    if (formData.selectedFeatures.length === 0) {
      newErrors.features = 'Por favor, selecione pelo menos uma funcionalidade.';
    }
    if (!formData.selectedRecommendationType) {
      newErrors.recommendationType = 'Por favor, selecione um tipo de recomendação.';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((msg) => msg !== '')) {
      return;
    }

    try {
      const result = await getRecommendations(formData);
      setRecommendations(result);
    } catch (err: any) {
      alert(err.message || 'Erro inesperado');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-1 justify-center items-start px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl">
          <Card
            title="Selecione suas preferências"
            color="bg-primary"
            headerTextColor="text-secondary"
            className="w-full"
          >
            <Preferences
              preferences={preferences}
              selectedPreferences={formData.selectedPreferences}
              onPreferenceChange={(prefs) => {
                handleChange('selectedPreferences', prefs);
                if (errors.preferences) setErrors((prev) => ({ ...prev, preferences: '' }));
              }}
              error={!!errors.preferences}
            />
            {errors.preferences && <p className="text-red-500 mt-2">{errors.preferences}</p>}
          </Card>

          <Card
            title="Selecione suas funcionalidades"
            color="bg-primary"
            headerTextColor="text-secondary"
            className="w-full"
          >
            <Features
              features={features}
              selectedFeatures={formData.selectedFeatures}
              onFeatureChange={(feats) => {
                handleChange('selectedFeatures', feats);
                if (errors.features) setErrors((prev) => ({ ...prev, features: '' }));
              }}
              error={!!errors.features}
            />
            {errors.features && <p className="text-red-500 mt-2">{errors.features}</p>}
          </Card>

          <div className="flex flex-col gap-6 w-full">
            <Card
              title="Tipo de recomendação"
              color="bg-primary"
              size="small"
              className="w-full max-w-xs"
            >
              <RecommendationType
                selectedRecommendationType={formData.selectedRecommendationType}
                onRecommendationTypeChange={(selected) => {
                  handleChange('selectedRecommendationType', selected);
                  if (errors.recommendationType) setErrors((prev) => ({ ...prev, recommendationType: '' }));
                }}
                error={!!errors.recommendationType}
              />
              {errors.recommendationType && (
                <p className="text-red-500 m-2">{errors.recommendationType}</p>
              )}
              <SubmitButton text="Obter recomendação" />
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
