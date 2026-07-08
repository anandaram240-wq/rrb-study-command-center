import { useState, useCallback } from 'react';
import { DAY_PLAN } from '../data/studyData';
import { useNow, useLocalStorage } from '../hooks/useStudy';
import styles from './DailySchedule.module.css';

const PHASE_META = {
  'ds-cie1':   { label: 'DS CIE-1 BLITZ',  color: '#ff4757', bg: 'rgba(255,71,87,0.08)'  },
  'cie1-exam': { label: '🎓 CIE 1 EXAM',    color: '#ffc107', bg: 'rgba(255,193,7,0.08)'  },
  'ds-cie2':   { label: 'DS CIE-2 BLITZ',  color: '#7c6dfa', bg: 'rgba(124,109,250,0.08)'},
  'cie2-exam': { label: '🎓 CIE 2 EXAM',    color: '#00d4ff', bg: 'rgba(0,212,255,0.08)'  },
  'rrb-final': { label: '🚀 RRB FINAL',     color: '#00e676', bg: 'rgba(0,230,118,0.08)'  },
  'rrb-exam':  { label: '🏆 RRB EXAM DAY', color: '#f850a6', bg: 'rgba(248,80,166,0.08)' },
};

const TAG_COLOR = {
  RRB:  { bg: 'rgba(124,109,250,0.2)', color: '#a89cf7' },
  DS:   { bg: 'rgba(0,212,255,0.2)',   color: '#00d4ff' },
};

function parseTime(str) {
  const [h, m] = str.split(':').map(Number);
  return h * 60 + m;
}

function getSlotKey(date, index) {
  return `slot-${date}-${index}`;
}

export default function DailySchedule() {
  const now = useNow();
  const todayStr = now.toISOString().slice(0, 10);
  const currentMins = now.getHours() * 60 + now.getMinutes();

  const [selectedDate, setSelectedDate] = useState(todayStr);
  const [checked, setChecked] = useLocalStorage('daily-tasks', {});
  const [showAll, setShowAll] = useState(false);

  const selectedPlan = DAY_PLAN.find(d => d.date === selectedDate);
  const phase = selectedPlan ? PHASE_META[selectedPlan.phase] : null;

  const toggleSlot = useCallback((date, idx) => {
    const key = getSlotKey(date, idx);
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }, [setChecked]);

  // Completion stats for selected day
  const daySlots = selectedPlan?.slots || [];
  const checkableSlots = daySlots.filter(s => s.tag || s.dur);
  const doneCount = checkableSlots.filter((_, i) => checked[getSlotKey(selectedDate, daySlots.indexOf(_))]).length;
  const donePct = checkableSlots.length > 0 ? Math.round((doneCount / checkableSlots.length) * 100) : 0;

  // Group dates by phase
  const displayedDays = showAll ? DAY_PLAN : DAY_PLAN.slice(0, 14);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>📅 Day-by-Day Schedule with Task Tracker</h2>
          <p className={styles.sub}>Click any date · Check off tasks as you complete them · Synced to your browser</p>
        </div>
      </div>

      {/* Date picker */}
      <div className={styles.datePickerWrap}>
        <div className={styles.datePicker}>
          {displayedDays.map(d => {
            const meta = PHASE_META[d.phase];
            const isToday = d.date === todayStr;
            const isSelected = d.date === selectedDate;
            const date = new Date(d.date);
            const dayNum = date.getDate();
            const mon = date.toLocaleString('en', { month: 'short' });
            const weekDay = date.toLocaleString('en', { weekday: 'short' });

            // Completion %
            const planSlots = d.slots || [];
            const checkable = planSlots.filter(s => s.tag || s.dur);
            const done = checkable.filter((_, i) => checked[getSlotKey(d.date, planSlots.indexOf(_))]).length;
            const pct = checkable.length > 0 ? Math.round((done / checkable.length) * 100) : 0;

            return (
              <button
                key={d.date}
                className={`${styles.dateBtn} ${isSelected ? styles.dateBtnSel : ''} ${isToday ? styles.dateBtnToday : ''}`}
                style={isSelected ? { borderColor: meta.color } : {}}
                onClick={() => setSelectedDate(d.date)}
              >
                <span className={styles.dateMon} style={isSelected ? { color: meta.color } : {}}>{mon}</span>
                <span className={styles.dateDay} style={isSelected ? { color: meta.color } : {}}>{dayNum}</span>
                <span className={styles.dateWeek}>{weekDay}</span>
                {pct > 0 && (
                  <div className={styles.datePct}>
                    <div className={styles.datePctFill} style={{ width: `${pct}%`, background: meta.color }} />
                  </div>
                )}
                {isToday && <div className={styles.todayPing} style={{ background: meta.color }} />}
              </button>
            );
          })}
          {!showAll && DAY_PLAN.length > 14 && (
            <button className={styles.showMoreBtn} onClick={() => setShowAll(true)}>
              +{DAY_PLAN.length - 14} more →
            </button>
          )}
        </div>
      </div>

      {selectedPlan ? (
        <div className={styles.planBox}>
          {/* Header */}
          <div className={styles.planHeader} style={{ background: phase?.bg, borderLeftColor: phase?.color }}>
            <div>
              <span className={styles.phaseTag} style={{ color: phase?.color }}>{phase?.label}</span>
              <div className={styles.planFocus}>{selectedPlan.focus}</div>
              <div className={styles.planDate}>
                {new Date(selectedPlan.date).toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </div>
            </div>
            <div className={styles.planProgress}>
              <div className={styles.ppCircle} style={{
                background: `conic-gradient(${phase?.color} ${donePct * 3.6}deg, rgba(255,255,255,0.07) 0deg)`,
              }}>
                <div className={styles.ppInner}>
                  <span className={styles.ppNum} style={{ color: phase?.color }}>{donePct}%</span>
                  <span className={styles.ppLbl}>Done</span>
                </div>
              </div>
              <div className={styles.ppStats}>
                <div className={styles.ppStat}>{doneCount}/{checkableSlots.length} tasks</div>
                <div className={styles.ppStat} style={{ color: '#00e676' }}>{checkableSlots.length - doneCount} remaining</div>
              </div>
            </div>
          </div>

          {/* Day progress bar */}
          <div className={styles.dayProgBar}>
            <div className={styles.dayProgFill} style={{ width: `${donePct}%`, background: phase?.color }} />
          </div>

          {/* Focus summary row */}
          <div className={styles.focusRow}>
            <div className={styles.focusCard} style={{ borderColor: '#7c6dfa44' }}>
              <span>🎯</span>
              <div>
                <div className={styles.focusLabel} style={{ color: '#7c6dfa' }}>RRB Focus</div>
                <div className={styles.focusTxt}>{selectedPlan.rrbFocus}</div>
              </div>
            </div>
            <div className={styles.focusCard} style={{ borderColor: '#00d4ff44' }}>
              <span>💾</span>
              <div>
                <div className={styles.focusLabel} style={{ color: '#00d4ff' }}>DS Focus</div>
                <div className={styles.focusTxt}>{selectedPlan.dsFocus}</div>
              </div>
            </div>
          </div>

          {/* Slot timeline with checkboxes */}
          <div className={styles.timeline}>
            {daySlots.map((slot, i) => {
              const slotKey = getSlotKey(selectedDate, i);
              const isChecked = !!checked[slotKey];
              const isCheckable = !!(slot.tag || slot.dur);
              const slotMins = parseTime(slot.time);
              const nextMins = i + 1 < daySlots.length ? parseTime(daySlots[i+1].time) : slotMins + 60;
              const isToday = selectedPlan.date === todayStr;
              const isActive = isToday && currentMins >= slotMins && currentMins < nextMins;
              const isPast = isToday && currentMins >= nextMins;
              const tagStyle = slot.tag ? TAG_COLOR[slot.tag] : null;

              return (
                <div
                  key={i}
                  className={`${styles.slot} ${isActive ? styles.slotActive : ''} ${isPast && !isChecked ? styles.slotPast : ''} ${isChecked ? styles.slotDone : ''}`}
                >
                  {/* Checkbox */}
                  {isCheckable ? (
                    <button
                      className={`${styles.checkBtn} ${isChecked ? styles.checkBtnDone : ''}`}
                      style={isChecked ? { background: phase?.color, borderColor: phase?.color } : {}}
                      onClick={() => toggleSlot(selectedDate, i)}
                      aria-label="Toggle task"
                    >
                      {isChecked && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                          <path d="M2 5l2.5 2.5L8 2.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ) : (
                    <div className={styles.checkPlaceholder} />
                  )}

                  {/* Time */}
                  <span className={styles.slotTime}>{slot.time}</span>

                  {/* Card */}
                  <div
                    className={styles.slotCard}
                    style={isActive ? { borderLeftColor: '#00e676', background: 'rgba(0,230,118,0.06)' } : {}}
                    onClick={isCheckable ? () => toggleSlot(selectedDate, i) : undefined}
                    style={{
                      cursor: isCheckable ? 'pointer' : 'default',
                      ...(isActive ? { borderLeftColor: '#00e676', background: 'rgba(0,230,118,0.06)' } : {}),
                    }}
                  >
                    <span className={styles.slotTask} style={isChecked ? { textDecoration: 'line-through', opacity: 0.5 } : {}}>
                      {slot.task}
                    </span>
                    <div className={styles.slotMeta}>
                      {slot.dur && <span className={styles.slotDur}>{slot.dur}m</span>}
                      {slot.tag && tagStyle && (
                        <span className={styles.slotTag} style={{ background: tagStyle.bg, color: tagStyle.color }}>
                          {slot.tag}
                        </span>
                      )}
                      {isActive && <span className={styles.nowBadge}>● NOW</span>}
                      {isChecked && <span className={styles.doneBadge}>✓ Done</span>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Completion celebration */}
          {donePct === 100 && (
            <div className={styles.celebration}>
              🎉 <strong>Day Complete!</strong> Outstanding work — you are unstoppable. Tomorrow: same energy!
            </div>
          )}
        </div>
      ) : (
        <div className={styles.noPlan}>No specific plan for this date.</div>
      )}
    </section>
  );
}
