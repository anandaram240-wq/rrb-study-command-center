import styles from './Roadmap.module.css';

const PHASES = [
  {
    id: 1,
    emoji: '🔥',
    label: 'Phase 1',
    name: 'DS CIE-1 Blitz',
    dates: 'Jul 8–12',
    days: 5,
    color: '#ff4757',
    tasks: ['Arrays, Stacks, Postfix', 'Linked Lists (SLL, DLL, CLL)', 'Queues, Recursion, Hashing', '+ RRB Math & Reasoning daily'],
    active: true,
  },
  {
    id: 2,
    emoji: '🎓',
    label: 'CIE 1',
    name: 'DS CIE 1 Exam',
    dates: 'Jul 13–15',
    days: 3,
    color: '#ffc107',
    tasks: ['CIE 1 Exam (Mod 1+2)', 'Start DS Module 3 after exam', 'RRB daily practice continues'],
    active: false,
  },
  {
    id: 3,
    emoji: '⚡',
    label: 'Phase 2',
    name: 'DS CIE-2 Blitz',
    dates: 'Jul 16–22',
    days: 7,
    color: '#7c6dfa',
    tasks: ['Binary Trees, BST, AVL, Heap', 'Graphs: BFS, DFS, Dijkstra', 'MST (Prim, Kruskal)', 'All Sorting Algorithms', '+ RRB Mocks daily'],
    active: false,
  },
  {
    id: 4,
    emoji: '🎓',
    label: 'CIE 2',
    name: 'DS CIE 2 Exam',
    dates: 'Jul 23–25',
    days: 3,
    color: '#00d4ff',
    tasks: ['CIE 2 Exam (Mod 3+4)', 'RRB Full Mocks', 'Semester Freeze: Jul 27'],
    active: false,
  },
  {
    id: 5,
    emoji: '🚀',
    label: 'Phase 3',
    name: 'RRB FINAL BLITZ',
    dates: 'Jul 26 – Aug 2',
    days: 8,
    color: '#00e676',
    tasks: ['100% RRB — no DS', '14 Full Mock Tests', 'Math + Reasoning speed drills', 'Science + GK deep revision', 'Error analysis & fix'],
    active: false,
  },
  {
    id: 6,
    emoji: '🏆',
    label: 'EXAM',
    name: 'RRB Group D Exam',
    dates: 'Aug 3–21',
    days: 19,
    color: '#f850a6',
    tasks: ['Exam Window: Aug 3–21', 'Attempt 85–90 Q', 'Reasoning first (highest ROI)', 'ST Target: 78+ ✓'],
    active: false,
  },
];

const EXAM_STRATEGY = [
  {
    subject: 'General Intelligence & Reasoning',
    q: 30,
    time: '28 min',
    target: '28/30',
    tip: 'Attempt FIRST — Pure logic, no memory needed. Highest scorer subject.',
    color: '#00d4ff',
    pct: 30,
  },
  {
    subject: 'Mathematics',
    q: 25,
    time: '23 min',
    target: '22/25',
    tip: 'Attempt SECOND — Use shortcut formulas. Skip and return to lengthy Qs.',
    color: '#7c6dfa',
    pct: 25,
  },
  {
    subject: 'General Science',
    q: 25,
    time: '22 min',
    target: '20/25',
    tip: 'Attempt THIRD — Focus Physics & Biology. Skip uncertain Chemistry Qs.',
    color: '#00e676',
    pct: 25,
  },
  {
    subject: 'General Awareness',
    q: 20,
    time: '17 min',
    target: '15/20',
    tip: 'Attempt LAST — Don\'t guess blindly (–⅓). Only attempt if 80% sure.',
    color: '#ffc107',
    pct: 20,
  },
];

export default function Roadmap() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>🗺️ Iron-Strong Roadmap</h2>
        <p className={styles.sub}>Jul 8 → CIE 1 (Jul 13) → CIE 2 (Jul 23) → RRB GROUP D (Aug 3) — No Compromise</p>
      </div>

      {/* Phase timeline */}
      <div className={styles.phaseWrap}>
        {PHASES.map((phase, i) => (
          <div key={phase.id} className={`${styles.phaseCard} ${phase.active ? styles.phaseActive : ''}`} style={{ '--c': phase.color }}>
            <div className={styles.phaseTop}>
              <div className={styles.phaseEmoji}>{phase.emoji}</div>
              <div>
                <div className={styles.phaseBadge} style={{ color: phase.color }}>{phase.label} · {phase.days}d</div>
                <div className={styles.phaseName}>{phase.name}</div>
                <div className={styles.phaseDates}>{phase.dates}</div>
              </div>
              {phase.active && <span className={styles.activePill}>YOU ARE HERE</span>}
            </div>
            <ul className={styles.phaseList}>
              {phase.tasks.map((t, j) => (
                <li key={j}>{t}</li>
              ))}
            </ul>
            {i < PHASES.length - 1 && (
              <div className={styles.arrow}>→</div>
            )}
          </div>
        ))}
      </div>

      {/* Exam Strategy */}
      <div className={styles.stratHeader}>
        <h3 className={styles.stratTitle}>⚡ RRB Exam Day Strategy — Attempt Order</h3>
        <p className={styles.stratSub}>Total: 100 Questions · 90 Minutes · Negative: –⅓ · ST Safe Score: 78+</p>
      </div>

      <div className={styles.stratGrid}>
        {EXAM_STRATEGY.map((s, i) => (
          <div key={i} className={styles.stratCard} style={{ '--c': s.color }}>
            <div className={styles.stratOrder} style={{ background: s.color }}>{i + 1}</div>
            <div className={styles.stratRight}>
              <div className={styles.stratSubj} style={{ color: s.color }}>{s.subject}</div>
              <div className={styles.stratMeta}>{s.q} Questions · {s.time} · Target: {s.target}</div>
              <div className={styles.stratTip}>{s.tip}</div>
              <div className={styles.stratBar}>
                <div className={styles.stratFill} style={{ width: `${s.pct * 3}%`, background: s.color }} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cutoff box */}
      <div className={styles.cutoffWrap}>
        <div className={styles.cutoffCard}>
          <div className={styles.cutIcon}>📊</div>
          <div className={styles.cutTitle}>RRB Group D ST Cut-offs (Previous Years)</div>
          <div className={styles.cutGrid}>
            <div className={styles.cutItem}><span>Official ST Cut-off</span><span style={{ color: '#ff4757' }}>~40/100</span></div>
            <div className={styles.cutItem}><span>General Cut-off</span><span style={{ color: '#ffc107' }}>~77/100</span></div>
            <div className={styles.cutItem}><span>YOUR Safe Target</span><span style={{ color: '#00e676' }}>78+/100</span></div>
            <div className={styles.cutItem}><span>POWER Target</span><span style={{ color: '#7c6dfa' }}>85+/100</span></div>
            <div className={styles.cutItem}><span>Negative Marking</span><span style={{ color: '#ff6b35' }}>–⅓ per wrong</span></div>
            <div className={styles.cutItem}><span>Attempt Target</span><span style={{ color: '#00d4ff' }}>85–90 Q</span></div>
          </div>
        </div>
        <div className={styles.cutoffCard}>
          <div className={styles.cutIcon}>⚡</div>
          <div className={styles.cutTitle}>10 Iron Rules — No Compromise</div>
          <ol className={styles.ruleList}>
            <li>Wake at 5:30 AM every single day</li>
            <li>13 hours study — no phone during sessions</li>
            <li>Morning = hardest topics (brain is fresh)</li>
            <li>Mock test every evening — analyze every wrong Q</li>
            <li>Don't guess in exam if less than 80% sure</li>
            <li>Reasoning first in exam — highest ROI</li>
            <li>Math: use shortcut formulas only (no long methods)</li>
            <li>Sleep 7 hrs minimum — sleep = memory consolidation</li>
            <li>Track mock scores daily — aim 78+ by Jul 25</li>
            <li>Exam day: arrive 1 hr early, stay calm, trust prep</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
