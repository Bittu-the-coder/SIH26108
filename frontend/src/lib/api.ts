import {
  RecommendResponse,
  RecommendRequest,
  StandardBase,
  StandardDetail,
  PaginatedResponse,
  FeedbackRequest,
  FeedbackResponse,
  LoginRequest,
  TokenResponse,
  CategoriesResponse,
} from "./types";
import { DEMO_RECOMMENDATION, DEMO_STANDARDS, DEMO_CATEGORIES } from "./mockData";

const CONFIGURED_API_URL = process.env.NEXT_PUBLIC_API_URL || "/api/v1";

export function getBaseUrl(): string {
  // If running in browser on HTTPS (e.g. Vercel) and URL is HTTP, use relative /api/v1 proxy to avoid mixed content block
  if (typeof window !== "undefined" && window.location.protocol === "https:" && CONFIGURED_API_URL.startsWith("http://")) {
    return "/api/v1";
  }
  return CONFIGURED_API_URL;
}

// ─── Auth token management ───

let authToken: string | null =
  typeof window !== "undefined" ? localStorage.getItem("bis_token") : null;

export function setAuthToken(token: string | null) {
  authToken = token;
  if (typeof window !== "undefined") {
    if (token) localStorage.setItem("bis_token", token);
    else localStorage.removeItem("bis_token");
  }
}

export function getAuthToken(): string | null {
  return authToken;
}

function authHeaders(): Record<string, string> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authToken) headers["Authorization"] = `Bearer ${authToken}`;
  return headers;
}

// ─── Demo mode detection ───
// Demo mode = no backend, use mock data. Checked per-call.

export function isDemoMode(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("bis_demo") === "true";
}

// ─── Recommendations ───

export async function getRecommendations(
  request: RecommendRequest
): Promise<RecommendResponse> {
  if (isDemoMode()) {
    await new Promise((r) => setTimeout(r, 800));
    return { ...DEMO_RECOMMENDATION, query_id: `demo-${Date.now()}` };
  }

  const res = await fetch(`${getBaseUrl()}/recommend`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(30000),
  });
  if (!res.ok) {
    const errorBody = await res.text().catch(() => "");
    throw new Error(`Recommendation failed (${res.status}): ${errorBody}`);
  }
  return await res.json();
}

// ─── Standards ───

export async function searchStandards(params: {
  q?: string;
  category?: string;
  status?: string;
  certification?: string;
  page?: number;
  per_page?: number;
}): Promise<PaginatedResponse<StandardBase>> {
  if (isDemoMode()) {
    let filtered = [...DEMO_STANDARDS];
    if (params.q) {
      const q = params.q.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.is_number.toLowerCase().includes(q) ||
          s.title.toLowerCase().includes(q) ||
          (s.scope && s.scope.toLowerCase().includes(q))
      );
    }
    if (params.category) {
      filtered = filtered.filter((s) =>
        s.classification.toLowerCase().includes(params.category!.toLowerCase())
      );
    }
    if (params.status) {
      filtered = filtered.filter((s) => s.status === params.status);
    }
    return {
      total: filtered.length,
      page: params.page || 1,
      per_page: params.per_page || 20,
      results: filtered.map((s) => ({
        is_number: s.is_number,
        title: s.title,
        status: s.status,
        classification: s.classification,
      })),
    };
  }

  const urlParams = new URLSearchParams();
  if (params.q) urlParams.append("q", params.q);
  if (params.category) urlParams.append("category", params.category);
  if (params.status) urlParams.append("status", params.status);
  if (params.certification) urlParams.append("certification", params.certification);
  if (params.page) urlParams.append("page", String(params.page));
  if (params.per_page) urlParams.append("per_page", String(params.per_page));

  const res = await fetch(`${getBaseUrl()}/standards?${urlParams.toString()}`, {
    headers: authHeaders(),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    throw new Error(`Standards search failed (${res.status})`);
  }
  return await res.json();
}

export async function getStandardByIsNumber(isNumber: string): Promise<StandardDetail> {
  if (isDemoMode()) {
    const found = DEMO_STANDARDS.find(
      (s) => s.is_number === isNumber || s.is_number.toLowerCase().replace(/[:\s]/g, "-") === isNumber.toLowerCase()
    );
    if (!found) throw new Error("Standard not found in demo data");
    return found;
  }

  const res = await fetch(`${getBaseUrl()}/standards/${encodeURIComponent(isNumber)}`, {
    headers: authHeaders(),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    if (res.status === 404) throw new Error("Standard not found");
    throw new Error(`Failed to load standard (${res.status})`);
  }
  return await res.json();
}

// ─── Categories ───

export async function getCategories(): Promise<CategoriesResponse> {
  if (isDemoMode()) {
    return {
      categories: DEMO_CATEGORIES.map((c) => ({
        id: c.id,
        name: c.name,
        name_hi: c.name_hindi,
        standard_count: c.standard_count,
      })),
    };
  }

  const res = await fetch(`${getBaseUrl()}/categories`, {
    headers: authHeaders(),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    throw new Error(`Categories fetch failed (${res.status})`);
  }
  return await res.json();
}

// ─── Feedback ───

export async function submitFeedback(feedback: FeedbackRequest): Promise<FeedbackResponse> {
  if (isDemoMode()) {
    return { status: "ok" };
  }

  const res = await fetch(`${getBaseUrl()}/feedback`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(feedback),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    throw new Error(`Feedback submission failed (${res.status})`);
  }
  return await res.json();
}

// ─── Auth ───

export async function login(request: LoginRequest): Promise<TokenResponse> {
  if (isDemoMode()) {
    return { access_token: "demo-token-not-real", token_type: "bearer", expires_in: 3600 };
  }

  const res = await fetch(`${getBaseUrl()}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request),
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error("Incorrect email or password");
    if (res.status === 403) throw new Error("Account is inactive");
    throw new Error(`Login failed (${res.status})`);
  }
  return await res.json();
}

// ─── Eval (Admin) ───

export async function runEvaluation(): Promise<Record<string, unknown>> {
  if (isDemoMode()) {
    return {
      precision_at_5: 0.82,
      recall_at_5: 0.76,
      mrr: 0.88,
      total_queries: 20,
      results: [],
    };
  }

  const res = await fetch(`${getBaseUrl()}/eval/run`, {
    method: "POST",
    headers: authHeaders(),
    signal: AbortSignal.timeout(60000),
  });
  if (!res.ok) {
    throw new Error(`Evaluation failed (${res.status})`);
  }
  return await res.json();
}

// ─── Health Check ───

export async function checkHealth(): Promise<boolean> {
  try {
    const base = getBaseUrl();
    const healthUrl = base.startsWith("http")
      ? `${base.replace("/api/v1", "")}/health`
      : "/health";
    const res = await fetch(healthUrl, {
      signal: AbortSignal.timeout(5000),
    });
    return res.ok;
  } catch {
    return false;
  }
}
