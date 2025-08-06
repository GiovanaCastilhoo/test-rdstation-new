
export interface Product {
  id: number;
  name: string;
  category: string;
  preferences: string[];
  features: string[];
}

export type ScoredProduct = {
  product: Product;
  score: number;
};

export type RecommendationType = "SingleProduct" | "MultipleProducts" ;

export interface FormData {
  selectedPreferences: string[];
  selectedFeatures: string[];
  selectedRecommendationType?: RecommendationType;
};

export interface FeaturesProps {
  features: string[];
  selectedFeatures?: string[];
  onFeatureChange: (features: string[]) => void;
  error?: boolean;
}


export interface PreferencesProps {
  preferences: string[];
  selectedPreferences?: string[];
  onPreferenceChange: (updatedPreferences: string[]) => void;
  error?: boolean;
}

