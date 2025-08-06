import { useState } from 'react';
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
        <div className='mt-8'>
            <h1 className="text-2xl font-bold text-center mb-4">
              Sistema de Recomendação de Produtos
            </h1>
            <p className="text-center mb-2">
              Bem-vindo ao Recomendador de Produtos RD Station! Escolha suas preferências e funcionalidades para receber recomendações personalizadas.
            </p>
            <p className="text-center text-gray-600">
              Use o formulário abaixo para encontrar os produtos que melhor atendem às suas necessidades.
            </p>
        </div>

    <div className="flex flex-col justify-center items-center px-4 py-6">
      <div className="max-w-7xl w-full">
        <Form setRecommendations={setRecommendations} />
      </div>
  
      <div className="max-w-7xl w-full px-4 py-6">
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
