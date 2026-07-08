// ============================================================
//  RRB GROUP D — COMMAND CENTER
//  3 Exam Cycles Deep Research:
//  CEN 02/2018 | CEN 01/2019 (2022 exam) | CEN 08/2024 (2025-26 exam)
//  Target: CEN 09/2025 → Aug 3-21, 2026
//  Strategy: EAT THE FROG → Math → Reasoning → GS → GK
// ============================================================

export const EXAM_DATE = new Date('2026-08-03T09:00:00+05:30');

// ── OFFICIAL CUTOFFS — ALL YEARS ─────────────────────────────
export const CUTOFFS = [
  {
    cen: 'CEN 02/2018',
    year: '2018',
    exam: 'Aug–Sep 2018',
    vacancy: 62907,
    ur: 71.53, obc: 68.63, sc: 61.57, st: 55.33, ews: null,
    difficulty: 'Easy–Moderate',
    note: 'Highest ST cutoff ever — large vacancies, high competition',
  },
  {
    cen: 'CEN 01/2019',
    year: '2022',
    exam: 'Aug–Sep 2022',
    vacancy: 103769,
    ur: 60.95, obc: 55.65, sc: 49.89, st: 43.58, ews: 40.00,
    difficulty: 'Moderate',
    note: 'Largest vacancy batch. ST cutoff dropped due to huge applicant pool.',
  },
  {
    cen: 'CEN 08/2024',
    year: '2025-26',
    exam: 'Nov 2025–Feb 2026',
    vacancy: 32438,
    ur: 78.01, obc: 76.66, sc: 70.63, st: 63.00, ews: 71.11,
    difficulty: 'Moderate–Difficult',
    note: '⚠️ ST cutoff JUMPED to 63! Fewer vacancies = higher cutoff. CRITICAL DATA.',
  },
  {
    cen: 'CEN 09/2025',
    year: '2026 (Your Exam)',
    exam: 'Aug 3–21, 2026',
    vacancy: 22195,
    ur: '~82?', obc: '~79?', sc: '~73?', st: '~65?', ews: '~74?',
    difficulty: 'Expected: Moderate–Difficult',
    note: '⚠️ FEWER vacancies (22,195) than CEN 08/2024 (32,438). ST cutoff may reach 65+. TARGET 78+.',
  },
];

// ── PYQ TOPIC ANALYSIS — 3 EXAMS COMBINED ────────────────────
// Questions asked per topic across 3 cycles (avg per shift)
export const PYQ_ANALYSIS = {
  math: {
    color: '#7c6dfa',
    totalQ: 25,
    trends: {
      '2018': { difficulty: 'Easy–Moderate', topHighlights: ['BODMAS heavy','Train problems common','Basic mensuration'] },
      '2022': { difficulty: 'Moderate',       topHighlights: ['Percentage + P&L most asked','T&W LCM method critical','SI/CI both appeared'] },
      '2025': { difficulty: 'Moderate',       topHighlights: ['DI tables appeared','Ratio problems increased','Simplification still heavy'] },
    },
    topics: [
      { id:'M1',  name:'Number System & LCM/HCF',       q18:4, q22:3, q25:3, exp:3, priority:'🔴 HIGH',  trend:'↘ Slight drop but always 3+ Qs' },
      { id:'M2',  name:'Simplification & BODMAS',        q18:5, q22:4, q25:4, exp:4, priority:'🔴 HIGH',  trend:'↔ Stable at 4–5 Qs every year' },
      { id:'M3',  name:'Percentage',                     q18:3, q22:3, q25:3, exp:3, priority:'🔴 HIGH',  trend:'↔ Consistent. Linked with P&L' },
      { id:'M4',  name:'Profit, Loss & Discount',        q18:2, q22:3, q25:3, exp:3, priority:'🔴 HIGH',  trend:'↗ Increasing trend. 3 Qs expected' },
      { id:'M5',  name:'Time, Speed & Distance',         q18:3, q22:2, q25:2, exp:2, priority:'🟡 MED',   trend:'↘ Trains less now. 2 Qs' },
      { id:'M6',  name:'Time & Work + Pipes',            q18:2, q22:3, q25:2, exp:3, priority:'🔴 HIGH',  trend:'↗ LCM method saves time' },
      { id:'M7',  name:'Simple & Compound Interest',     q18:2, q22:2, q25:2, exp:2, priority:'🟡 MED',   trend:'↔ Always 2 Qs. Formula-based' },
      { id:'M8',  name:'Ratio, Proportion & Alligation', q18:2, q22:2, q25:2, exp:2, priority:'🟡 MED',   trend:'↔ Alligation in 2022 & 2025' },
      { id:'M9',  name:'Mensuration (2D & 3D)',          q18:1, q22:1, q25:2, exp:2, priority:'🟡 MED',   trend:'↗ 3D shapes added in 2025' },
      { id:'M10', name:'Algebra & Age Problems',         q18:1, q22:1, q25:1, exp:1, priority:'🟢 LOW',   trend:'↔ 1 Q, easy, never skip' },
      { id:'M11', name:'Statistics — Mean/Median/Mode',  q18:0, q22:1, q25:2, exp:2, priority:'🟡 MED',   trend:'↗ NEW TREND. DI+stats rising' },
    ],
  },
  reasoning: {
    color: '#00d4ff',
    totalQ: 30,
    trends: {
      '2018': { difficulty: 'Easy',           topHighlights: ['Coding easiest section','Series very standard','Blood relations simple'] },
      '2022': { difficulty: 'Easy–Moderate',  topHighlights: ['Puzzles got harder','Syllogism appeared more','Venn diagrams introduced'] },
      '2025': { difficulty: 'Moderate',       topHighlights: ['Complex seating arrangements','Data interpretation added','Statement-conclusion new'] },
    },
    topics: [
      { id:'R1',  name:'Number & Letter Series',           q18:4, q22:4, q25:4, exp:4, priority:'🔴 HIGH', trend:'↔ Always 4 Qs. Most scoring' },
      { id:'R2',  name:'Analogies (Word/Number/Letter)',   q18:4, q22:4, q25:4, exp:4, priority:'🔴 HIGH', trend:'↔ 4 Qs every single exam. Master it' },
      { id:'R3',  name:'Coding–Decoding',                  q18:3, q22:3, q25:3, exp:3, priority:'🔴 HIGH', trend:'↔ Letter shift + word pattern both' },
      { id:'R4',  name:'Blood Relations',                  q18:3, q22:2, q25:2, exp:2, priority:'🟡 MED',  trend:'↘ Simpler now. 2 Qs' },
      { id:'R5',  name:'Puzzles & Seating Arrangement',    q18:2, q22:3, q25:4, exp:4, priority:'🔴 HIGH', trend:'↗ RISING. Complex in 2025' },
      { id:'R6',  name:'Venn Diagrams',                    q18:2, q22:3, q25:3, exp:3, priority:'🔴 HIGH', trend:'↗ Formula-type + Euler diagram both' },
      { id:'R7',  name:'Syllogism',                        q18:2, q22:3, q25:3, exp:3, priority:'🔴 HIGH', trend:'↗ All/Some/No — Venn method fastest' },
      { id:'R8',  name:'Directions & Distance',            q18:2, q22:2, q25:2, exp:2, priority:'🟡 MED',  trend:'↔ Always 2. Draw compass grid' },
      { id:'R9',  name:'Mathematical Operations',          q18:2, q22:2, q25:1, exp:2, priority:'🟡 MED',  trend:'↘ BODMAS-trick type. Quick marks' },
      { id:'R10', name:'Classification / Odd One Out',     q18:3, q22:2, q25:1, exp:1, priority:'🟢 LOW',  trend:'↘ Getting rarer' },
      { id:'R11', name:'Mirror Image & Clock',             q18:1, q22:1, q25:1, exp:1, priority:'🟢 LOW',  trend:'↔ 1 Q always. Clock = 11:60 trick' },
      { id:'R12', name:'Statement & Conclusion',           q18:0, q22:1, q25:2, exp:2, priority:'🟡 MED',  trend:'↗ NEW TREND. Rising in 2025' },
    ],
  },
  gs: {
    color: '#00e676',
    totalQ: 25,
    physics: {
      topics: [
        { id:'P1', name:'Electricity & Ohm\'s Law',          q18:3, q22:3, q25:3, exp:3, priority:'🔴 HIGH', trend:'↔ V=IR, parallel/series always asked' },
        { id:'P2', name:'Force, Motion & Newton\'s Laws',     q18:2, q22:2, q25:2, exp:2, priority:'🔴 HIGH', trend:'↔ All 3 laws, inertia every year' },
        { id:'P3', name:'Work, Energy & Power',               q18:2, q22:1, q25:2, exp:2, priority:'🟡 MED',  trend:'↗ Kinetic+potential energy' },
        { id:'P4', name:'Light — Reflection & Refraction',    q18:2, q22:2, q25:1, exp:2, priority:'🟡 MED',  trend:'↔ Mirror/lens formula, eye defects' },
        { id:'P5', name:'Sound & Waves',                      q18:1, q22:1, q25:1, exp:1, priority:'🟢 LOW',  trend:'↔ Speed 343m/s. Ultrasound uses' },
      ]
    },
    chemistry: {
      topics: [
        { id:'C1', name:'Periodic Table & Atomic Structure', q18:2, q22:2, q25:2, exp:2, priority:'🔴 HIGH', trend:'↔ First 20 elements, valency, groups' },
        { id:'C2', name:'Acids, Bases & Salts + pH',         q18:2, q22:2, q25:2, exp:2, priority:'🔴 HIGH', trend:'↔ Litmus, pH scale, common salts' },
        { id:'C3', name:'Metals, Non-metals & Alloys',       q18:2, q22:2, q25:2, exp:2, priority:'🔴 HIGH', trend:'↔ Reactivity series, Bronze=Cu+Sn' },
        { id:'C4', name:'Chemical Reactions & Types',        q18:1, q22:1, q25:1, exp:1, priority:'🟢 LOW',  trend:'↔ Combination, displacement types' },
      ]
    },
    biology: {
      topics: [
        { id:'B1', name:'Human Body Systems',                q18:3, q22:3, q25:3, exp:3, priority:'🔴 HIGH', trend:'↔ Heart (4 chambers), blood, hormones' },
        { id:'B2', name:'Vitamins, Minerals & Diseases',     q18:2, q22:2, q25:2, exp:2, priority:'🔴 HIGH', trend:'↔ A/B/C/D/K deficiency diseases' },
        { id:'B3', name:'Cell Biology & Genetics',           q18:1, q22:2, q25:2, exp:2, priority:'🟡 MED',  trend:'↗ Mitochondria, DNA, Mendel rising' },
        { id:'B4', name:'Photosynthesis & Plant Biology',    q18:1, q22:1, q25:1, exp:1, priority:'🟢 LOW',  trend:'↔ Chlorophyll, CO2+H2O→glucose' },
      ]
    },
  },
  gk: {
    color: '#ffc107',
    totalQ: 20,
    topics: [
      { id:'G1', name:'Current Affairs (Jan 2025–Jul 2026)', q18:6, q22:7, q25:8, exp:8, priority:'🔴 HIGH', trend:'↗ CA weight increasing each year. 8 Qs!' },
      { id:'G2', name:'Modern Indian History (1857–1950)',   q18:4, q22:3, q25:3, exp:3, priority:'🔴 HIGH', trend:'↔ Freedom struggle, 1857, Gandhi always' },
      { id:'G3', name:'Indian Geography',                    q18:3, q22:3, q25:3, exp:3, priority:'🔴 HIGH', trend:'↔ Rivers, NPs, soil types every year' },
      { id:'G4', name:'Indian Polity & Constitution',        q18:3, q22:3, q25:2, exp:2, priority:'🟡 MED',  trend:'↘ Articles 14,19,21,32 most common' },
      { id:'G5', name:'Economy, Budget & Railways',          q18:2, q22:2, q25:2, exp:2, priority:'🟡 MED',  trend:'↔ RBI, Railway ministry, GDP basics' },
      { id:'G6', name:'Science & Technology (ISRO/DRDO)',    q18:2, q22:2, q25:2, exp:2, priority:'🟡 MED',  trend:'↔ Chandrayaan, Agni, DRDO projects' },
    ],
  },
};

// ── EAT THE FROG SUBJECT ORDER ────────────────────────────────
export const SUBJECTS = {
  math: {
    name: 'Mathematics',
    emoji: '📐',
    color: '#7c6dfa',
    totalQ: 25,
    target: 22,
    frogReason: '🐸 HARDEST FIRST. Numbers + formulas = full brain needed. Hit it at peak energy.',
    topics: PYQ_ANALYSIS.math.topics,
  },
  reasoning: {
    name: 'Reasoning',
    emoji: '🧠',
    color: '#00d4ff',
    totalQ: 30,
    target: 28,
    frogReason: '⚡ SECOND FROG. 30 marks = highest section. Logic needs sharp focus.',
    topics: PYQ_ANALYSIS.reasoning.topics,
  },
  gs: {
    name: 'General Science',
    emoji: '🔬',
    color: '#00e676',
    totalQ: 25,
    target: 20,
    frogReason: '📚 THIRD. NCERT facts. Physics→Chemistry→Biology in that order.',
    topics: [
      ...PYQ_ANALYSIS.gs.physics.topics,
      ...PYQ_ANALYSIS.gs.chemistry.topics,
      ...PYQ_ANALYSIS.gs.biology.topics,
    ],
  },
  gk: {
    name: 'GK & Current Affairs',
    emoji: '🌍',
    color: '#ffc107',
    totalQ: 20,
    target: 15,
    frogReason: '🗞️ LAST. Memory-based. CA is 8 Qs — biggest chunk. Cover Jan 2025–Jul 2026.',
    topics: PYQ_ANALYSIS.gk.topics,
  },
};

// ── 26-DAY EAT THE FROG PLAN ──────────────────────────────────
export const DAILY_PLAN = [
  // ═══ PHASE 1: MATHEMATICS (Jul 8–13) ═══════════════════════
  {
    date:'2026-07-08', day:1, phase:'math',
    title:'Day 1 — 🐸 Eat The Frog: Mathematics BEGINS',
    mantra:'Hardest first. Fresh brain + Math = Maximum retention. NO excuses.',
    topics:['M1','M2'],
    pyqInsight:'M1+M2 = 7 Qs expected. Together = 28% of your Math marks. Own these two today.',
    mock:false,
  },
  {
    date:'2026-07-09', day:2, phase:'math',
    title:'Day 2 — Percentage + Profit & Loss',
    mantra:'6 marks on the table. Percentage is in every section indirectly too.',
    topics:['M3','M4'],
    pyqInsight:'P&L appeared in ALL 3 exam years. In 2025-26 it was 3 Qs. Do NOT skip.',
    mock:false,
  },
  {
    date:'2026-07-10', day:3, phase:'math',
    title:'Day 3 — TSD + Time & Work',
    mantra:'5 marks. LCM method for T&W. Relative speed for TSD. Systems work.',
    topics:['M5','M6'],
    pyqInsight:'T&W: LCM method solves 90% of questions in under 60 seconds.',
    mock:false,
  },
  {
    date:'2026-07-11', day:4, phase:'math',
    title:'Day 4 — SI/CI + Ratio + Mensuration',
    mantra:'5 marks. Formulas only. Write them, memorize them, apply them.',
    topics:['M7','M8','M9'],
    pyqInsight:'Mensuration RISING — 3D shapes (cylinder, cone) appeared in 2025 exam.',
    mock:false,
  },
  {
    date:'2026-07-12', day:5, phase:'math',
    title:'Day 5 — Algebra + Statistics + Math Speed Drill',
    mantra:'2 more topics done. Then drill ALL 11 topics at exam speed.',
    topics:['M10','M11'],
    pyqInsight:'Statistics (DI) is the NEW trend from 2025-26 — 2 Qs expected. Do NOT ignore.',
    mock:true,
    mockLabel:'📝 Math Sectional Mock — 25Q / 22 min',
  },
  {
    date:'2026-07-13', day:6, phase:'math',
    title:'Day 6 — ✅ MATHEMATICS COMPLETE — Revision + Full Mock',
    mantra:'All 11 Math topics: DONE. Today: formula sheet + simulation.',
    topics:[],
    pyqInsight:'Target: 22/25. Attempt all 25, wrong max 3. Net = 22−1 = 21+ guaranteed.',
    mock:true,
    mockLabel:'📝 Full Math Simulation — 25Q / 22 min — Target: 22+',
    phaseComplete:true,
    phaseCompleteLabel:'📐 Mathematics',
  },

  // ═══ PHASE 2: REASONING (Jul 14–19) ════════════════════════
  {
    date:'2026-07-14', day:7, phase:'reasoning',
    title:'Day 7 — 🧠 Reasoning BEGINS: Series + Analogies',
    mantra:'30 marks section. HIGHEST marks. Start STRONG.',
    topics:['R1','R2'],
    pyqInsight:'Series+Analogies = 8 Qs EVERY year across all 3 exams. Easiest 8 marks in reasoning.',
    mock:false,
  },
  {
    date:'2026-07-15', day:8, phase:'reasoning',
    title:'Day 8 — Coding-Decoding + Blood Relations',
    mantra:'5 marks. Draw family trees. Try A+1 shift first for coding.',
    topics:['R3','R4'],
    pyqInsight:'Coding appeared 3 Qs in all 3 exams. Blood Relations: 2 Qs now (was 3 in 2018).',
    mock:false,
  },
  {
    date:'2026-07-16', day:9, phase:'reasoning',
    title:'Day 9 — Puzzles + Venn Diagrams',
    mantra:'7 marks. RISING difficulty. Practice speed — skip if 90+ sec.',
    topics:['R5','R6'],
    pyqInsight:'Puzzles JUMPED from 2 to 4 Qs (2018→2025). Seating arrangement must be mastered.',
    mock:false,
  },
  {
    date:'2026-07-17', day:10, phase:'reasoning',
    title:'Day 10 — Syllogism + Directions + Operations',
    mantra:'7 marks. All logic. Venn circle method for syllogism. Draw compass always.',
    topics:['R7','R8','R9'],
    pyqInsight:'Syllogism went from 2→3 Qs. Use Venn diagram method — fastest and most accurate.',
    mock:false,
  },
  {
    date:'2026-07-18', day:11, phase:'reasoning',
    title:'Day 11 — Classification + Mirror + Statement + Drill',
    mantra:'Finish last 3 topics. Then FULL reasoning speed drill.',
    topics:['R10','R11','R12'],
    pyqInsight:'Statement-Conclusion NEW in 2025 — 2 Qs expected. Do not skip this emerging topic.',
    mock:true,
    mockLabel:'📝 Reasoning Sectional Mock — 30Q / 25 min',
  },
  {
    date:'2026-07-19', day:12, phase:'reasoning',
    title:'Day 12 — ✅ REASONING COMPLETE — Revision + Full Mock',
    mantra:'All 12 Reasoning topics: DONE. Today: shortcut sheet + simulation.',
    topics:[],
    pyqInsight:'Target: 28/30. Reasoning is your HIGHEST scoring section. 28+ is very achievable.',
    mock:true,
    mockLabel:'📝 Full Reasoning Simulation — 30Q / 25 min — Target: 28+',
    phaseComplete:true,
    phaseCompleteLabel:'🧠 Reasoning',
  },

  // ═══ PHASE 3: GENERAL SCIENCE (Jul 20–24) ══════════════════
  {
    date:'2026-07-20', day:13, phase:'gs',
    title:'Day 13 — 🔬 Science BEGINS: Full Physics',
    mantra:'10 Physics marks. NCERT Class 10. Read → Write key facts → Solve.',
    topics:['P1','P2','P3'],
    pyqInsight:'Electricity (P1) = 3 Qs in ALL exams. V=IR, P=VI, series/parallel — memorize formulas.',
    mock:false,
  },
  {
    date:'2026-07-21', day:14, phase:'gs',
    title:'Day 14 — Light + Sound + Chemistry Begins',
    mantra:'Finish Physics. Begin Chemistry — 7 marks. High ROI topics.',
    topics:['P4','P5','C1'],
    pyqInsight:'Periodic Table (C1): Groups 1,2,17,18 + Transition metals. First 20 elements must-know.',
    mock:false,
  },
  {
    date:'2026-07-22', day:15, phase:'gs',
    title:'Day 15 — Full Chemistry Complete',
    mantra:'Finish Chemistry. Acids + Metals + Reactions = 5 marks. Fact-heavy.',
    topics:['C2','C3','C4'],
    pyqInsight:'Metals (C3): Reactivity series K>Na>Ca>Mg>Al>Zn>Fe>Sn>Pb>H>Cu>Ag>Au — must memorize.',
    mock:false,
  },
  {
    date:'2026-07-23', day:16, phase:'gs',
    title:'Day 16 — Full Biology Complete',
    mantra:'Body systems + Vitamins + Cell + Plants = 8 Biology marks.',
    topics:['B1','B2','B3','B4'],
    pyqInsight:'Vitamins (B2): appeared in EVERY exam. A→night blindness, C→scurvy, D→rickets, B12→anaemia.',
    mock:true,
    mockLabel:'📝 Science Sectional Mock — 25Q / 22 min',
  },
  {
    date:'2026-07-24', day:17, phase:'gs',
    title:'Day 17 — ✅ SCIENCE COMPLETE — Revision + Full Mock',
    mantra:'Physics + Chemistry + Biology: ALL DONE. 1-page fact sheet each.',
    topics:[],
    pyqInsight:'Science difficulty was MODERATE in 2025-26. 20/25 is very achievable with NCERT only.',
    mock:true,
    mockLabel:'📝 Full Science Simulation — 25Q / 22 min — Target: 20+',
    phaseComplete:true,
    phaseCompleteLabel:'🔬 General Science',
  },

  // ═══ PHASE 4: GK (Jul 25–27) ════════════════════════════════
  {
    date:'2026-07-25', day:18, phase:'gk',
    title:'Day 18 — 🌍 GK BEGINS: Current Affairs + History',
    mantra:'11 marks today. CA alone is 8 Qs. This is your last knowledge day.',
    topics:['G1','G2'],
    pyqInsight:'CA weight: 6→7→8 Qs across 2018→2022→2025. Biggest GK topic. Cover Jan 2025–Jul 2026.',
    mock:false,
  },
  {
    date:'2026-07-26', day:19, phase:'gk',
    title:'Day 19 — Geography + Polity + Economy',
    mantra:'7 marks. Static GK. Rivers, Articles, RBI — lock them in today.',
    topics:['G3','G4','G5'],
    pyqInsight:'Geography: Rivers+tributaries, National Parks, soil types — 3 Qs every single year.',
    mock:false,
  },
  {
    date:'2026-07-27', day:20, phase:'gk',
    title:'Day 20 — ✅ GK COMPLETE — Science & Tech + Full Mock',
    mantra:'Finish S&T. All 4 subjects DONE. 🎉 FULL simulation today.',
    topics:['G6'],
    pyqInsight:'S&T: ISRO missions (Chandrayaan-3, Aditya L1), DRDO, Vande Bharat — all expected.',
    mock:true,
    mockLabel:'📝 GK Mock — 20Q / 15 min',
    phaseComplete:true,
    phaseCompleteLabel:'🌍 GK & Current Affairs',
  },

  // ═══ PHASE 5: REVISION WEEK (Jul 28–Aug 2) ═════════════════
  {
    date:'2026-07-28', day:21, phase:'revision',
    title:'Day 21 — 🔄 FULL MOCK 1 — All 4 Subjects Combined',
    mantra:'First time combining all. Do not worry about score. Just simulate.',
    topics:[],
    pyqInsight:'Ideal attempt order: Reasoning→Math→Science→GK. Practice this order from today.',
    mock:true,
    mockLabel:'🔥 FULL MOCK 1 — 100Q / 90 min',
  },
  {
    date:'2026-07-29', day:22, phase:'revision',
    title:'Day 22 — FULL MOCK 2 + Weak Topic Deep Drill',
    mantra:'Compare Mock 1 vs 2. Find weak topic. Drill 30 questions of it.',
    topics:[],
    pyqInsight:'Track: which topic you got wrong most. That is your FROG for revision.',
    mock:true,
    mockLabel:'🔥 FULL MOCK 2 — 100Q / 90 min',
  },
  {
    date:'2026-07-30', day:23, phase:'revision',
    title:'Day 23 — FULL MOCK 3 + Science Facts Burn',
    mantra:'Mock 3. Then burn Science facts — vitamins, formulas, periodic table from memory.',
    topics:[],
    pyqInsight:'Science facts to memorize: Vitamin table, reactivity series, first 20 elements.',
    mock:true,
    mockLabel:'🔥 FULL MOCK 3 — 100Q / 90 min',
  },
  {
    date:'2026-07-31', day:24, phase:'revision',
    title:'Day 24 — FULL MOCK 4 + Error Pattern Analysis',
    mantra:'Compile errors from Mocks 1–4. Kill recurring mistakes. No mercy.',
    topics:[],
    pyqInsight:'Check: wrong due to concept gap OR silly mistake? Different fixes for each.',
    mock:true,
    mockLabel:'🔥 FULL MOCK 4 — 100Q / 90 min',
  },
  {
    date:'2026-08-01', day:25, phase:'revision',
    title:'Day 25 — ⚡ POWER MOCK 5 — Must Score 78+',
    mantra:'Best performance. 78+ = exam ready. 85+ = you are going to dominate.',
    topics:[],
    pyqInsight:'CEN 08/2024 ST cutoff was 63. Your target is 78. That is 15 marks of safety margin.',
    mock:true,
    mockLabel:'⚡ POWER MOCK 5 — 100Q / 90 min — TARGET: 78+',
  },
  {
    date:'2026-08-02', day:26, phase:'revision',
    title:'Day 26 — 🌙 EXAM EVE — Rest. Trust. Sleep.',
    mantra:'You have prepared 26 days. Nothing left to study. Only trust.',
    topics:[],
    pyqInsight:'Light 30Q warm-up only. Read shortcut sheet once. Sleep by 9:30 PM. Phone OFF.',
    mock:false,
    isEve:true,
  },
  {
    date:'2026-08-03', day:27, phase:'exam',
    title:'🏆 EXAM DAY — RRB Group D CBT',
    mantra:'This is why you gave 26 days of blood. Walk in. Execute. WIN.',
    topics:[],
    pyqInsight:'Order: Reasoning first (28/30 target) → Math → Science → GK. Arrive 45 min early.',
    mock:false,
    isExam:true,
  },
];
