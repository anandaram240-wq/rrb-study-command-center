import { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  AreaChart, Area, LineChart, Line, Legend,
} from 'recharts';
import {
  MATH_WEIGHTAGE, REASONING_WEIGHTAGE, SCIENCE_WEIGHTAGE,
  GK_WEIGHTAGE, TOPPER_STRATEGIES, PRIORITY_MATRIX
} from '../data/weightageData';
import styles from './WeightageAnalysis.module.css';

const YEARS = ['2014','2015','2016','2018','2019','2022','2023','2024'];

const TAB_META = {
  math:      { label: '📐 Mathematics',   color: '#7c6dfa', data: MATH_WEIGHTAGE },
  reasoning: { label: '🧠 Reasoning',     color: '#00d4ff', data: REASONING_WEIGHTAGE },
  science:   { label: '🔬 Science',       color: '#00e676', data: SCIENCE_WEIGHTAGE },
  gk:        { label: '🌍 GK & CA',       color: '#ffc107', data: GK_WEIGHTAGE },
};

const PRIORITY_COLOR = { HIGH: '#ff4757', MED: '#ffc107', LOW: '#64748b', 'HIGHEST': '#f850a6' };

// Custom tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className={styles.tooltip}>
        <div className={styles.tooltipLabel}>{label}</div>
        {payload.map((p, i) => (
          <div key={i} style={{ color: p.color, fontSize: '0.8rem' }}>
            {p.name}: <strong>{p.value} Q</strong>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// Convert topic year data to chart format
function getTopicTrendData(topic) {
  return YEARS.map(yr => ({ year: yr, questions: topic.yearData[yr] || 0 }));
}

// Get all topics as bar chart data (avg questions per topic)
function getSubjectBarData(data) {
  return data.map(t => ({
    name: t.topic.length > 20 ? t.topic.slice(0, 18) + '…' : t.topic,
    fullName: t.topic,
    avg: t.avgQ,
    color: t.color,
    priority: t.priority,
  }));
}

// Priority matrix radar data
const RADAR_DATA = [
  { subject: 'Reasoning', score: 30, possible: 30 },
  { subject: 'Math',      score: 25, possible: 25 },
  { subject: 'Science',   score: 25, possible: 25 },
  { subject: 'GK',        score: 20, possible: 20 },
];

function PriorityMatrixCard() {
  return (
    <div className={styles.matrixGrid}>
      {PRIORITY_MATRIX.map((s, i) => (
        <div key={i} className={styles.matrixCard} style={{ '--c': s.color }}>
          <div className={styles.matrixTop}>
            <div className={styles.matrixSubj} style={{ color: s.color }}>{s.subject}</div>
            <div className={styles.matrixROI} style={{
              background: s.roi === 'HIGHEST' ? 'rgba(248,80,166,0.15)' : s.roi === 'HIGH' ? 'rgba(255,71,87,0.12)' : 'rgba(255,193,7,0.12)',
              color: s.roi === 'HIGHEST' ? '#f850a6' : s.roi === 'HIGH' ? '#ff4757' : '#ffc107',
            }}>
              {s.roi} ROI
            </div>
          </div>
          <div className={styles.matrixRow}>
            <span>Max Questions</span>
            <span style={{ color: s.color, fontWeight: 700 }}>{s.questions}</span>
          </div>
          <div className={styles.matrixRow}>
            <span>Avg Topper Score</span>
            <span style={{ color: '#00e676', fontWeight: 700 }}>{s.avgScore}/{s.questions}</span>
          </div>
          <div className={styles.matrixRow}>
            <span>Daily Investment</span>
            <span style={{ color: '#fff' }}>{s.timeInvest}</span>
          </div>
          <div className={styles.matrixBar}>
            <div className={styles.matrixFill} style={{
              width: `${(s.avgScore / s.questions) * 100}%`,
              background: s.color,
            }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function TopicCard({ topic, color }) {
  const [expanded, setExpanded] = useState(false);
  const trendData = getTopicTrendData(topic);
  return (
    <div className={styles.topicCard} style={{ '--c': color }}>
      <div className={styles.topicHeader} onClick={() => setExpanded(e => !e)}>
        <div className={styles.topicLeft}>
          <span className={styles.topicPriority} style={{ color: PRIORITY_COLOR[topic.priority] }}>
            {topic.priority}
          </span>
          <span className={styles.topicName}>{topic.topic}</span>
          {topic.subject && <span className={styles.topicSubj}>{topic.subject}</span>}
        </div>
        <div className={styles.topicRight}>
          <span className={styles.topicAvg} style={{ color }}>~{topic.avgQ} Q</span>
          <span className={`${styles.chevron} ${expanded ? styles.open : ''}`}>▾</span>
        </div>
      </div>

      {/* Mini trend bar */}
      <div className={styles.trendBars}>
        {YEARS.map(yr => {
          const q = topic.yearData[yr] || 0;
          const maxQ = Math.max(...Object.values(topic.yearData));
          return (
            <div key={yr} className={styles.trendBarWrap}>
              <div className={styles.trendBarCol}>
                <div className={styles.trendBarFill} style={{
                  height: `${(q / Math.max(maxQ, 5)) * 36}px`,
                  background: color,
                  opacity: q > 0 ? 1 : 0.2,
                }} />
              </div>
              <span className={styles.trendYr}>{yr.slice(2)}</span>
            </div>
          );
        })}
        <div className={styles.trendLabel}>Years →</div>
      </div>

      {expanded && (
        <div className={styles.topicDetails}>
          <div className={styles.detailSection}>
            <div className={styles.detailTitle} style={{ color }}>Key Subtopics</div>
            <div className={styles.tagRow}>
              {(topic.keySubtopics || topic.keyFacts || []).map((k, i) => (
                <span key={i} className={styles.tag} style={{ borderColor: color + '44', color }}>{k}</span>
              ))}
            </div>
          </div>
          {(topic.shortcuts) && (
            <div className={styles.detailSection}>
              <div className={styles.detailTitle} style={{ color: '#00e676' }}>⚡ Shortcuts / Tips</div>
              {topic.shortcuts.map((s, i) => (
                <div key={i} className={styles.shortcut}>→ {s}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TopperCard({ t }) {
  return (
    <div className={styles.topperCard} style={{ '--c': t.color }}>
      <div className={styles.topperTop}>
        <span className={styles.topperIcon}>{t.icon}</span>
        <div>
          <div className={styles.topperName} style={{ color: t.color }}>{t.name}</div>
          <div className={styles.topperExam}>{t.exam}</div>
          {t.score && <div className={styles.topperScore}>Score: <strong style={{ color: '#00e676' }}>{t.score}/100</strong></div>}
        </div>
      </div>
      <div className={styles.topperStrategy}>{t.strategy}</div>
      <div className={styles.topperMeta}>
        <div className={styles.topperRow}><span>Mock Frequency:</span><span style={{ color: t.color }}>{t.mockFreq}</span></div>
        <div className={styles.topperRow}><span>Attempt Order:</span><span style={{ color: '#fff' }}>{t.subjectOrder.join(' → ')}</span></div>
      </div>
      <div className={styles.topperTip}>
        <span className={styles.tipIcon}>💡</span> {t.keyTip}
      </div>
    </div>
  );
}

export default function WeightageAnalysis() {
  const [activeTab, setActiveTab] = useState('math');
  const [activeView, setActiveView] = useState('topics'); // topics | toppers | matrix

  const tabData = TAB_META[activeTab];
  const barData = getSubjectBarData(tabData.data);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>📊 10-Year Deep Weightage Analysis</h2>
        <p className={styles.sub}>Based on RRB Group D PYQ Analysis 2014–2024 · Research from Adda247, Oliveboard, Cracku, Testbook</p>
      </div>

      {/* View tabs */}
      <div className={styles.viewTabs}>
        {[
          { id: 'topics', label: '📈 Topic Analysis' },
          { id: 'matrix', label: '🎯 Priority Matrix' },
          { id: 'toppers', label: '🏆 Topper Strategies' },
        ].map(v => (
          <button
            key={v.id}
            className={`${styles.viewTab} ${activeView === v.id ? styles.viewTabActive : ''}`}
            onClick={() => setActiveView(v.id)}
          >
            {v.label}
          </button>
        ))}
      </div>

      {activeView === 'matrix' && (
        <div>
          <div className={styles.sectionHead}>Subject ROI Matrix — Where to invest your time</div>
          <PriorityMatrixCard />

          {/* Overall radar */}
          <div className={styles.radarWrap}>
            <div className={styles.radarTitle}>Target Score Distribution</div>
            <ResponsiveContainer width="100%" height={260}>
              <RadarChart data={[
                { s: 'Reasoning', target: 28, cutoff: 12 },
                { s: 'Math',      target: 22, cutoff: 10 },
                { s: 'Science',   target: 20, cutoff: 10 },
                { s: 'GK',        target: 16, cutoff: 8  },
              ]}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis dataKey="s" tick={{ fill: 'rgba(238,238,255,0.6)', fontSize: 12 }} />
                <PolarRadiusAxis angle={30} domain={[0, 30]} tick={{ fill: 'rgba(238,238,255,0.3)', fontSize: 10 }} />
                <Radar name="Your Target" dataKey="target" stroke="#00e676" fill="#00e676" fillOpacity={0.2} />
                <Radar name="ST Cutoff Zone" dataKey="cutoff" stroke="#ff4757" fill="#ff4757" fillOpacity={0.15} />
                <Legend wrapperStyle={{ color: 'rgba(238,238,255,0.6)', fontSize: '0.75rem' }} />
                <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10 }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeView === 'topics' && (
        <>
          {/* Subject tabs */}
          <div className={styles.subjectTabs}>
            {Object.entries(TAB_META).map(([key, meta]) => (
              <button
                key={key}
                className={`${styles.subTab} ${activeTab === key ? styles.subTabActive : ''}`}
                style={activeTab === key ? { borderColor: meta.color, color: meta.color } : {}}
                onClick={() => setActiveTab(key)}
              >
                {meta.label}
              </button>
            ))}
          </div>

          {/* Bar chart */}
          <div className={styles.chartBox}>
            <div className={styles.chartTitle} style={{ color: tabData.color }}>
              Average Questions Per Topic — Across All Exam Years
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={barData} margin={{ top: 5, right: 20, left: 0, bottom: 60 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: 'rgba(238,238,255,0.5)', fontSize: 10 }}
                  angle={-35}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis tick={{ fill: 'rgba(238,238,255,0.4)', fontSize: 10 }} domain={[0, 6]} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="avg" name="Avg Q" radius={[4, 4, 0, 0]}>
                  {barData.map((entry, i) => (
                    <rect key={i} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Topic cards with trends */}
          <div className={styles.topicsGrid}>
            {tabData.data.map((t, i) => (
              <TopicCard key={i} topic={t} color={tabData.color} />
            ))}
          </div>
        </>
      )}

      {activeView === 'toppers' && (
        <div className={styles.toppersGrid}>
          {TOPPER_STRATEGIES.map((t, i) => (
            <TopperCard key={i} t={t} />
          ))}
        </div>
      )}
    </section>
  );
}
