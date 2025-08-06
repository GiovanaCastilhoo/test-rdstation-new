// recommendation.service.ts
import type { Product, ScoredProduct, FormData } from '../types/product.types';

const calculateScoredProducts = (
  selectedPrefSet: Set<string>,
  selectedFeatSet: Set<string>,
  products: Product[]
): ScoredProduct[] => {
  return products
    .map((product) => {
      const { preferences = [], features = [] } = product;
      const prefCount = preferences.filter(pref => selectedPrefSet.has(pref)).length;
      const featCount = features.filter(feat => selectedFeatSet.has(feat)).length;
      const score = prefCount + featCount;
      return { product, score };
    })
    .filter(({ score }) => score > 0);
};

const filterTopScoringProducts = (scoredProducts: ScoredProduct[]): ScoredProduct[] => {
  if (scoredProducts.length === 0) return [];
  const maxScore = scoredProducts.reduce(
    (max, p) => (p.score > max ? p.score : max),
    -Infinity
  );
  return scoredProducts.filter(p => p.score === maxScore);
};

const getRecommendations = (
  formData: FormData = { selectedPreferences: [], selectedFeatures: [] },
  products: Product[]
): Product[] => {
  const { selectedPreferences = [], selectedFeatures = [], selectedRecommendationType } = formData;
  const noPreferences = !selectedPreferences.length;
  const noFeatures = !selectedFeatures.length;

  if (noPreferences && noFeatures) {
    console.error("Nenhuma preferência ou funcionalidade selecionada.");
    throw new Error('Por favor, preencha as preferências e as funcionalidades!');
  }

  if (!selectedRecommendationType) {
    throw new Error("Selecione se deseja recomendar um produto ou vários produtos.");
  }

  const selectedPrefSet = new Set(selectedPreferences);
  const selectedFeatSet = new Set(selectedFeatures);
  const scoredProducts = calculateScoredProducts(selectedPrefSet, selectedFeatSet, products);

  if (scoredProducts.length === 0) {
    return [];
  }
  
  switch (selectedRecommendationType) {
    case "SingleProduct": {
      const topProducts = filterTopScoringProducts(scoredProducts);
      const result = topProducts.length
      ? [topProducts[topProducts.length - 1].product] 
      : [];
      return result;
    }
    case "MultipleProducts": {
      const sorted = [...scoredProducts].sort((a, b) => b.score - a.score);
      const result = sorted.map(p => p.product);
      return result;
    }
  }
};

const recommendationService = { getRecommendations };
export default recommendationService;
