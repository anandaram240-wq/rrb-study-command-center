import { RRB_SUBJECTS } from '../data/studyData';
import { RadialBarChart, RadialBar, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import styles from './SubjectWeightage.module.css';

const PIE_DATA = RRB_SUBJECTS.map(s => ({ name: s.name.split('&')[0].trim(), value: s.questions, color: s.color }));

const WEIGHT_ICON = { high: '🔴', med: '🟡', low: '🟢' };

function TopicRow({ topic, color }) {
  const pct = Math.round((topic.q / 5) * 100);
  return (
    <div className={styles.topicRow}>
      <span className={styles.topicDot} style={{ background: color }} />
      <span className={styles.topicName}>{topic.name}</span>
      <span className={styles.topicWeight}>{WEIGHT_ICON[topic.weight]}</span>
      <span className={styles.topicQ} style={{ color }}>{topic.q}Q</span>
      <div className={styles.miniTrack}>
        <div className={styles.miniFill} style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

function SubjectCard({ subj }) {
  const pct = Math.round((subj.questions / 100) * 100);
  return (
    <div className={styles.card}>
      <div className={styles.cardTop} style={{ '--color': subj.color }}>
        <div className={styles.topLeft}>
          <span className={styles.icon}>{subj.icon}</span>
          <div>
            <div className={styles.name}>{subj.name}</div>
            <div className={styles.meta}>{subj.questions} Questions · {pct}% of paper</div>
          </div>
        </div>
        <span
          className={styles.badge}
          style={{
            background: subj.priority === 'HIGH' ? 'rgba(255,71,87,0.15)' : 'rgba(255,193,7,0.15)',
            color: subj.priority === 'HIGH' ? '#ff4757' : '#ffc107',
            border: `1px solid ${subj.priority === 'HIGH' ? 'rgba(255,71,87,0.3)' : 'rgba(255,193,7,0.3)'}`,
          }}
        >
          {subj.priority}
        </span>
      </div>
      <div className={styles.barWrap}>
        <div className={styles.barTrack}>
          <div
            className={styles.barFill}
            style={{ width: `${pct}%`, background: subj.gradient }}
          />
        </div>
        <span className={styles.barNum} style={{ color: subj.color }}>{subj.questions}/100</span>
      </div>
      <div className={styles.topics}>
        {subj.topics.map(t => <TopicRow key={t.name} topic={t} color={subj.color} />)}
      </div>
    </div>
  );
}

function CustomTooltip({ active, payload }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: '#111', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 10, padding: '8px 14px' }}>
        <div style={{ color: payload[0].payload.color, fontWeight: 700, fontSize: '0.85rem' }}>{payload[0].name}</div>
        <div style={{ color: '#eee', fontSize: '0.8rem' }}>{payload[0].value} Questions</div>
      </div>
    );
  }
  return null;
}

export default function SubjectWeightage() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>📊 RRB Group D — Subject Weightage</h2>
        <p className={styles.sub}>100 Questions · 90 Minutes · Negative Marking: –⅓</p>
      </div>

      {/* Pie Overview */}
      <div className={styles.overviewWrap}>
        <div className={styles.pieBox}>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={PIE_DATA}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={3}
                dataKey="value"
              >
                {PIE_DATA.map((d, i) => (
                  <Cell key={i} fill={d.color} stroke="transparent" />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className={styles.pieCenter}>
            <div className={styles.pieBig}>100</div>
            <div className={styles.pieSmall}>Total Q</div>
          </div>
        </div>
        <div className={styles.legend}>
          {RRB_SUBJECTS.map(s => (
            <div key={s.id} className={styles.legendItem}>
              <span className={styles.legendDot} style={{ background: s.color }} />
              <span className={styles.legendName}>{s.name}</span>
              <span className={styles.legendQ} style={{ color: s.color }}>{s.questions}Q</span>
            </div>
          ))}
          <div className={styles.cutoffBox}>
            <div className={styles.cutoffTitle}>ST Category Cut-offs</div>
            <div className={styles.cutoffRow}><span>Official Cut-off</span><span className={styles.cutRed}>40/100</span></div>
            <div className={styles.cutoffRow}><span>Your Safe Target</span><span className={styles.cutGreen}>78+/100</span></div>
            <div className={styles.cutoffRow}><span>Negative Marking</span><span className={styles.cutAmber}>–⅓ / Wrong</span></div>
          </div>
        </div>
      </div>

      {/* Subject Cards */}
      <div className={styles.cards}>
        {RRB_SUBJECTS.map(s => <SubjectCard key={s.id} subj={s} />)}
      </div>
    </section>
  );
}
