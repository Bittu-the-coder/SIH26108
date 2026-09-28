import { create } from "zustand";
import { RecommendResponse, QueryHistoryItem } from "./types";
import { DEMO_RECOMMENDATION, DEMO_HISTORY } from "./mockData";
import { setAuthToken, getAuthToken } from "./api";

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
  token: string | null;
  loginUser: (token: string, customUser?: Partial<UserProfile>) => void;
  loginDemo: (customUser?: Partial<UserProfile>) => void;
  logout: () => void;

  // Demo mode
  isDemo: boolean;
  enableDemo: () => void;
  disableDemo: () => void;

  // Language
  language: "en" | "hi";
  setLanguage: (lang: "en" | "hi") => void;

  // Query & Execution
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  currentResult: RecommendResponse | null;
  setCurrentResult: (res: RecommendResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (err: string | null) => void;

  // Audit History (client-side)
  history: QueryHistoryItem[];
  addHistoryItem: (item: QueryHistoryItem) => void;
}

const DEFAULT_OFFICER: UserProfile = {
  name: "Er. Rajesh Kumar",
  email: "officer.cpwd@nic.in",
  department: "Central Public Works Department (CPWD)",
  designation: "Superintending Engineer",
};

function readLocalFlag(key: string): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(key) === "true";
}

export const useAppStore = create<AppState>((set) => ({
  // Auth
  isAuthenticated: readLocalFlag("bis_auth"),
  user:
    typeof window !== "undefined" && localStorage.getItem("bis_auth") === "true"
      ? DEFAULT_OFFICER
      : null,
  token: getAuthToken(),

  loginUser: (token, customUser) => {
    setAuthToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("bis_auth", "true");
      localStorage.removeItem("bis_demo");
    }
    set({
      isAuthenticated: true,
      token,
      user: { ...DEFAULT_OFFICER, ...customUser },
      isDemo: false,
    });
  },

  loginDemo: (customUser) => {
    if (typeof window !== "undefined") {
      localStorage.setItem("bis_auth", "true");
      localStorage.setItem("bis_demo", "true");
    }
    setAuthToken(null);
    set({
      isAuthenticated: true,
      token: null,
      user: { ...DEFAULT_OFFICER, ...customUser },
      isDemo: true,
      // Seed demo data
      currentResult: { ...DEMO_RECOMMENDATION, query_id: `demo-${Date.now()}` },
      history: [...DEMO_HISTORY],
    });
  },

  logout: () => {
    setAuthToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("bis_auth");
      localStorage.removeItem("bis_demo");
    }
    set({
      isAuthenticated: false,
      user: null,
      token: null,
      isDemo: false,
      currentResult: null,
      history: [],
    });
  },

  // Demo mode
  isDemo: readLocalFlag("bis_demo"),
  enableDemo: () => {
    if (typeof window !== "undefined") localStorage.setItem("bis_demo", "true");
    set({ isDemo: true });
  },
  disableDemo: () => {
    if (typeof window !== "undefined") localStorage.removeItem("bis_demo");
    set({ isDemo: false });
  },

  // Language
  language: "en",
  setLanguage: (lang) => set({ language: lang }),

  // Query
  searchQuery:
    "Supply and installation of Fe 500D TMT reinforcement steel bars and OPC 53 Grade cement for multi-storey residential RCC construction conforming to earthquake safety.",
  setSearchQuery: (q) => set({ searchQuery: q }),
  currentResult: readLocalFlag("bis_demo") ? DEMO_RECOMMENDATION : null,
  setCurrentResult: (res) => set({ currentResult: res }),
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  error: null,
  setError: (err) => set({ error: err }),

  // History
  history: readLocalFlag("bis_demo") ? DEMO_HISTORY : [],
  addHistoryItem: (item) =>
    set((state) => ({ history: [item, ...state.history] })),
}));
