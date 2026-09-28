// ─── Types aligned to backend OpenAPI schema (http://15.207.14.224/openapi.json) ───
// Demo/mock data also uses these types for offline-first fallback.

// ─── Status enums matching backend exactly ───
export type StandardStatus = "current" | "superseded" | "withdrawn" | "under_revision";

export type FeedbackType =
  | "thumbs_up"
  | "thumbs_down"
  | "wrong_standard"
  | "missing_standard"
  | "outdated_info";

// ─── Standards ───

export interface StandardBase {
  is_number: string;
  title: string;
  status: string;
  classification: string;
}

export interface StandardDetail extends StandardBase {
  id: string;
  title_hi: string | null;
  scope: string | null;
  sub_group: string | null;
  year_published: number | null;
  latest_amendment: string | null;
  certification: string;
  source_url: string | null;
  cross_references: Record<string, string[]>;
  categories: string[];
}

export interface PaginatedResponse<T> {
  total: number;
  page: number;
  per_page: number;
  results: T[];
}

// ─── Recommendations (POST /recommend) ───

export interface CertificationInfo {
  scheme: string | null;
  mandatory: boolean | null;
  details: string | null;
}

export interface AlliedStandard {
  is_number: string;
  title: string;
  relationship: string | null;
  reason: string | null;
}

export interface Recommendation {
  is_number: string;
  title: string;
  status: string | null;
  confidence: number | null;
  match_reason: string | null;
  source_url: string | null;
  certification: CertificationInfo | null;
  supersession: string | null;
  allied_standards: AlliedStandard[];
}

export interface WarningItem {
  type: string;
  message: string;
}

export interface MetadataInfo {
  retrieval_method: string;
  llm_model: string;
  total_latency_ms: number;
}

export interface RecommendRequest {
  query: string;
  category?: string | null;
  top_k?: number;
  include_allied?: boolean;
  language?: string | null;
}

export interface RecommendResponse {
  query_id: string;
  detected_language: string;
  recommendations: Recommendation[];
  warnings: WarningItem[];
  metadata: MetadataInfo | null;
}

// ─── Feedback (POST /feedback) ───

export interface FeedbackRequest {
  query_id: string;
  feedback: FeedbackType;
  correct_is?: string | null;
  comment?: string | null;
}

export interface FeedbackResponse {
  status: string;
}

// ─── Auth (POST /auth/login) ───

export interface LoginRequest {
  email: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

// ─── Categories (GET /categories) ───

export interface CategoryNode {
  id: string;
  name: string;
  name_hi: string | null;
  children?: CategoryNode[];
  standard_count?: number;
}

export interface CategoriesResponse {
  categories: CategoryNode[];
}

// ─── Client-side only (demo/history) ───

export interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  recommendation_count: number;
  top_standard: string;
  detected_language: string;
}

// ─── Demo-enriched recommendation (adds fields only mock data provides) ───
// Used exclusively by mockData.ts for offline demo mode.
export interface DemoRecommendation extends Recommendation {
  explanation_hindi?: string;
  matched_clauses?: { clause_number: string; clause_title: string; snippet: string }[];
  compliance_actions?: string[];
}

export interface DemoRecommendResponse extends Omit<RecommendResponse, "recommendations"> {
  recommendations: DemoRecommendation[];
  // Demo-only convenience fields
  detected_category?: string;
}

// ─── Demo category (richer than backend stub) ───
export interface DemoCategorySummary {
  id: string;
  code: string;
  name: string;
  name_hindi: string;
  description: string;
  standard_count: number;
  subcategories: string[];
  icon: string;
}
