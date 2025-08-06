import { render, screen } from '@testing-library/react';
import RecommendationList from '../RecommendationList';

describe('RecommendationList Component', () => {
  it('mostra mensagem quando não há recomendações', () => {
    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByText(/nenhuma recomendação encontrada/i)).toBeInTheDocument();
  });

  it('renderiza lista de recomendações', () => {
    const mockRecommendations = [
      { id: 1, name: 'Produto 1' },
      { id: 2, name: 'Produto 2' },
      { id: 3, name: 'Produto 3' },
  ]  ;

    render(<RecommendationList recommendations={mockRecommendations} />);

    mockRecommendations.forEach((rec) => {
      expect(screen.getByText(rec.name)).toBeInTheDocument();
    });

    expect(screen.queryByText(/nenhuma recomendação encontrada/i)).toBeNull();
  });
});