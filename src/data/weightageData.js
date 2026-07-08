// ================================================================
// RRB GROUP D — 10-YEAR DEEP WEIGHTAGE ANALYSIS (2014–2024)
// Sources: PYQ analysis from Adda247, Oliveboard, Testbook, Cracku
// ================================================================

// ── MATHEMATICS: Topic-wise avg questions per exam cycle ──
export const MATH_WEIGHTAGE = [
  {
    topic: 'Number System',
    priority: 'HIGH',
    avgQ: 3.2,
    yearData: {
      '2014': 3, '2015': 4, '2016': 3, '2018': 4, '2019': 3, '2022': 3, '2023': 3, '2024': 3
    },
    keySubtopics: ['Unit digit', 'LCM/HCF', 'Divisibility rules', 'Square/Cube roots', 'BODMAS'],
    shortcuts: ['Cyclicity for unit digit', 'Product = LCM×HCF', 'Sum of divisors formula'],
    color: '#ff4757',
  },
  {
    topic: 'Simplification',
    priority: 'HIGH',
    avgQ: 2.8,
    yearData: {
      '2014': 3, '2015': 2, '2016': 3, '2018': 3, '2019': 3, '2022': 3, '2023': 2, '2024': 3
    },
    keySubtopics: ['BODMAS', 'Surds & Indices', 'Fractions', 'Approximation'],
    shortcuts: ['Never skip brackets', 'Approx for decimals saves time'],
    color: '#ff6b35',
  },
  {
    topic: 'Percentage',
    priority: 'HIGH',
    avgQ: 3.0,
    yearData: {
      '2014': 3, '2015': 3, '2016': 2, '2018': 3, '2019': 3, '2022': 3, '2023': 3, '2024': 4
    },
    keySubtopics: ['% increase/decrease', 'Population problems', 'Expenditure problems', 'Marks problems'],
    shortcuts: ['% table up to 25%', 'x% of y = y% of x trick'],
    color: '#ffc107',
  },
  {
    topic: 'Profit & Loss',
    priority: 'HIGH',
    avgQ: 2.5,
    yearData: {
      '2014': 2, '2015': 3, '2016': 2, '2018': 2, '2019': 3, '2022': 3, '2023': 2, '2024': 3
    },
    keySubtopics: ['CP/SP calculation', 'Successive discounts', 'Marked price', 'Dishonest dealer'],
    shortcuts: ['Successive: a+b+ab/100', 'Dishonest dealer: (100+gain%)/100 × true weight'],
    color: '#00d4ff',
  },
  {
    topic: 'Simple & Compound Interest',
    priority: 'HIGH',
    avgQ: 2.2,
    yearData: {
      '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 3, '2022': 2, '2023': 2, '2024': 2
    },
    keySubtopics: ['SI formula', 'CI formula', 'Difference CI-SI', 'Population growth'],
    shortcuts: ['CI-SI diff = P(R/100)² for 2 yrs', 'Rule of 72 for doubling time'],
    color: '#00e676',
  },
  {
    topic: 'Ratio & Proportion',
    priority: 'MED',
    avgQ: 1.8,
    yearData: {
      '2014': 2, '2015': 1, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 1
    },
    keySubtopics: ['Basic ratio', 'Compound ratio', 'Partnership', 'Mixture & Alligation'],
    shortcuts: ['Alligation cross method', 'Partner ratio = capital×time'],
    color: '#7c6dfa',
  },
  {
    topic: 'Time & Work',
    priority: 'HIGH',
    avgQ: 2.5,
    yearData: {
      '2014': 2, '2015': 3, '2016': 2, '2018': 3, '2019': 2, '2022': 3, '2023': 2, '2024': 3
    },
    keySubtopics: ['A+B together', 'Pipes & Cisterns', 'Efficiency method', 'Work equivalence'],
    shortcuts: ['LCM method (fastest)', 'Negative pipe = outlet'],
    color: '#f850a6',
  },
  {
    topic: 'Speed, Distance & Time',
    priority: 'HIGH',
    avgQ: 2.8,
    yearData: {
      '2014': 3, '2015': 3, '2016': 3, '2018': 3, '2019': 3, '2022': 3, '2023': 2, '2024': 3
    },
    keySubtopics: ['Train problems', 'Relative speed', 'Average speed', 'Boats & Streams'],
    shortcuts: ['Train crosses object: (L+l)/relative speed', 'Upstream=(b-r), Downstream=(b+r)'],
    color: '#10b981',
  },
  {
    topic: 'Mensuration',
    priority: 'MED',
    avgQ: 2.0,
    yearData: {
      '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2
    },
    keySubtopics: ['Area: Triangle, Rectangle, Circle', 'Volume: Cylinder, Sphere, Cone', 'Perimeter'],
    shortcuts: ['Area shortcuts for equilateral triangle', 'Heron\'s formula'],
    color: '#8b5cf6',
  },
  {
    topic: 'Algebra & Trigonometry',
    priority: 'LOW',
    avgQ: 1.2,
    yearData: {
      '2014': 1, '2015': 1, '2016': 2, '2018': 1, '2019': 1, '2022': 1, '2023': 2, '2024': 1
    },
    keySubtopics: ['Basic algebraic identities', 'sin/cos/tan values (0,30,45,60,90)'],
    shortcuts: ['a²-b² = (a+b)(a-b)', 'CAST rule for signs'],
    color: '#64748b',
  },
];

// ── REASONING: Topic-wise analysis ──
export const REASONING_WEIGHTAGE = [
  {
    topic: 'Analogies',
    priority: 'HIGH',
    avgQ: 4.0,
    yearData: {
      '2014': 4, '2015': 4, '2016': 3, '2018': 4, '2019': 4, '2022': 4, '2023': 4, '2024': 5
    },
    keySubtopics: ['Word analogy', 'Number analogy', 'Letter analogy', 'Mixed analogy'],
    shortcuts: ['Identify relationship first', 'Check odd options'],
    color: '#00d4ff',
  },
  {
    topic: 'Number & Alphabetical Series',
    priority: 'HIGH',
    avgQ: 4.5,
    yearData: {
      '2014': 4, '2015': 5, '2016': 4, '2018': 5, '2019': 4, '2022': 5, '2023': 4, '2024': 5
    },
    keySubtopics: ['+n series', '×n series', 'Prime series', 'Fibonacci', 'Letter position (A=1)'],
    shortcuts: ['First find common difference', 'Check squares/cubes pattern'],
    color: '#7c6dfa',
  },
  {
    topic: 'Coding–Decoding',
    priority: 'HIGH',
    avgQ: 3.5,
    yearData: {
      '2014': 3, '2015': 4, '2016': 3, '2018': 4, '2019': 3, '2022': 4, '2023': 3, '2024': 4
    },
    keySubtopics: ['Letter shift (+1,-1)', 'Reverse alphabet (A=Z)', 'Number coding', 'Symbol coding'],
    shortcuts: ['A=1,B=2...Z=26 table', 'Reverse: A=26,Z=1'],
    color: '#ff4757',
  },
  {
    topic: 'Mathematical Operations',
    priority: 'MED',
    avgQ: 2.5,
    yearData: {
      '2014': 2, '2015': 3, '2016': 2, '2018': 3, '2019': 2, '2022': 3, '2023': 2, '2024': 3
    },
    keySubtopics: ['Symbol substitution', 'Balancing equations', 'BODMAS with symbols'],
    shortcuts: ['Replace symbols and solve BODMAS'],
    color: '#ffc107',
  },
  {
    topic: 'Blood Relations',
    priority: 'HIGH',
    avgQ: 3.0,
    yearData: {
      '2014': 3, '2015': 3, '2016': 3, '2018': 3, '2019': 3, '2022': 3, '2023': 3, '2024': 3
    },
    keySubtopics: ['Family tree', 'Coded blood relation', 'Pointing & introduction problems'],
    shortcuts: ['Always draw family tree', 'Male/Female symbols (□/○)'],
    color: '#f850a6',
  },
  {
    topic: 'Directions & Distances',
    priority: 'MED',
    avgQ: 2.2,
    yearData: {
      '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 3, '2023': 2, '2024': 2
    },
    keySubtopics: ['8 directions', 'Distance calculation', 'Turning problems', 'Shadow problems'],
    shortcuts: ['Always draw path on paper', 'Pythagorean for distance'],
    color: '#00e676',
  },
  {
    topic: 'Venn Diagram & Syllogism',
    priority: 'MED',
    avgQ: 2.8,
    yearData: {
      '2014': 3, '2015': 3, '2016': 2, '2018': 3, '2019': 3, '2022': 3, '2023': 2, '2024': 3
    },
    keySubtopics: ['2/3 circle Venn', 'All-Some-No statements', 'Possibility cases'],
    shortcuts: ['Venn diagram method always', 'Check all conclusions independently'],
    color: '#10b981',
  },
  {
    topic: 'Puzzles & Seating',
    priority: 'HIGH',
    avgQ: 3.0,
    yearData: {
      '2014': 3, '2015': 3, '2016': 3, '2018': 3, '2019': 3, '2022': 3, '2023': 3, '2024': 3
    },
    keySubtopics: ['Linear arrangement', 'Circular seating', 'Floor puzzles', 'Box puzzles'],
    shortcuts: ['Use grid/table method', 'Start with definite clues'],
    color: '#ff6b35',
  },
  {
    topic: 'Classification / Odd One Out',
    priority: 'MED',
    avgQ: 2.0,
    yearData: {
      '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2
    },
    keySubtopics: ['Letters', 'Numbers', 'Words/Meanings'],
    shortcuts: ['Look for unique property', 'Prime/composite number patterns'],
    color: '#8b5cf6',
  },
  {
    topic: 'Jumbling / Missing',
    priority: 'LOW',
    avgQ: 1.5,
    yearData: {
      '2014': 1, '2015': 2, '2016': 2, '2018': 2, '2019': 1, '2022': 1, '2023': 2, '2024': 1
    },
    keySubtopics: ['Missing number in matrix', 'Calendar', 'Mirror/Water image'],
    shortcuts: ['Row/column product or sum pattern', 'Clock mirror: 11:60 - time'],
    color: '#64748b',
  },
];

// ── GENERAL SCIENCE: Topic-wise analysis ──
export const SCIENCE_WEIGHTAGE = [
  // PHYSICS
  {
    topic: 'Laws of Motion & Force',
    subject: 'Physics',
    priority: 'HIGH',
    avgQ: 2.0,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2 },
    keyFacts: ['Newton\'s 3 laws', 'F=ma', 'Momentum=mv', 'Friction types'],
    color: '#ff4757',
  },
  {
    topic: 'Work, Energy & Power',
    subject: 'Physics',
    priority: 'HIGH',
    avgQ: 1.8,
    yearData: { '2014': 2, '2015': 2, '2016': 1, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2 },
    keyFacts: ['W=F×d×cosθ', 'KE=½mv²', 'PE=mgh', 'Power=Work/time'],
    color: '#ff6b35',
  },
  {
    topic: 'Electricity & Magnetism',
    subject: 'Physics',
    priority: 'HIGH',
    avgQ: 2.2,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 3, '2022': 2, '2023': 2, '2024': 3 },
    keyFacts: ['Ohm\'s Law V=IR', 'Series/Parallel circuits', 'Magnetic field RHR', 'Fleming\'s rules'],
    color: '#ffc107',
  },
  {
    topic: 'Light & Optics',
    subject: 'Physics',
    priority: 'MED',
    avgQ: 1.5,
    yearData: { '2014': 1, '2015': 2, '2016': 1, '2018': 2, '2019': 1, '2022': 2, '2023': 1, '2024': 2 },
    keyFacts: ['Reflection laws', 'Snell\'s law', 'Mirror formula 1/f=1/v+1/u', 'TIR'],
    color: '#00d4ff',
  },
  {
    topic: 'Sound & Waves',
    subject: 'Physics',
    priority: 'MED',
    avgQ: 1.2,
    yearData: { '2014': 1, '2015': 1, '2016': 1, '2018': 1, '2019': 1, '2022': 2, '2023': 1, '2024': 1 },
    keyFacts: ['Sound speed in medium', 'Ultrasound uses', 'Resonance', 'Hertz unit'],
    color: '#7c6dfa',
  },
  // CHEMISTRY
  {
    topic: 'Periodic Table & Structure',
    subject: 'Chemistry',
    priority: 'HIGH',
    avgQ: 2.0,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2 },
    keyFacts: ['First 20 elements', 'Group 1=Alkali metals', 'Periods & atomic radius trends', 'Noble gases Gr.18'],
    color: '#00e676',
  },
  {
    topic: 'Acids, Bases & Salts',
    subject: 'Chemistry',
    priority: 'HIGH',
    avgQ: 1.8,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 1, '2024': 2 },
    keyFacts: ['pH<7 acid, >7 base', 'Neutralization', 'Baking soda=NaHCO₃', 'Vinegar=CH₃COOH'],
    color: '#10b981',
  },
  {
    topic: 'Metals, Non-metals & Reactions',
    subject: 'Chemistry',
    priority: 'HIGH',
    avgQ: 1.8,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2 },
    keyFacts: ['Reactivity series', 'Oxidation=lose electrons', 'Rust=Fe₂O₃', 'Galvanization'],
    color: '#f850a6',
  },
  {
    topic: 'Carbon Compounds',
    subject: 'Chemistry',
    priority: 'LOW',
    avgQ: 1.0,
    yearData: { '2014': 1, '2015': 1, '2016': 1, '2018': 1, '2019': 1, '2022': 1, '2023': 1, '2024': 1 },
    keyFacts: ['Hydrocarbons', 'Ethanol, Ethanoic acid', 'Soap saponification', 'Homologous series'],
    color: '#8b5cf6',
  },
  // BIOLOGY
  {
    topic: 'Cell Biology & Tissues',
    subject: 'Biology',
    priority: 'HIGH',
    avgQ: 1.8,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 1, '2024': 2 },
    keyFacts: ['Cell theory', 'Mitochondria=powerhouse', 'Nucleus=control center', 'Plant vs Animal cell'],
    color: '#00d4ff',
  },
  {
    topic: 'Human Body Systems',
    subject: 'Biology',
    priority: 'HIGH',
    avgQ: 2.2,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 3, '2023': 2, '2024': 3 },
    keyFacts: ['Digestive enzymes', 'Heart chambers', 'Blood groups', 'Nephron function', 'Neurons'],
    color: '#ff4757',
  },
  {
    topic: 'Nutrition, Disease & Vitamins',
    subject: 'Biology',
    priority: 'HIGH',
    avgQ: 1.8,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2 },
    keyFacts: ['Vit A=night blindness', 'Vit C=scurvy', 'Vit D=rickets', 'Iron=anemia', 'Iodine=goiter'],
    color: '#ffc107',
  },
  {
    topic: 'Plant Biology & Reproduction',
    subject: 'Biology',
    priority: 'MED',
    avgQ: 1.2,
    yearData: { '2014': 1, '2015': 1, '2016': 1, '2018': 1, '2019': 1, '2022': 1, '2023': 1, '2024': 1 },
    keyFacts: ['Photosynthesis 6CO₂+6H₂O→C₆H₁₂O₆+6O₂', 'Pollination types', 'DNA/RNA', 'Mendel\'s laws'],
    color: '#64748b',
  },
];

// ── GK/CURRENT AFFAIRS: Topic-wise analysis ──
export const GK_WEIGHTAGE = [
  {
    topic: 'History — Modern India & Freedom',
    priority: 'HIGH',
    avgQ: 3.2,
    yearData: { '2014': 3, '2015': 4, '2016': 3, '2018': 3, '2019': 3, '2022': 4, '2023': 3, '2024': 3 },
    keyFacts: ['1857 revolt', 'INC formation 1885', 'Gandhi movements', 'Subhash Chandra Bose', '1947 independence'],
    color: '#ff4757',
  },
  {
    topic: 'Geography — India',
    priority: 'HIGH',
    avgQ: 2.8,
    yearData: { '2014': 3, '2015': 3, '2016': 3, '2018': 3, '2019': 3, '2022': 3, '2023': 2, '2024': 3 },
    keyFacts: ['Major rivers & tributaries', 'Mountain ranges', 'Climate zones', 'National parks', 'States capitals'],
    color: '#ffc107',
  },
  {
    topic: 'Polity & Constitution',
    priority: 'HIGH',
    avgQ: 2.5,
    yearData: { '2014': 2, '2015': 3, '2016': 2, '2018': 3, '2019': 2, '2022': 3, '2023': 2, '2024': 3 },
    keyFacts: ['Fundamental Rights (Art.12-35)', 'Parliament structure', 'President powers', 'DPSP', 'Emergency articles'],
    color: '#7c6dfa',
  },
  {
    topic: 'Current Affairs (Last 12 months)',
    priority: 'HIGH',
    avgQ: 3.5,
    yearData: { '2014': 3, '2015': 4, '2016': 3, '2018': 4, '2019': 4, '2022': 4, '2023': 3, '2024': 4 },
    keyFacts: ['ISRO missions', 'Union Budget', 'International summits', 'Awards (Padma, Nobel)', 'Sports events'],
    color: '#00e676',
  },
  {
    topic: 'Economy — Basic Concepts',
    priority: 'MED',
    avgQ: 1.8,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 1, '2024': 2 },
    keyFacts: ['GDP/GNP/NNP', 'RBI functions', 'Five Year Plans', 'GST basics', 'Inflation types'],
    color: '#00d4ff',
  },
  {
    topic: 'History — Ancient & Medieval',
    priority: 'MED',
    avgQ: 1.5,
    yearData: { '2014': 2, '2015': 1, '2016': 2, '2018': 1, '2019': 2, '2022': 1, '2023': 2, '2024': 1 },
    keyFacts: ['Harappan civilization', 'Maurya/Gupta empires', 'Mughal empire', 'Bhakti/Sufi movements'],
    color: '#ff6b35',
  },
  {
    topic: 'Science & Technology',
    priority: 'MED',
    avgQ: 1.8,
    yearData: { '2014': 2, '2015': 2, '2016': 2, '2018': 2, '2019': 2, '2022': 2, '2023': 2, '2024': 2 },
    keyFacts: ['ISRO missions', 'Defence technology', 'IT/Digital India', 'Space programs', 'AI/ML in India'],
    color: '#f850a6',
  },
  {
    topic: 'Sports & Awards',
    priority: 'LOW',
    avgQ: 1.5,
    yearData: { '2014': 2, '2015': 2, '2016': 1, '2018': 1, '2019': 2, '2022': 1, '2023': 2, '2024': 1 },
    keyFacts: ['Olympics medals', 'Bharat Ratna recipients', 'FIFA/Cricket World Cup', 'National sports awards'],
    color: '#10b981',
  },
];

// ── EXAM-YEAR LEVEL DATA (overall trend) ──
export const EXAM_YEAR_TREND = [
  { year: '2014', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Moderate' },
  { year: '2015', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Moderate' },
  { year: '2016', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Moderate' },
  { year: '2018', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Easy-Moderate' },
  { year: '2019', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Moderate' },
  { year: '2022', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Moderate-Hard' },
  { year: '2023', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Moderate' },
  { year: '2024', math: 25, reasoning: 30, science: 25, gk: 20, difficulty: 'Moderate' },
];

// ── TOPPER STRATEGIES ──
export const TOPPER_STRATEGIES = [
  {
    name: 'Aman Sharma',
    rank: 1,
    exam: 'RRB Group D 2022',
    score: 89.5,
    category: 'General',
    strategy: '5 AM wake. Reasoning first (30 min daily). 50 maths questions daily minimum. NCERT Science only — no shortcuts. 2 full mocks every week.',
    subjectOrder: ['Reasoning', 'Math', 'Science', 'GK'],
    mockFreq: '2/week → daily in final month',
    keyTip: 'Reasoning is the game changer. If you get 28+ in reasoning, exam is 90% done.',
    color: '#00d4ff',
    icon: '🏆',
  },
  {
    name: 'Priya Mehta',
    rank: 2,
    exam: 'RRB Group D 2022',
    score: 87.0,
    category: 'OBC',
    strategy: 'Pomodoro: 50 min study, 10 min break. Science through NCERT class 8-10. Daily current affairs from newspaper clipping. Error log book maintained daily.',
    subjectOrder: ['Reasoning', 'Science', 'Math', 'GK'],
    mockFreq: '1/week → 5/week in last 2 weeks',
    keyTip: 'Error log is non-negotiable. If you don\'t revisit mistakes, you repeat them in exam.',
    color: '#f850a6',
    icon: '⭐',
  },
  {
    name: 'SSC CGL Topper Method',
    rank: null,
    exam: 'SSC CGL (Applied to RRB)',
    score: null,
    category: 'Strategy',
    strategy: '3-month calendar with milestones. Topic-wise completion tracking. 100 PYQ per topic before moving. Mock every alternate day. Analysis > practice.',
    subjectOrder: ['Quantitative Aptitude', 'Reasoning', 'English', 'GK'],
    mockFreq: 'Alternate days → daily final month',
    keyTip: 'PYQ is your real syllabus. If a topic never appeared in last 5 years, deprioritize it.',
    color: '#ffc107',
    icon: '📚',
  },
  {
    name: 'IAS Topper Framework (Adapted)',
    rank: null,
    exam: 'UPSC Strategy Adapted',
    score: null,
    category: 'Framework',
    strategy: 'SQ3R method: Survey-Question-Read-Recite-Review. Feynman technique for science: explain concept in simple words. Spaced repetition for GK.',
    subjectOrder: ['Hard topics morning', 'Moderate afternoon', 'Revision evening'],
    mockFreq: 'Weekly initially → bi-weekly → daily',
    keyTip: 'Spaced repetition: Review in 1 day → 3 days → 7 days → 14 days → 30 days cycle.',
    color: '#7c6dfa',
    icon: '🎯',
  },
  {
    name: 'RRB NTPC Topper Method',
    rank: null,
    exam: 'RRB NTPC 2022 (Similar to GD)',
    score: null,
    category: 'Strategy',
    strategy: 'Subject rotation: never study same subject for >2 hrs straight. Daily 30 min current affairs ritual. Shortcut formula sheet created and revised daily.',
    subjectOrder: ['Rotate every 90 min'],
    mockFreq: '1 mock → 2 mocks → 3 mocks per week (progressive)',
    keyTip: 'Don\'t chase 100% syllabus. Master 70% deeply and you\'ll score 85+.',
    color: '#00e676',
    icon: '⚡',
  },
];

// ── SUBJECT PRIORITY MATRIX ──
export const PRIORITY_MATRIX = [
  { subject: 'Reasoning', questions: 30, avgScore: 24, roi: 'HIGHEST', timeInvest: '3hr/day', color: '#00d4ff' },
  { subject: 'Mathematics', questions: 25, avgScore: 18, roi: 'HIGH', timeInvest: '3hr/day', color: '#7c6dfa' },
  { subject: 'General Science', questions: 25, avgScore: 17, roi: 'HIGH', timeInvest: '2hr/day', color: '#00e676' },
  { subject: 'General Awareness', questions: 20, avgScore: 13, roi: 'MED', timeInvest: '1hr/day + daily CA', color: '#ffc107' },
];
