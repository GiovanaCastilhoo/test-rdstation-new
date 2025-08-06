import { useState } from 'react';
import recommendationService from '../services/recommendation.service';
import { Product, FormData } from '../types/product.types';
import { Recommendation } from '../types/component.types';


function useRecommendations(products: Product[]) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  const getRecommendations = async (formData: FormData): Promise<Product[]> => {
    return recommendationService.getRecommendations(formData, products);
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
