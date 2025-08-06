import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Form from "../Form";

import * as useProductsModule from "../../../hooks/useProducts";
import * as useRecommendationsModule from "../../../hooks/useRecommendations";
import mockProducts from "../../../mocks/mockProducts";

jest.mock("../../../hooks/useProducts", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    preferences: ["Preferência 1"],
    features: ["Funcionalidade 1"],
    products: mockProducts,
  })),
}));

jest.mock("../../../hooks/useRecommendations", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    recommendations: [],
    getRecommendations: jest.fn(() =>
      Promise.resolve([{ id: 1, name: "RD Station CRM" }])
    ),
    setRecommendations: jest.fn(),
  })),
}));


describe("Form Component", () => {
  let mockSetRecommendations: jest.Mock;
  let mockGetRecommendations: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSetRecommendations = jest.fn();
    mockGetRecommendations = jest.fn(() =>
      Promise.resolve([{ id: 1, name: "RD Station CRM" }])
    );

  
    jest.spyOn(useProductsModule, "default").mockReturnValue({
      preferences: ["Preferência 1"],
      features: ["Funcionalidade 1"],
      products: mockProducts,
    });

    jest.spyOn(useRecommendationsModule, "default").mockReturnValue({
      recommendations: [],
      getRecommendations: mockGetRecommendations,
      setRecommendations: jest.fn(),
    });
  });

  it("shows error messages when submitting empty form", async () => {
    render(<Form setRecommendations={mockSetRecommendations} />);

    fireEvent.click(
      screen.getByRole("button", { name: /obter recomendação/i })
    );

    expect(
      await screen.findByText(/por favor, selecione pelo menos uma preferência/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/por favor, selecione pelo menos uma funcionalidade/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/por favor, selecione um tipo de recomendação/i)
    ).toBeInTheDocument();
  });

  it("fills in the fields and submits the form successfully", async () => {
    render(<Form setRecommendations={mockSetRecommendations} />);

    const preferenceCheckbox = screen.getByLabelText(/preferência 1/i);
    fireEvent.click(preferenceCheckbox);

    const featureCheckbox = screen.getByLabelText(/funcionalidade 1/i);
    fireEvent.click(featureCheckbox);

    const recommendationRadio = screen.getByDisplayValue("SingleProduct");
    fireEvent.click(recommendationRadio);

    fireEvent.click(
      screen.getByRole("button", { name: /obter recomendação/i })
    );

    await waitFor(() => {
      expect(mockSetRecommendations).toHaveBeenCalledWith([
        { id: 1, name: "RD Station CRM" },
      ]);
    });

    expect(mockGetRecommendations).toHaveBeenCalledTimes(1);
  });
});
