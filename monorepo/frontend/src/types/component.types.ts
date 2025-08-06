import { InputHTMLAttributes, ReactNode } from "react";
import { Product } from "./product.types";

export interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: ReactNode;
}

export interface FormProps {
  className?: string;
  setRecommendations: (recommendations: Product[]) => void; // se souber o tipo de recommendation, pode substituir 'any'
}

export interface Recommendation {
  id: number;
  name: string; 
  category?: string; 
}

export interface RecommendationListProps {
  recommendations: Recommendation[];
}