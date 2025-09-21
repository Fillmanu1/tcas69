import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Portfolio = {
  id: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  school: string;
  gpa: number;
  specialSkills: string;
  reason: string;
  major: string;
  university: string;
  photo?: string; // base64 or URL
  activities?: string[];
  awards?: string[];
  works?: string[];
};

type PortfolioStore = {
  portfolios: Portfolio[];
  addPortfolio: (p: Portfolio) => void;
  getPortfolio: (id: string) => Portfolio | undefined;
  removePortfolio: (id: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set, get) => ({
      portfolios: [],
      addPortfolio: (p) =>
        set((state) => ({
          portfolios: [...state.portfolios, p],
        })),
      getPortfolio: (id) => get().portfolios.find((p) => p.id === id),
      removePortfolio: (id) =>
        set((state) => ({
          portfolios: state.portfolios.filter((p) => p.id !== id),
        })),
    }),
    { name: 'portfolio-storage' }
  )
);

