import React from 'react';
import Checkbox from '../../shared/Checkbox';

interface RecommendationTypeProps {
  selectedRecommendationType?: 'SingleProduct' | 'MultipleProducts';
  onRecommendationTypeChange: (type: 'SingleProduct' | 'MultipleProducts') => void;
  error?: boolean;
}

const RecommendationType: React.FC<RecommendationTypeProps> = ({
  selectedRecommendationType,
  onRecommendationTypeChange,
  error,
}) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <Checkbox
          type="radio"
          name="recommendationType"
          value="SingleProduct"
          checked={selectedRecommendationType === 'SingleProduct'}
          onChange={() => onRecommendationTypeChange('SingleProduct')}
          className={`mr-2 ${error ? 'border-red-500' : ''}`}
        />
        <label htmlFor="SingleProduct" className="mr-4 cursor-pointer">
          Produto Único
        </label>

        <Checkbox
          type="radio"
          name="recommendationType"
          value="MultipleProducts"
          checked={selectedRecommendationType === 'MultipleProducts'}
          onChange={() => onRecommendationTypeChange('MultipleProducts')}
          className={`mr-2 ${error ? 'border-red-500' : ''}`}
        />
        <label htmlFor="MultipleProducts" className="cursor-pointer">
          Múltiplos Produtos
        </label>
      </div>
      {error}
    </div>
  );
};

export default RecommendationType;

