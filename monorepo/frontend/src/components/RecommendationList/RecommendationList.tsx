import React from 'react';
import { RecommendationListProps,  } from '../../types/component.types';

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  return (
    <div>
      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}
      <ul>
        {recommendations.map((recommendation, index) => (
          <li key={index} className="mb-2">
            {recommendation.name}
          </li>
        ))} 
      </ul>
    </div>
  );
};

export default RecommendationList;