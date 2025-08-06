import React from 'react';
import { RecommendationListProps,  } from '../../types/component.types';

const RecommendationList: React.FC<RecommendationListProps> = ({ recommendations }) => {
  return (
  <div>
    {recommendations.length === 0 ? (
    <p>Nenhuma recomendação encontrada.</p>
  ) : (
    <div className="grid grid-cols-2 gap-4 max-w-md">
      <div>
        <h2 className="text-lg font-bold mb-2">Nome:</h2>
        <ul>
          {recommendations.map((rec, i) => (
            <li key={i} className="mb-2">{rec.name}</li>
          ))}
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold mb-2">Categoria:</h2>
        <ul>
          {recommendations.map((rec, i) => (
            <li key={i} className="mb-2">{rec.category}</li>
          ))}
        </ul>
      </div>
    </div>
  )}
</div>
  );
};

export default RecommendationList;