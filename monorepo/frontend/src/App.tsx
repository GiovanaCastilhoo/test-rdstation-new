import React, { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import { Header } from './components/shared/Header';
import { Recommendation } from './types/component.types';
import RecommendationList from './components/RecommendationList/RecommendationList';
import Card from './components/shared/Card';

function App() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  
  return (
  <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
        <div className="flex flex-col justify-center items-center px-4 py-6 gap-8 ">
          <div className="max-w-7xl w-full">
            <Form setRecommendations={setRecommendations} />
          </div>
          
        <div className="max-w-xs w-full">
          <Card 
              title="Recomendações"  
              color="bg-primary" 
              size="small" 
              className="w-full"
              >
            <RecommendationList recommendations={recommendations} />
          </Card>
        </div>
      </div>
  </div>
  );
}

export default App;
