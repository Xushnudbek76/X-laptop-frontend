import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ChosenLaptop from "../app/screens/itemsPage/ChosenLaptop";
import { LaptopStatus } from "../lib/enums/item.enum";

const { mockGetItem } = vi.hoisted(() => ({
  mockGetItem: vi.fn(),
}));

vi.mock("../app/services/ProductService", () => ({
  default: vi.fn().mockImplementation(() => ({
    getItem: mockGetItem,
  })),
}));

vi.mock("../lib/config", () => ({
  serverApi: "http://localhost:3003",
  resolveAssetUrl: (path?: string) => (path ? `http://localhost:3003/${path}` : ""),
}));

const mockItem = {
  _id: "test123",
  laptopName: "MacBook Pro M3",
  laptopBrand: "Apple",
  laptopPrice: 2499,
  laptopCpu: "Apple M3 Pro",
  laptopRam: "18GB",
  laptopStorage: "512GB SSD",
  laptopDisplaySize: 14.2,
  laptopGpu: "Apple M3 Pro GPU",
  laptopCategory: "Professional",
  laptopCondition: "New",
  laptopStatus: LaptopStatus.PROCESS,
  laptopLeftCount: 5,
  laptopViews: 230,
  laptopImages: ["uploads/test.jpg"],
  laptopDesc: "A powerful laptop for professionals.",
};

const renderWithRouter = () =>
  render(
    <MemoryRouter initialEntries={["/items/test123"]}>
      <Routes>
        <Route path="/items/:laptopId" element={<ChosenLaptop handleAddToCart={vi.fn()} />} />
      </Routes>
    </MemoryRouter>
  );

describe("ChosenLaptop", () => {
  beforeEach(() => mockGetItem.mockReset());

  it("shows loading spinner on initial load", async () => {
    mockGetItem.mockResolvedValue(mockItem); // resolves normally
    renderWithRouter();
    // spinner shows BEFORE the promise resolves — check it immediately
    const spinner = document.querySelector(".MuiCircularProgress-root");
    expect(spinner).toBeInTheDocument();
    // wait for it to finish so cleanup is clean
    await waitFor(() => {
      expect(screen.getByText("MacBook Pro M3")).toBeInTheDocument();
    });
  });

  it("shows product not found when item is null", async () => {
    mockGetItem.mockResolvedValue(null);
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getByText("Product not found.")).toBeInTheDocument();
    });
  });

  it("renders product name and price correctly", async () => {
    mockGetItem.mockResolvedValue(mockItem);
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getByText("MacBook Pro M3")).toBeInTheDocument();
      expect(screen.getByText("$2,499")).toBeInTheDocument();
    });
  });

  it("shows In Stock when laptop is available", async () => {
    mockGetItem.mockResolvedValue(mockItem);
    renderWithRouter();
    await waitFor(() => {
      expect(screen.getByText("In Stock")).toBeInTheDocument();
    });
  });
});
