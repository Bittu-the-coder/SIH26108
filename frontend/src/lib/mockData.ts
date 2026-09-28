import { Standard, CategorySummary, RecommendationResponse } from "./types";

export const MOCK_CATEGORIES: CategorySummary[] = [
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

export const MOCK_STANDARDS: Standard[] = [
  {
    id: "std-1",
    standard_number: "IS 456:2000",
    title: "Plain and Reinforced Concrete - Code of Practice",
    title_hindi: "सादा और प्रबलित कंक्रीट - आचार संहिता (चौथा पुनरीक्षण)",
    category: "Civil Engineering & Construction",
    subcategory: "Cement & Concrete",
    publication_year: 2000,
    status: "ACTIVE",
    mandatory_status: true,
    keywords: ["concrete", "reinforcement", "RCC", "mix design", "durability", "curing", "compressive strength"],
    abstract: "Deals with the general structural use of plain and reinforced concrete. Covers design philosophy, material specifications, minimum cement content, exposure classes, shear, and detailing.",
    abstract_hindi: "सादा और प्रबलित कंक्रीट के सामान्य संरचनात्मक उपयोग से संबंधित है। यह डिजाइन सिद्धांतों, सामग्री विशिष्टताओं, न्यूनतम सीमेंट सामग्री और विस्तार का विवरण प्रदान करता है।",
    cross_references: [
      { standard_id: "std-2", standard_number: "IS 1786:2008", relation_type: "COMPLEMENTARY", clause: "Clause 5.6" },
      { standard_id: "std-3", standard_number: "IS 269:2015", relation_type: "COMPLEMENTARY", clause: "Clause 5.1" }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "std-2",
    standard_number: "IS 1786:2008",
    title: "High Strength Deformed Steel Bars and Wires for Concrete Reinforcement",
    title_hindi: "कंक्रीट सुदृढीकरण के लिए उच्च शक्ति विकृत स्टील की छड़ें और तार",
    category: "Civil Engineering & Construction",
    subcategory: "Structural Steel",
    publication_year: 2008,
    status: "ACTIVE",
    mandatory_status: true,
    keywords: ["TMT bars", "steel reinforcement", "Fe 500D", "yield strength", "bend test", "corrosion resistance"],
    abstract: "Covers requirements of deformed steel bars and wires for use as reinforcement in concrete in grades Fe 415, Fe 415D, Fe 500, Fe 500D, Fe 550, Fe 550D, and Fe 600.",
    abstract_hindi: "कंक्रीट सुदृढीकरण के लिए उच्च शक्ति वाले विरूपित स्टील बार्स (Fe 500, Fe 500D, आदि) की भौतिक और रासायनिक आवश्यकताओं को निर्दिष्ट करता है।",
    cross_references: [
      { standard_id: "std-1", standard_number: "IS 456:2000", relation_type: "REFERENCED_BY" }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "std-3",
    standard_number: "IS 269:2015",
    title: "Ordinary Portland Cement - Specification (Sixth Revision)",
    title_hindi: "साधारण पोर्टलैंड सीमेंट - विनिर्देश (छठा पुनरीक्षण)",
    category: "Civil Engineering & Construction",
    subcategory: "Cement & Concrete",
    publication_year: 2015,
    status: "ACTIVE",
    mandatory_status: true,
    keywords: ["OPC 33", "OPC 43", "OPC 53", "cement quality", "fineness", "setting time", "soundness"],
    abstract: "Specifies requirements for manufacture and chemical/physical requirements of 33 grade, 43 grade, and 53 grade ordinary Portland cement.",
    abstract_hindi: "33 ग्रेड, 43 ग्रेड और 53 ग्रेड साधारण पोर्टलैंड सीमेंट के रासायनिक और भौतिक मानकों को निर्दिष्ट करता है।",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "std-4",
    standard_number: "IS 694:2010",
    title: "Polyvinyl Chloride (PVC) Insulated Cables for Working Voltages up to and including 1100 V",
    title_hindi: "1100 वोल्ट तक के कार्यशील वोल्टेज के लिए पीवीसी इंसुलेटेड केबल",
    category: "Electrotechnical & Electrical Fittings",
    subcategory: "Cables & Conductors",
    publication_year: 2010,
    status: "ACTIVE",
    mandatory_status: true,
    keywords: ["PVC wire", "copper conductor", "building wires", "insulation resistance", "flame retardant"],
    abstract: "Covers single-core and multi-core cables with copper or aluminium conductors for electric power and lighting in domestic, commercial and industrial installations.",
    abstract_hindi: "घरेलू, वाणिज्यिक और औद्योगिक प्रतिष्ठानों में बिजली और प्रकाश व्यवस्था के लिए तांबे या एल्यूमीनियम कंडक्टर वाले केबलों को कवर करता है।",
    cross_references: [
      { standard_id: "std-5", standard_number: "IS 732:2019", relation_type: "COMPLEMENTARY" }
    ],
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "std-5",
    standard_number: "IS 732:2019",
    title: "Code of Practice for Electrical Wiring Installations",
    title_hindi: "विद्युत वायरिंग प्रतिष्ठानों के लिए आचार संहिता",
    category: "Electrotechnical & Electrical Fittings",
    subcategory: "Earthing & Safety",
    publication_year: 2019,
    status: "ACTIVE",
    mandatory_status: false,
    keywords: ["wiring design", "earthing", "conduit wiring", "circuit protection", "isolation"],
    abstract: "Covers the essential requirements and practices to be adopted in electrical installations for buildings to promote personal safety and safety from fire hazard.",
    abstract_hindi: "व्यक्तिगत सुरक्षा और आग के खतरे से सुरक्षा को बढ़ावा देने के लिए इमारतों में विद्युत प्रतिष्ठानों में अपनाई जाने वाली आवश्यकताओं को शामिल करता है।",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "std-6",
    standard_number: "IS 3400 (Part 1 to 24)",
    title: "Methods of Test for Vulcanized Rubber",
    title_hindi: "वल्केनाइज्ड रबर के परीक्षण के तरीके",
    category: "Electrotechnical & Electrical Fittings",
    subcategory: "Cables & Conductors",
    publication_year: 2021,
    status: "ACTIVE",
    mandatory_status: false,
    keywords: ["rubber testing", "tensile strain", "tear strength", "cable insulation"],
    abstract: "Prescribes methods of testing vulcanized natural and synthetic rubbers for physical and mechanical properties.",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "std-7",
    standard_number: "IS 3499:2017",
    title: "Metal Chairs for Office Purposes - Specifications",
    title_hindi: "कार्यालय प्रयोजनों के लिए धातु की कुर्सियाँ - विनिर्देश",
    category: "Mechanical Engineering & Furniture",
    subcategory: "Office Seating",
    publication_year: 2017,
    status: "ACTIVE",
    mandatory_status: false,
    keywords: ["office chairs", "ergonomics", "swivel chair", "load test", "tilt mechanism", "stability"],
    abstract: "Specifies dimensional, strength, ergonomics, and durability requirements for metal revolving and non-revolving office chairs.",
    abstract_hindi: "कार्यालय में उपयोग होने वाली रिवॉल्विंग और स्थिर धातु की कुर्सियों के लिए स्थायित्व, स्थिरता और एर्गोनोमिक मानकों को निर्दिष्ट करता है।",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  },
  {
    id: "std-8",
    standard_number: "IS 1829 (Part 1):1978",
    title: "Library Furniture and Fittings - Part 1: Timber",
    title_hindi: "पुस्तकालय फर्नीचर और फिटिंग - भाग 1: लकड़ी",
    category: "Mechanical Engineering & Furniture",
    subcategory: "Desks & Tables",
    publication_year: 1978,
    status: "ACTIVE",
    mandatory_status: false,
    keywords: ["library racks", "reading tables", "wooden bookstacks", "dimensions"],
    abstract: "Requirements for dimensions and materials for timber library furniture such as shelving racks, study carrels, and circulation counters.",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z"
  }
];

export const MOCK_RECOMMENDATION_SAMPLE: RecommendationResponse = {
  query_id: "qry-8f4b-2901",
  query: "Supply and installation of Fe 500D TMT reinforcement steel bars and OPC 53 Grade cement for multi-storey residential RCC construction conforming to earthquake safety.",
  language: "en",
  detected_category: "Civil Engineering & Construction",
  execution_time_ms: 142,
  total_standards_evaluated: 420,
  recommendations: [
    {
      standard: MOCK_STANDARDS[0], // IS 456:2000
      confidence_score: 0.96,
      relevance_rank: 1,
      explanation: "Mandatory foundational design and execution code for all structural reinforced cement concrete (RCC) works, seismic detailing, minimum grade of concrete, and durability requirements.",
      explanation_hindi: "सभी संरचनात्मक प्रबलित सीमेंट कंक्रीट (RCC) कार्यों, भूकंपीय विस्तार, न्यूनतम कंक्रीट ग्रेड और स्थायित्व आवश्यकताओं के लिए अनिवार्य मुख्य संहिता।",
      matched_clauses: [
        {
          clause_number: "Clause 5.1 & 5.6",
          clause_title: "Cement & Reinforcement Materials",
          snippet: "Concrete shall be composed of OPC conforming to IS 269 or blended cements, and steel reinforcement conforming to IS 1786."
        },
        {
          clause_number: "Clause 6.1.1",
          clause_title: "Grades of Concrete",
          snippet: "Minimum grade of concrete for reinforced concrete shall not be less than M 20 for moderate exposure."
        }
      ],
      compliance_actions: [
        "Include mandatory compliance certification with IS 456 in tender clause 4.2",
        "Mandate minimum 28-day compressive cube testing with third-party NABL accredited laboratory",
        "Ensure mix design is pre-approved by the Engineer-in-Charge before casting"
      ],
      is_mandatory: true
    },
    {
      standard: MOCK_STANDARDS[1], // IS 1786:2008
      confidence_score: 0.94,
      relevance_rank: 2,
      explanation: "Specifically mandates specifications, elongation tolerances, bend tests, and chemical limits for Fe 500D high ductility reinforcement bars for seismic resilience.",
      explanation_hindi: "भूकंपीय प्रतिरोध के लिए Fe 500D उच्च लचीलापन सुदृढीकरण बार्स के विनिर्देशों, बढ़ाव सहिष्णुता, मोड़ परीक्षणों और रासायनिक सीमाओं को अनिवार्य करता है।",
      matched_clauses: [
        {
          clause_number: "Table 3",
          clause_title: "Mechanical Properties of High Strength Deformed Bars",
          snippet: "Grade Fe 500D requires 0.2 percent proof stress minimum 500.0 N/mm2, TS/YS ratio ≥ 1.10, and minimum elongation of 16.0%."
        }
      ],
      compliance_actions: [
        "Demand manufacturer test certificate (MTC) with BIS license number for each heat batch",
        "Perform site cross-sectional weight and bend/rebend tests per lot of 10 tonnes"
      ],
      is_mandatory: true
    },
    {
      standard: MOCK_STANDARDS[2], // IS 269:2015
      confidence_score: 0.89,
      relevance_rank: 3,
      explanation: "Governs quality, fineness, initial/final setting time, soundness, and 28-day strength of OPC 53 Grade specified in the procurement notice.",
      explanation_hindi: "खरीद नोटिस में निर्दिष्ट OPC 53 ग्रेड की गुणवत्ता, सुंदरता, प्रारंभिक/अंतिम सेटिंग समय और 28-दिवसीय शक्ति को नियंत्रित करता है।",
      matched_clauses: [
        {
          clause_number: "Table 2",
          clause_title: "Physical Requirements of OPC",
          snippet: "28-day compressive strength shall not be less than 53 MPa with initial setting time not less than 30 minutes."
        }
      ],
      compliance_actions: [
        "Reject cement older than 90 days from the date of manufacture",
        "Store in weatherproof sheds elevated at least 150mm above ground level"
      ],
      is_mandatory: true
    }
  ]
};

export const MOCK_HISTORY: { id: string; query: string; timestamp: string; recommendation_count: number; top_standard: string; category: string }[] = [
  {
    id: "hist-1",
    query: "Supply and installation of Fe 500D TMT reinforcement steel bars and OPC 53 Grade cement...",
    timestamp: "10 minutes ago",
    recommendation_count: 3,
    top_standard: "IS 456:2000",
    category: "Civil Engineering & Construction"
  },
  {
    id: "hist-2",
    query: "FRLS PVC insulated 4-core copper armored cables for distribution panel boards in metro station",
    timestamp: "2 hours ago",
    recommendation_count: 2,
    top_standard: "IS 694:2010",
    category: "Electrotechnical & Electrical Fittings"
  },
  {
    id: "hist-3",
    query: "Ergonomic high-back revolving mesh chairs with synchronised tilt mechanism for government offices",
    timestamp: "Yesterday",
    recommendation_count: 2,
    top_standard: "IS 3499:2017",
    category: "Mechanical Engineering & Furniture"
  }
];
