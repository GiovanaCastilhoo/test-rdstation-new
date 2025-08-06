import React, { useState } from 'react';
import { Preferences, Features, RecommendationType } from './Fields';
import { SubmitButton } from './SubmitButton';
import { FormProps } from '../../types/component.types';
import { FormData } from '../../types/product.types';

import useProducts from '../../hooks/useProducts';
import useForm from '../../hooks/useForm';
import useRecommendations from '../../hooks/useRecommendations';
import Card from '../shared/Card';


const Form: React.FC<FormProps> = ({setRecommendations}) => {
  const { preferences, features, products } = useProducts();
  const { getRecommendations } = useRecommendations(products);
  const { formData, handleChange } = useForm<FormData>({
    selectedPreferences: [] as string[],
    selectedFeatures: [] as string[],
    selectedRecommendationType: undefined,
  });
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      console.log('Form Data:', formData);
      const recs = await getRecommendations(formData);
      console.log(recs)
      setRecommendations(recs);
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message)
        setError(err.message);        
      } else {
        setError("Erro desconhecido");
      }
      setRecommendations([]);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
    >
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
              onPreferenceChange={(selected) =>
              handleChange('selectedPreferences', selected)
            }
          />
          </Card>
          <Card 
            title="Selecione suas funcionalidades" 
            color="bg-primary" 
            headerTextColor="text-secondary"
            className="w-full"
          >
            <Features
              features={features}
              onFeatureChange={(selected) =>
              handleChange('selectedFeatures', selected)
              }
          />
          </Card>
          <div className="flex flex-col gap-6 w-full">
            <Card 
              title="Tipo de recomendação"  
              color="bg-primary" 
              size="small" 
              className="w-full max-w-xs"
              >
              <RecommendationType
                onRecommendationTypeChange={(selected) =>
                handleChange('selectedRecommendationType', selected)
            }
            />
              <SubmitButton text="Obter recomendação" />
            </Card>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;

