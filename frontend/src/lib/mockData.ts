import {
  DemoRecommendation,
  DemoRecommendResponse,
  DemoCategorySummary,
  StandardDetail,
  QueryHistoryItem,
} from "./types";

// ─── Demo Standards (matches backend StandardDetail shape) ───

export const DEMO_STANDARDS: StandardDetail[] = [
  {
    id: "demo-std-1",
    is_number: "IS 456:2000",
    title: "Plain and Reinforced Concrete - Code of Practice",
    title_hi: "सादा और प्रबलित कंक्रीट - आचार संहिता (चौथा पुनरीक्षण)",
    classification: "Civil Engineering & Construction",
    sub_group: "Cement & Concrete",
    year_published: 2000,
    status: "current",
    certification: "isi_mark",
    scope: "Deals with the general structural use of plain and reinforced concrete. Covers design philosophy, material specifications, minimum cement content, exposure classes, shear, and detailing.",
    latest_amendment: null,
    source_url: null,
    cross_references: {
      normative_refs: ["IS 1786:2008", "IS 269:2015"],
    },
    categories: ["Civil Engineering & Construction"],
  },
  {
    id: "demo-std-2",
    is_number: "IS 1786:2008",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement",
    title_hi: "कंक्रीट सुदृढीकरण के लिए उच्च शक्ति विकृत स्टील की छड़ें और तार",
    classification: "Civil Engineering & Construction",
    sub_group: "Structural Steel",
    year_published: 2008,
    status: "current",
    certification: "isi_mark",
    scope: "Covers requirements of deformed steel bars and wires for use as reinforcement in concrete in grades Fe 415, Fe 415D, Fe 500, Fe 500D, Fe 550, Fe 550D, and Fe 600.",
    latest_amendment: null,
    source_url: null,
    cross_references: {
      referenced_by: ["IS 456:2000"],
    },
    categories: ["Civil Engineering & Construction"],
  },
  {
    id: "demo-std-3",
    is_number: "IS 269:2015",
    title: "Ordinary Portland Cement - Specification (Sixth Revision)",
    title_hi: "साधारण पोर्टलैंड सीमेंट - विनिर्देश (छठा पुनरीक्षण)",
    classification: "Civil Engineering & Construction",
    sub_group: "Cement & Concrete",
    year_published: 2015,
    status: "current",
    certification: "isi_mark",
    scope: "Specifies requirements for manufacture and chemical/physical requirements of 33 grade, 43 grade, and 53 grade ordinary Portland cement.",
    latest_amendment: null,
    source_url: null,
    cross_references: {},
    categories: ["Civil Engineering & Construction"],
  },
  {
    id: "demo-std-4",
    is_number: "IS 694:2010",
    title: "Polyvinyl Chloride (PVC) Insulated Cables for Working Voltages up to and including 1100 V",
    title_hi: "1100 वोल्ट तक के कार्यशील वोल्टेज के लिए पीवीसी इंसुलेटेड केबल",
    classification: "Electrotechnical & Electrical Fittings",
    sub_group: "Cables & Conductors",
    year_published: 2010,
    status: "current",
    certification: "isi_mark",
    scope: "Covers single-core and multi-core cables with copper or aluminium conductors for electric power and lighting in domestic, commercial and industrial installations.",
    latest_amendment: null,
    source_url: null,
    cross_references: {
      normative_refs: ["IS 732:2019"],
    },
    categories: ["Electrotechnical & Electrical Fittings"],
  },
  {
    id: "demo-std-5",
    is_number: "IS 732:2019",
    title: "Code of Practice for Electrical Wiring Installations",
    title_hi: "विद्युत वायरिंग प्रतिष्ठानों के लिए आचार संहिता",
    classification: "Electrotechnical & Electrical Fittings",
    sub_group: "Earthing & Safety",
    year_published: 2019,
    status: "current",
    certification: "none",
    scope: "Covers the essential requirements and practices to be adopted in electrical installations for buildings to promote personal safety and safety from fire hazard.",
    latest_amendment: null,
    source_url: null,
    cross_references: {},
    categories: ["Electrotechnical & Electrical Fittings"],
  },
  {
    id: "demo-std-6",
    is_number: "IS 3499:2017",
    title: "Metal Chairs for Office Purposes - Specifications",
    title_hi: "कार्यालय प्रयोजनों के लिए धातु की कुर्सियाँ - विनिर्देश",
    classification: "Mechanical Engineering & Furniture",
    sub_group: "Office Seating",
    year_published: 2017,
    status: "current",
    certification: "none",
    scope: "Specifies dimensional, strength, ergonomics, and durability requirements for metal revolving and non-revolving office chairs.",
    latest_amendment: null,
    source_url: null,
    cross_references: {},
    categories: ["Mechanical Engineering & Furniture"],
  },
];

// ─── Demo Categories (richer than backend stub) ───

export const DEMO_CATEGORIES: DemoCategorySummary[] = [
  {
    id: "cat-1",
    code: "CED",
    name: "Civil Engineering & Construction",
    name_hindi: "सिविल इंजीनियरिंग और निर्माण सामग्री",
    description: "Standards governing structural cement, reinforced concrete, steel bars, aggregates, brick masonry, and seismic resilience.",
    standard_count: 420,
    subcategories: ["Cement & Concrete", "Structural Steel", "Bricks & Blocks", "Timber & Woodworks"],
    icon: "Building2",
  },
  {
    id: "cat-2",
    code: "ETD",
    name: "Electrotechnical & Electrical Fittings",
    name_hindi: "इलेक्ट्रो-टेक्निकल और विद्युत फिटिंग",
    description: "Specifications for wiring cables, switchgear, circuit breakers (MCBs), LED luminaires, transformers, and earthing codes.",
    standard_count: 310,
    subcategories: ["Cables & Conductors", "Switchgear & Controlgear", "Lighting & Luminaires", "Earthing & Safety"],
    icon: "Zap",
  },
  {
    id: "cat-3",
    code: "MED",
    name: "Mechanical Engineering & Furniture",
    name_hindi: "यांत्रिक इंजीनियरिंग और फर्नीचर",
    description: "Quality guidelines for ergonomic office chairs, modular workstation desks, steel storage cabinets, and educational furniture.",
    standard_count: 185,
    subcategories: ["Office Seating", "Desks & Tables", "Storage Units", "Hospital Furniture"],
    icon: "Armchair",
  },
  {
    id: "cat-4",
    code: "TXD",
    name: "Textiles & Safety Workwear",
    name_hindi: "वस्त्र और सुरक्षा कार्य परिधान",
    description: "PPE workwear, high-visibility jackets, flame-retardant uniforms, and industrial geotextiles.",
    standard_count: 140,
    subcategories: ["Industrial Protective Clothing", "Safety Footwear", "Geotextiles"],
    icon: "ShieldAlert",
  },
];

// ─── Demo Recommendation Response ───

export const DEMO_RECOMMENDATION: DemoRecommendResponse = {
  query_id: "demo-qry-8f4b-2901",
  detected_language: "en",
  detected_category: "Civil Engineering & Construction",
  recommendations: [
    {
      is_number: "IS 456:2000",
      title: "Plain and Reinforced Concrete - Code of Practice",
      status: "current",
      confidence: 0.96,
      match_reason:
        "Mandatory foundational design and execution code for all structural reinforced cement concrete (RCC) works, seismic detailing, minimum grade of concrete, and durability requirements.",
      source_url: null,
      certification: { scheme: "isi_mark", mandatory: true, details: "ISI mark mandatory under QCO for structural concrete" },
      supersession: null,
      allied_standards: [
        { is_number: "IS 1786:2008", title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement", relationship: "normative_ref", reason: "Steel material specification referenced in IS 456 clause 5.6" },
        { is_number: "IS 269:2015", title: "Ordinary Portland Cement - Specification", relationship: "normative_ref", reason: "Cement specification referenced in IS 456 clause 5.1" },
      ],
      // Demo-only fields
      explanation_hindi: "सभी संरचनात्मक प्रबलित सीमेंट कंक्रीट (RCC) कार्यों, भूकंपीय विस्तार, न्यूनतम कंक्रीट ग्रेड और स्थायित्व आवश्यकताओं के लिए अनिवार्य मुख्य संहिता।",
      matched_clauses: [
        { clause_number: "Clause 5.1 & 5.6", clause_title: "Cement & Reinforcement Materials", snippet: "Concrete shall be composed of OPC conforming to IS 269 or blended cements, and steel reinforcement conforming to IS 1786." },
        { clause_number: "Clause 6.1.1", clause_title: "Grades of Concrete", snippet: "Minimum grade of concrete for reinforced concrete shall not be less than M 20 for moderate exposure." },
      ],
      compliance_actions: [
        "Include mandatory compliance certification with IS 456 in tender clause 4.2",
        "Mandate minimum 28-day compressive cube testing with third-party NABL accredited laboratory",
        "Ensure mix design is pre-approved by the Engineer-in-Charge before casting",
      ],
    },
    {
      is_number: "IS 1786:2008",
      title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement",
      status: "current",
      confidence: 0.94,
      match_reason:
        "Specifically mandates specifications, elongation tolerances, bend tests, and chemical limits for Fe 500D high ductility reinforcement bars for seismic resilience.",
      source_url: null,
      certification: { scheme: "isi_mark", mandatory: true, details: "ISI mark mandatory for TMT bars" },
      supersession: null,
      allied_standards: [],
      explanation_hindi: "भूकंपीय प्रतिरोध के लिए Fe 500D उच्च लचीलापन सुदृढीकरण बार्स के विनिर्देशों को अनिवार्य करता है।",
      matched_clauses: [
        { clause_number: "Table 3", clause_title: "Mechanical Properties of High Strength Deformed Bars", snippet: "Grade Fe 500D requires 0.2 percent proof stress minimum 500.0 N/mm2, TS/YS ratio ≥ 1.10, and minimum elongation of 16.0%." },
      ],
      compliance_actions: [
        "Demand manufacturer test certificate (MTC) with BIS license number for each heat batch",
        "Perform site cross-sectional weight and bend/rebend tests per lot of 10 tonnes",
      ],
    },
    {
      is_number: "IS 269:2015",
      title: "Ordinary Portland Cement - Specification (Sixth Revision)",
      status: "current",
      confidence: 0.89,
      match_reason:
        "Governs quality, fineness, initial/final setting time, soundness, and 28-day strength of OPC 53 Grade specified in the procurement notice.",
      source_url: null,
      certification: { scheme: "isi_mark", mandatory: true, details: "ISI mark mandatory for cement" },
      supersession: null,
      allied_standards: [],
      explanation_hindi: "खरीद नोटिस में निर्दिष्ट OPC 53 ग्रेड की गुणवत्ता, सुंदरता और 28-दिवसीय शक्ति को नियंत्रित करता है।",
      matched_clauses: [
        { clause_number: "Table 2", clause_title: "Physical Requirements of OPC", snippet: "28-day compressive strength shall not be less than 53 MPa with initial setting time not less than 30 minutes." },
      ],
      compliance_actions: [
        "Reject cement older than 90 days from the date of manufacture",
        "Store in weatherproof sheds elevated at least 150mm above ground level",
      ],
    },
  ],
  warnings: [],
  metadata: {
    retrieval_method: "hybrid_bm25_vector",
    llm_model: "demo-mode",
    total_latency_ms: 142,
  },
};

// ─── Demo History ───

export const DEMO_HISTORY: QueryHistoryItem[] = [
  {
    id: "demo-hist-1",
    query: "Supply and installation of Fe 500D TMT reinforcement steel bars and OPC 53 Grade cement...",
    timestamp: "10 minutes ago",
    recommendation_count: 3,
    top_standard: "IS 456:2000",
    detected_language: "en",
  },
  {
    id: "demo-hist-2",
    query: "FRLS PVC insulated 4-core copper armored cables for distribution panel boards in metro station",
    timestamp: "2 hours ago",
    recommendation_count: 2,
    top_standard: "IS 694:2010",
    detected_language: "en",
  },
  {
    id: "demo-hist-3",
    query: "Ergonomic high-back revolving mesh chairs with synchronised tilt mechanism for government offices",
    timestamp: "Yesterday",
    recommendation_count: 2,
    top_standard: "IS 3499:2017",
    detected_language: "en",
  },
];
