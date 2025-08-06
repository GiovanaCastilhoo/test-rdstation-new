import { render, screen } from '@testing-library/react';
import RecommendationList from '../RecommendationList';
import mockRecommendations from '../../../mocks/mockRecommendation';

describe('RecommendationList Component', () => {
  it('shows message when no recommendations are available', () => {
    render(<RecommendationList recommendations={[]} />);
    
    expect(screen.getByText(/nenhuma recomendação encontrada/i)).toBeInTheDocument();
  });

  it('renders recommendations list', () => {

    render(<RecommendationList recommendations={mockRecommendations} />);

    mockRecommendations.forEach((rec) => {
      expect(screen.getByText(new RegExp(rec.name, "i"))).toBeInTheDocument();
    });

    expect(screen.queryByText(/nenhuma recomendação encontrada/i)).toBeNull();
  });
});