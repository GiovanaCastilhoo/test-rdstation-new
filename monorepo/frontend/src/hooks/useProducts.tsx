import { useEffect, useState } from 'react';
import getProducts from '../services/product.service';
import { Product } from '../types/product.types';


const useProducts = () => {
  const [preferences, setPreferences] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products: Product[] = await getProducts();
        const allPreferences: string[] = [];
        const allFeatures: string[] = [];

        setProducts(products);

        products.forEach((product) => {
          const productPreferences = product.preferences
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allPreferences.push(...productPreferences);

          const productFeatures = product.features
            .sort(() => Math.random() - 0.5)
            .slice(0, 2);
          allFeatures.push(...productFeatures);
        });

        setPreferences(allPreferences);
        setFeatures(allFeatures);
      } catch (error) {
        console.error('Erro ao obter os produtos:', error);
      }
    };

    fetchData();
  }, []);

  return { preferences, features, products };
};

export default useProducts;
