import { useState } from 'react';
import { useLocalStorage } from '../hooks/useStudy';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import styles from './MockTracker.module.css';

const SUBJECTS = ['Math (25)', 'Reasoning (30)', 'Science (25)', 'GK (20)'];
const SUBJECT_KEYS = ['math', 'reasoning', 'science', 'gk'];
const SUBJECT_COLORS = { math: '#7c6dfa', reasoning: '#00d4ff', science: '#00e676', gk: '#ffc107' };
const SUBJECT_MAX = { math: 25, reasoning: 30, science: 25, gk: 20 };

const EMPTY_MOCK = { date: '', math: '', reasoning: '', science: '', gk: '', attempted: '', wrong: '', notes: '' };

function calcScore(m) {
  const correct = (Number(m.math)||0) + (Number(m.reasoning)||0) + (Number(m.science)||0) + (Number(m.gk)||0);
  const wrong = Number(m.wrong) || 0;
  return +(correct - wrong * (1/3)).toFixed(2);
}

function ScoreBadge({ score }) {
  const color = score >= 78 ? '#00e676' : score >= 65 ? '#ffc107' : '#ff4757';
  return <span style={{ color, fontWeight: 800, fontFamily: 'JetBrains Mono, monospace', fontSize: '1.1rem' }}>{score}</span>;
}

export default function MockTracker() {
  const [mocks, setMocks] = useLocalStorage('mock-tracker', []);
  const [form, setForm] = useState(EMPTY_MOCK);
  const [adding, setAdding] = useState(false);

  const submit = () => {
    if (!form.date) return;
    const score = calcScore(form);
    setMocks([...mocks, { ...form, score, id: Date.now() }]);
    setForm(EMPTY_MOCK);
    setAdding(false);
  };

  const deleteMock = (id) => setMocks(mocks.filter(m => m.id !== id));

  const chartData = mocks.map((m, i) => ({
    name: `M${i + 1}`,
    score: m.score,
    math: Number(m.math) || 0,
    reasoning: Number(m.reasoning) || 0,
    science: Number(m.science) || 0,
    gk: Number(m.gk) || 0,
    date: m.date,
  }));

  const avgScore = mocks.length > 0 ? +(mocks.reduce((a, b) => a + b.score, 0) / mocks.length).toFixed(1) : 0;
  const bestScore = mocks.length > 0 ? Math.max(...mocks.map(m => m.score)) : 0;
  const trend = mocks.length >= 2 ? mocks[mocks.length-1].score - mocks[mocks.length-2].score : 0;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>📈 Mock Test Score Tracker</h2>
          <p className={styles.sub}>Log every mock test · Track your trend · ST Target: 78+ · Power Target: 85+</p>
        </div>
        <button className={styles.addBtn} onClick={() => setAdding(a => !a)}>
          {adding ? '✕ Cancel' : '+ Add Mock'}
        </button>
      </div>

      {/* Summary stats */}
      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: '#7c6dfa' }}>{mocks.length}</div>
          <div className={styles.statLbl}>Mocks Done</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: avgScore >= 78 ? '#00e676' : '#ffc107' }}>{avgScore}</div>
          <div className={styles.statLbl}>Avg Score</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: '#00e676' }}>{bestScore}</div>
          <div className={styles.statLbl}>Best Score</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: trend >= 0 ? '#00e676' : '#ff4757' }}>
            {trend >= 0 ? '+' : ''}{trend.toFixed(1)}
          </div>
          <div className={styles.statLbl}>Last Trend</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: '#ffc107' }}>78+</div>
          <div className={styles.statLbl}>ST Safe Target</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNum} style={{ color: '#f850a6' }}>85+</div>
          <div className={styles.statLbl}>Power Target</div>
        </div>
      </div>

      {/* Add form */}
      {adding && (
        <div className={styles.formBox}>
          <div className={styles.formTitle}>Log New Mock Test</div>
          <div className={styles.formGrid}>
            <label className={styles.formField}>
              <span>Date</span>
              <input type="date" value={form.date} onChange={e => setForm(f=>({...f, date: e.target.value}))} className={styles.input} />
            </label>
            {SUBJECT_KEYS.map((key, i) => (
              <label key={key} className={styles.formField}>
                <span style={{ color: SUBJECT_COLORS[key] }}>{SUBJECTS[i]} correct</span>
                <input
                  type="number" min="0" max={SUBJECT_MAX[key]}
                  value={form[key]}
                  onChange={e => setForm(f=>({...f, [key]: e.target.value}))}
                  className={styles.input}
                  placeholder={`0–${SUBJECT_MAX[key]}`}
                />
              </label>
            ))}
            <label className={styles.formField}>
              <span>Total Attempted</span>
              <input type="number" min="0" max="100" value={form.attempted} onChange={e=>setForm(f=>({...f,attempted:e.target.value}))} className={styles.input} placeholder="0–100" />
            </label>
            <label className={styles.formField}>
              <span>Wrong Answers</span>
              <input type="number" min="0" max="100" value={form.wrong} onChange={e=>setForm(f=>({...f,wrong:e.target.value}))} className={styles.input} placeholder="count" />
            </label>
          </div>
          <label className={styles.formField} style={{padding:'0 16px 4px'}}>
            <span>Notes / Key mistakes</span>
            <textarea value={form.notes} onChange={e=>setForm(f=>({...f,notes:e.target.value}))} className={`${styles.input} ${styles.textarea}`} rows={2} placeholder="What went wrong? What to fix?" />
          </label>
          <div className={styles.formActions}>
            <div className={styles.previewScore}>
              Preview Score: <strong style={{color: calcScore(form)>=78?'#00e676':'#ffc107'}}>{calcScore(form).toFixed(1)}/100</strong>
            </div>
            <button className={styles.submitBtn} onClick={submit}>Save Mock Test</button>
          </div>
        </div>
      )}

      {/* Chart */}
      {mocks.length > 0 && (
        <div className={styles.chartBox}>
          <div className={styles.chartTitle}>Score Trend</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" tick={{ fill: 'rgba(238,238,255,0.5)', fontSize: 11 }} />
              <YAxis domain={[0, 100]} tick={{ fill: 'rgba(238,238,255,0.4)', fontSize: 10 }} />
              <Tooltip contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, fontSize: '0.8rem' }} />
              <ReferenceLine y={78} stroke="#00e676" strokeDasharray="5 3" label={{ value: 'ST Safe 78', fill: '#00e676', fontSize: 10 }} />
              <ReferenceLine y={85} stroke="#f850a6" strokeDasharray="5 3" label={{ value: 'Power 85', fill: '#f850a6', fontSize: 10 }} />
              <Line type="monotone" dataKey="score" stroke="#7c6dfa" strokeWidth={2.5} dot={{ fill: '#7c6dfa', r: 4 }} name="Total Score" />
              <Line type="monotone" dataKey="reasoning" stroke="#00d4ff" strokeWidth={1.5} dot={false} name="Reasoning" />
              <Line type="monotone" dataKey="math" stroke="#7c6dfa" strokeWidth={1} strokeDasharray="4 2" dot={false} name="Math" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Mock log table */}
      {mocks.length > 0 ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th style={{color:'#00d4ff'}}>Rsng</th>
                <th style={{color:'#7c6dfa'}}>Math</th>
                <th style={{color:'#00e676'}}>Sci</th>
                <th style={{color:'#ffc107'}}>GK</th>
                <th>Wrong</th>
                <th>Score</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {mocks.map((m, i) => (
                <tr key={m.id} className={m.score >= 78 ? styles.rowGood : m.score >= 65 ? styles.rowWarn : styles.rowBad}>
                  <td>{i + 1}</td>
                  <td>{m.date}</td>
                  <td>{m.reasoning || '—'}</td>
                  <td>{m.math || '—'}</td>
                  <td>{m.science || '—'}</td>
                  <td>{m.gk || '—'}</td>
                  <td style={{color:'#ff4757'}}>{m.wrong || 0}</td>
                  <td><ScoreBadge score={m.score} /></td>
                  <td>
                    <span className={styles.statusBadge} style={{
                      background: m.score>=78?'rgba(0,230,118,0.15)':m.score>=65?'rgba(255,193,7,0.15)':'rgba(255,71,87,0.15)',
                      color: m.score>=78?'#00e676':m.score>=65?'#ffc107':'#ff4757',
                    }}>
                      {m.score>=85?'🏆 Power':m.score>=78?'✅ Safe':m.score>=65?'⚡ Close':'⚠️ Low'}
                    </span>
                  </td>
                  <td><button className={styles.delBtn} onClick={()=>deleteMock(m.id)}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.empty}>
          <div>📝</div>
          <div>No mocks logged yet. Add your first mock test above.</div>
          <div style={{color:'rgba(238,238,255,0.4)',fontSize:'0.78rem',marginTop:6}}>You should be doing at least 2 mocks per week.</div>
        </div>
      )}
    </section>
  );
}
