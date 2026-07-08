import { useCountdown } from '../hooks/useStudy';
import { EXAM_DATES } from '../data/studyData';
import styles from './CountdownGrid.module.css';

const PAD = (n) => String(n).padStart(2, '0');

const TIMERS = [
  { key: 'cie1',  label: 'DS CIE – 1',    date: EXAM_DATES.cie1,   accent: '#ff4757', tag: '🔥 5 Days!' },
  { key: 'cie2',  label: 'DS CIE – 2',    date: EXAM_DATES.cie2,   accent: '#ffc107', tag: '⚡ Jul 23' },
  { key: 'rrb',   label: 'RRB Group D',   date: EXAM_DATES.rrb,    accent: '#7c6dfa', tag: '🎯 Aug 3' },
  { key: 'semEnd',label: 'Semester Ends',  date: EXAM_DATES.semEnd, accent: '#00e676', tag: '📅 Jul 27' },
];

function DigitBlock({ val, label }) {
  return (
    <div className={styles.digitBox}>
      <span className={styles.digit}>{PAD(val)}</span>
      <span className={styles.digitLabel}>{label}</span>
    </div>
  );
}

function TimerCard({ item }) {
  const t = useCountdown(item.date);
  return (
    <div className={styles.card} style={{ '--accent': item.accent }}>
      <div className={styles.topBar} />
      <div className={styles.label}>{item.label}</div>
      <div className={styles.tag}>{item.tag}</div>
      <div className={styles.digits}>
        <DigitBlock val={t.days} label="Days" />
        <span className={styles.sep}>:</span>
        <DigitBlock val={t.hours} label="Hrs" />
        <span className={styles.sep}>:</span>
        <DigitBlock val={t.mins} label="Min" />
        <span className={styles.sep}>:</span>
        <DigitBlock val={t.secs} label="Sec" />
      </div>
    </div>
  );
}

export default function CountdownGrid() {
  return (
    <div className={styles.grid}>
      {TIMERS.map((item) => (
        <TimerCard key={item.key} item={item} />
      ))}
    </div>
  );
}
