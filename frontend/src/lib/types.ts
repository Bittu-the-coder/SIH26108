export type StandardStatus = "ACTIVE" | "REVISED" | "WITHDRAWN" | "UNDER_REVIEW";

export interface CrossReference {
  standard_id: string;
  standard_number: string;
  relation_type: "REFERENCED_BY" | "SUPERSEDES" | "SUPERSEDED_BY" | "COMPLEMENTARY";
  clause?: string;
}

export interface Standard {
  id: string;
  standard_number: string;
  title: string;
  title_hindi?: string;
  category: string;
  subcategory: string;
  publication_year: number;
  status: StandardStatus;
  abstract: string;
  abstract_hindi?: string;
  mandatory_status: boolean;
  keywords: string[];
  pdf_url?: string;
  cross_references?: CrossReference[];
  created_at: string;
  updated_at: string;
}

export interface MatchedClause {
  clause_number: string;
  clause_title: string;
  snippet: string;
}

export interface RecommendationItem {
  standard: Standard;
  confidence_score: number; // 0.0 to 1.0
  relevance_rank: number;
  explanation: string;
  explanation_hindi?: string;
  matched_clauses: MatchedClause[];
  compliance_actions: string[];
  is_mandatory: boolean;
}

export interface RecommendationResponse {
  query_id: string;
  query: string;
  language: "en" | "hi";
  detected_category: string;
  recommendations: RecommendationItem[];
  execution_time_ms: number;
  total_standards_evaluated: number;
}

export interface CategorySummary {
  id: string;
  code: string;
  name: string;
  name_hindi: string;
  description: string;
  standard_count: number;
  subcategories: string[];
  icon: string;
}

export interface FeedbackSubmission {
  query_id: string;
  standard_id: string;
  rating: number; // 1 (thumbs up) or -1 (thumbs down)
  comment?: string;
  suggested_standard_number?: string;
}

export interface QueryHistoryItem {
  id: string;
  query: string;
  timestamp: string;
  recommendation_count: number;
  top_standard: string;
  category: string;
}
