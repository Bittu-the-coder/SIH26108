import { create } from "zustand";
import { RecommendationResponse, QueryHistoryItem } from "./types";
import { MOCK_RECOMMENDATION_SAMPLE, MOCK_HISTORY } from "./mockData";

export interface UserProfile {
  name: string;
  email: string;
  department: string;
  designation: string;
}

interface AppState {
  // Authentication
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (customUser?: Partial<UserProfile>) => void;
  logout: () => void;

  // Language & Filters
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;
  activeCategory: string | null;
  setActiveCategory: (cat: string | null) => void;

  // Query & Execution
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentResult: RecommendationResponse | null;
  setCurrentResult: (res: RecommendationResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;

  // Audit History
  history: QueryHistoryItem[];
  addHistoryItem: (item: QueryHistoryItem) => void;
}

const DEFAULT_OFFICER: UserProfile = {
  name: "Er. Rajesh Kumar",
  email: "officer.cpwd@nic.in",
  department: "Central Public Works Department (CPWD)",
  designation: "Superintending Engineer",
};

export const useAppStore = create<AppState>((set) => ({
  // Authentication defaults to false (login required for portal)
  isAuthenticated: typeof window !== "undefined" ? localStorage.getItem("bis_auth") === "true" : false,
  user: typeof window !== "undefined" && localStorage.getItem("bis_auth") === "true" ? DEFAULT_OFFICER : null,

  login: (customUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bis_auth", "true");
    }
    set({
      isAuthenticated: true,
      user: { ...DEFAULT_OFFICER, ...customUser },
    });
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("bis_auth");
    }
    set({
      isAuthenticated: false,
      user: null,
    });
  },

  language: "en",
  setLanguage: (lang) => set({ language: lang }),
  activeCategory: null,
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  searchQuery: "Supply and installation of Fe 500D TMT reinforcement steel bars and OPC 53 Grade cement for multi-storey residential RCC construction conforming to earthquake safety.",
  setSearchQuery: (q) => set({ searchQuery: q }),
  currentResult: MOCK_RECOMMENDATION_SAMPLE,
  setCurrentResult: (res) => set({ currentResult: res }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  history: MOCK_HISTORY,
  addHistoryItem: (item) => set((state) => ({ history: [item, ...state.history] })),
}));
