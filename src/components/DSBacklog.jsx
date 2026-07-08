import { useState } from 'react';
import { DS_MODULES } from '../data/studyData';
import { useLocalStorage } from '../hooks/useStudy';
import styles from './DSBacklog.module.css';

function TopicCheckbox({ topic, checked, onChange, color }) {
  return (
    <label className={`${styles.topicItem} ${checked ? styles.done : ''}`}>
      <input
        type="checkbox"
        className={styles.hidden}
        checked={checked}
        onChange={() => onChange(topic.id)}
      />
      <span className={styles.check} style={{ '--color': color }}>
        {checked && (
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path d="M2 5l2.5 2.5L8 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      <span className={styles.topicText}>{topic.text}</span>
      {checked && <span className={styles.tick}>✓</span>}
    </label>
  );
}

function ModuleCard({ mod, checked, onToggle }) {
  const [open, setOpen] = useState(true);
  const completedCount = mod.topics.filter(t => checked[t.id]).length;
  const pct = Math.round((completedCount / mod.topics.length) * 100);

  return (
    <div className={styles.card} style={{ '--color': mod.color }}>
      <div className={styles.cardHeader} onClick={() => setOpen(o => !o)}>
        <div className={styles.headerLeft}>
          <div className={styles.modNum} style={{ background: mod.color }}>M{mod.number}</div>
          <div>
            <div className={styles.modName}>{mod.name}</div>
            <div className={styles.modMeta}>
              <span className={styles.examTag} style={{
                background: mod.exam === 'CIE 1' ? 'rgba(255,71,87,0.15)' : 'rgba(124,109,250,0.15)',
                color: mod.exam === 'CIE 1' ? '#ff4757' : '#7c6dfa',
              }}>{mod.exam}</span>
              <span className={styles.countText}>{completedCount}/{mod.topics.length} done</span>
            </div>
          </div>
        </div>
        <div className={styles.headerRight}>
          <div className={styles.pctCircle} style={{ '--pct': pct, '--color': mod.color }}>
            <span className={styles.pctNum}>{pct}%</span>
          </div>
          <span className={`${styles.chevron} ${open ? styles.open : ''}`}>▾</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className={styles.progWrap}>
        <div className={styles.progTrack}>
          <div className={styles.progFill} style={{ width: `${pct}%`, background: mod.color }} />
        </div>
      </div>

      {/* Topics */}
      {open && (
        <div className={styles.topics}>
          {mod.topics.map(t => (
            <TopicCheckbox
              key={t.id}
              topic={t}
              checked={!!checked[t.id]}
              onChange={onToggle}
              color={mod.color}
            />
          ))}
          {pct === 100 && (
            <div className={styles.doneMsg}>🎉 Module Complete! Ready for exam.</div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DSBacklog() {
  const [checked, setChecked] = useLocalStorage('ds-checklist', {});

  const toggle = (id) => {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allTopics = DS_MODULES.flatMap(m => m.topics);
  const totalDone = allTopics.filter(t => checked[t.id]).length;
  const overallPct = Math.round((totalDone / allTopics.length) * 100);

  const cie1Topics = DS_MODULES.filter(m => m.exam === 'CIE 1').flatMap(m => m.topics);
  const cie2Topics = DS_MODULES.filter(m => m.exam === 'CIE 2').flatMap(m => m.topics);
  const cie1Done = cie1Topics.filter(t => checked[t.id]).length;
  const cie2Done = cie2Topics.filter(t => checked[t.id]).length;

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>💾 DS Backlog — 24CS304 Modules 1–4</h2>
        <p className={styles.sub}>MCE Hassan · Check off each topic as you complete it</p>
      </div>

      {/* Overall progress */}
      <div className={styles.overallBox}>
        <div className={styles.overallLeft}>
          <div className={styles.overallTitle}>Overall Progress</div>
          <div className={styles.overallBar}>
            <div className={styles.overallFill} style={{ width: `${overallPct}%` }} />
          </div>
          <div className={styles.overallSub}>{totalDone} of {allTopics.length} topics completed</div>
        </div>
        <div className={styles.overallStats}>
          <div className={styles.statBox}>
            <div className={styles.statNum} style={{ color: '#ff4757' }}>
              {cie1Done}/{cie1Topics.length}
            </div>
            <div className={styles.statLabel}>CIE 1 Topics</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum} style={{ color: '#7c6dfa' }}>
              {cie2Done}/{cie2Topics.length}
            </div>
            <div className={styles.statLabel}>CIE 2 Topics</div>
          </div>
          <div className={styles.statBox}>
            <div className={styles.statNum} style={{ color: '#00e676' }}>{overallPct}%</div>
            <div className={styles.statLabel}>Complete</div>
          </div>
        </div>
      </div>

      {/* Module cards */}
      <div className={styles.grid}>
        {DS_MODULES.map(m => (
          <ModuleCard key={m.id} mod={m} checked={checked} onToggle={toggle} />
        ))}
      </div>
    </section>
  );
}
