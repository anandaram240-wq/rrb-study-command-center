import { useState, useEffect, useCallback, useRef } from 'react';

// ─────────────────── POWER QUOTES ───────────────────────────
const QUOTES = [
  { q: "The railway track doesn't care about your past. It only cares where you're going.", a: "Your Future Self" },
  { q: "Pain is temporary. A government job is permanent. Choose your struggle.", a: "Every RRB Topper" },
  { q: "He who studies while others sleep, works while others rest — will succeed while others only wish.", a: "Adapted from William A. Ward" },
  { q: "You didn't come this far to only come this far. 26 days. One chance. EVERYTHING.", a: "RRB Command Center" },
  { q: "The difference between ordinary and extraordinary is that little EXTRA.", a: "Jimmy Johnson" },
  { q: "Success is not about being the smartest. It's about being the most prepared.", a: "Battle-tested Wisdom" },
  { q: "Your preparation is your prayer. Give it everything — the universe does the rest.", a: "Anonymous Topper" },
  { q: "I am ready to give my blood to this preparation. And blood always produces results.", a: "You — Your Own Words" },
];

import { SUBJECTS, DAILY_PLAN, EXAM_DATE, CUTOFFS, PYQ_ANALYSIS } from './data/studyData';
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine,
  BarChart, Bar, Cell
} from 'recharts';

// ─────────────────────── UTILS ────────────────────────────────
const todayStr = new Date().toISOString().split('T')[0];
const ALL_TOPICS = Object.values(SUBJECTS).flatMap(s => s.topics.map(t => ({ ...t, sub: s })));
const findTopic  = id => ALL_TOPICS.find(t => t.id === id);

function useLS(key, init) {
  const [v, setV] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : init; } catch { return init; }
  });
  const set = useCallback(nv => {
    const val = typeof nv === 'function' ? nv(v) : nv;
    setV(val); localStorage.setItem(key, JSON.stringify(val));
  }, [key, v]);
  return [v, set];
}

function daysLeft() { return Math.max(0, Math.ceil((EXAM_DATE - new Date()) / 86400000)); }
function getTodayPlan() { return DAILY_PLAN.find(d => d.date === todayStr) || DAILY_PLAN[DAILY_PLAN.length - 2]; }

const PHASE = {
  math:     { label:'Mathematics',     emoji:'📐', color:'#7c6dfa' },
  reasoning:{ label:'Reasoning',       emoji:'🧠', color:'#00d4ff' },
  gs:       { label:'General Science', emoji:'🔬', color:'#00e676' },
  gk:       { label:'GK & CA',          emoji:'🌍', color:'#ffc107' },
  revision: { label:'Revision',         emoji:'🔄', color:'#f850a6' },
  exam:     { label:'EXAM DAY',          emoji:'🏆', color:'#ff4757' },
};

// Mastery colors
const MASTERY = [
  { label:'Not Started', color:'#ffffff18', text:'#ffffff33' },
  { label:'Weak',        color:'#ff475722', text:'#ff4757'   },
  { label:'Learning',    color:'#ffc10722', text:'#ffc107'   },
  { label:'Good',        color:'#00d4ff22', text:'#00d4ff'   },
  { label:'Mastered',    color:'#00e67622', text:'#00e676'   },
];

// ─────────────────── LIVE COUNTDOWN ──────────────────────────
function Countdown() {
  const [t, setT] = useState({ d:0,h:0,m:0,s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = EXAM_DATE - new Date();
      if (diff <= 0) return;
      setT({ d:Math.floor(diff/86400000), h:Math.floor((diff%86400000)/3600000), m:Math.floor((diff%3600000)/60000), s:Math.floor((diff%60000)/1000) });
    };
    tick(); const id = setInterval(tick,1000); return ()=>clearInterval(id);
  },[]);
  return (
    <div className="cd">
      <div className="cd-left">
        <div className="cd-badge">⏳ EXAM IN</div>
        <div className="cd-cells">
          {[['DAYS',t.d],['HRS',t.h],['MIN',t.m],['SEC',t.s]].map(([l,v])=>(
            <div key={l} className="cd-cell">
              <span className="cd-n">{String(v).padStart(2,'0')}</span>
              <span className="cd-l">{l}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="cd-right">
        <div className="cd-target">RRB Group D · CEN 09/2025 · Aug 3–21, 2026</div>
        <div className="cd-goal">🎯 Target: <strong>78+ / 100</strong> · ST Cutoff 2025-26: <span style={{color:'#f850a6'}}>63.00</span></div>
      </div>
    </div>
  );
}

// ─────────────────── POMODORO TIMER ──────────────────────────
function PomodoroTimer() {
  const MODES = [
    { label:'Study',       min:25, color:'#00d4ff' },
    { label:'Short Break', min:5,  color:'#00e676'  },
    { label:'Long Break',  min:15, color:'#f850a6'  },
  ];
  const [mode, setMode] = useState(0);
  const [secs, setSecs] = useState(MODES[0].min * 60);
  const [running, setRunning] = useState(false);
  const [rounds, setRounds] = useState(0);
  const ref = useRef();

  useEffect(() => {
    setSecs(MODES[mode].min * 60);
    setRunning(false);
  }, [mode]);

  useEffect(() => {
    if (running) {
      ref.current = setInterval(() => {
        setSecs(s => {
          if (s <= 1) {
            clearInterval(ref.current);
            setRunning(false);
            if (mode === 0) setRounds(r => r+1);
            return 0;
          }
          return s-1;
        });
      }, 1000);
    } else {
      clearInterval(ref.current);
    }
    return () => clearInterval(ref.current);
  }, [running, mode]);

  const total = MODES[mode].min * 60;
  const pct   = ((total - secs) / total) * 100;
  const mm    = String(Math.floor(secs/60)).padStart(2,'0');
  const ss2   = String(secs%60).padStart(2,'0');
  const c     = MODES[mode].color;
  const r     = 52;
  const circ  = 2*Math.PI*r;

  return (
    <div className="card pomo-card">
      <div className="pomo-modes">
        {MODES.map((m,i)=>(
          <button key={i} className={`pomo-mode-btn ${mode===i?'pomo-mode-active':''}`}
            style={mode===i?{color:m.color,borderColor:m.color,background:m.color+'18'}:{}}
            onClick={()=>setMode(i)}>{m.label}</button>
        ))}
      </div>
      <div className="pomo-center">
        <svg width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={r} fill="none" stroke="#ffffff09" strokeWidth="8"/>
          <circle cx="65" cy="65" r={r} fill="none" stroke={c} strokeWidth="8"
            strokeDasharray={`${pct/100*circ} ${circ}`} strokeLinecap="round"
            transform="rotate(-90 65 65)" style={{transition:'stroke-dasharray .5s'}}/>
          <text x="65" y="60" textAnchor="middle" fill="white" fontSize="26" fontWeight="900">{mm}:{ss2}</text>
          <text x="65" y="78" textAnchor="middle" fill={c} fontSize="11" fontWeight="700">{MODES[mode].label.toUpperCase()}</text>
        </svg>
        <div className="pomo-controls">
          <button className="pomo-btn" onClick={()=>setRunning(r=>!r)} style={{borderColor:c,color:c,background:c+'18'}}>
            {running ? '⏸ PAUSE' : '▶ START'}
          </button>
          <button className="pomo-btn pomo-reset" onClick={()=>{setSecs(MODES[mode].min*60);setRunning(false);}}>↺ RESET</button>
        </div>
        <div className="pomo-rounds">🍅 Rounds today: <strong style={{color:c}}>{rounds}</strong> · {rounds * 25} min studied</div>
      </div>
    </div>
  );
}

// ─────────────────── ANALYTICS DASHBOARD ─────────────────────
function Analytics({ mastery, mocks, done }) {
  const dl = daysLeft();

  // Radar data
  const radarData = Object.entries(SUBJECTS).map(([key, sub]) => {
    const topics = sub.topics;
    const avgMastery = topics.reduce((a,t) => a + (mastery[t.id]||0), 0) / topics.length;
    return { subject: sub.emoji + ' ' + sub.name.split(' ')[0], mastery: Math.round(avgMastery * 25), fullMark: 100 };
  });

  // Score prediction based on mastery
  const predictScore = () => {
    return Object.values(SUBJECTS).reduce((total, sub) => {
      return total + sub.topics.reduce((acc, t) => {
        const m = mastery[t.id] || 0;
        const accuracy = [0, 0.3, 0.55, 0.75, 0.92][m];
        return acc + (t.exp * accuracy);
      }, 0);
    }, 0);
  };
  const predicted = +predictScore().toFixed(1);

  // Priority Index = (expected Qs) × (trend weight: ↗=1.3 ↔=1.0 ↘=0.8)
  const trendWeight = t => t.trend?.includes('↗') ? 1.3 : t.trend?.includes('↘') ? 0.8 : 1.0;
  const priorityTopics = ALL_TOPICS
    .map(t => ({ ...t, priority_index: +(t.exp * trendWeight(t)).toFixed(1) }))
    .sort((a,b) => b.priority_index - a.priority_index)
    .slice(0, 10);

  // Daily progress heatmap (last 26 days)
  const heatmapData = DAILY_PLAN.slice(0,26).map(plan => {
    const ids = plan.topics || [];
    const done2 = ids.filter(id => done[id]).length;
    const pct = ids.length ? Math.round(done2/ids.length*100) : (plan.date < todayStr ? 100 : 0);
    const meta = PHASE[plan.phase] || PHASE.exam;
    return { ...plan, pct, color: meta.color };
  });

  const avgMock = mocks.length ? +(mocks.reduce((a,m)=>a+m.net,0)/mocks.length).toFixed(1) : 0;
  const trend = mocks.length >= 2 ? mocks[mocks.length-1].net - mocks[0].net : 0;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      {/* Top KPI strip */}
      <div className="kpi-grid">
        {[
          { label:'Days Left',     val:dl,            sub:'to exam',       color:dl<=10?'#ff4757':'#ffc107' },
          { label:'Predicted Score',val:predicted,    sub:'based on mastery',color:predicted>=78?'#00e676':predicted>=63?'#ffc107':'#ff4757' },
          { label:'Mock Avg',      val:avgMock||'—',  sub:`${mocks.length} mocks done`, color:avgMock>=78?'#00e676':avgMock>=63?'#ffc107':'#ff4757' },
          { label:'Mock Trend',    val:trend>0?'+'+trend.toFixed(1):trend.toFixed(1)||'—', sub:'first → last', color:trend>0?'#00e676':'#ff4757' },
          { label:'Topics Done',   val:ALL_TOPICS.filter(t=>done[t.id]).length+'/'+ALL_TOPICS.length, sub:'completed', color:'#00d4ff' },
          { label:'ST Cutoff 2026',val:'~65+',        sub:'expected',      color:'#f850a6' },
        ].map(({ label,val,sub,color })=>(
          <div key={label} className="kpi-card">
            <div className="kpi-val" style={{color}}>{val}</div>
            <div className="kpi-label">{label}</div>
            <div className="kpi-sub">{sub}</div>
          </div>
        ))}
      </div>

      {/* Radar + Score Predict */}
      <div className="two-col">
        <div className="card">
          <div className="sec-title">📡 Mastery Radar</div>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#ffffff0d"/>
              <PolarAngleAxis dataKey="subject" tick={{fill:'#ffffff66',fontSize:9}}/>
              <Radar name="Mastery" dataKey="mastery" stroke="#00d4ff" fill="#00d4ff" fillOpacity={0.15} strokeWidth={2}/>
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="card predict-card">
          <div className="sec-title">🔮 Score Predictor</div>
          <div className="predict-score" style={{color:predicted>=78?'#00e676':predicted>=63?'#ffc107':'#ff4757'}}>{predicted}</div>
          <div className="predict-sub">predicted / 100</div>
          <div className="predict-desc">{predicted>=78?'🔥 Exam Ready!':predicted>=65?'✅ Above expected cutoff':predicted>=43.58?'⚠️ Above 2022 cutoff. Push harder.':'❌ Below cutoff — increase mastery'}</div>
          {[{l:'2022 ST',v:43.58,c:'#ffffff44'},{l:'2026 ST ~',v:65,c:'#f850a6'},{l:'Your Target',v:78,c:'#00e676'}].map(({l,v,c})=>(
            <div key={l} className="predict-bar-row">
              <span style={{fontSize:9,color:c,minWidth:80}}>{l}: {v}</span>
              <div className="predict-bar-track"><div style={{width:`${(predicted/100)*100}%`,height:'100%',background:predicted>=v?c:'#ff475755',borderRadius:2,transition:'width .4s'}}/></div>
              <span style={{fontSize:10,fontWeight:800,color:predicted>=v?'#00e676':'#ff4757'}}>{predicted>=v?`+${(predicted-v).toFixed(1)}`:(predicted-v).toFixed(1)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Priority Index */}
      <div className="card">
        <div className="sec-title">⚡ TOP 10 Priority Topics — by (Expected Q × Trend Weight)</div>
        <div className="priority-note">Formula: Expected Questions × Trend Factor (↗=1.3, ↔=1.0, ↘=0.8). Higher = more exam impact.</div>
        <div style={{height:160,marginTop:10}}>
          <ResponsiveContainer>
            <BarChart data={priorityTopics.map(t=>({name:t.id, pi:t.priority_index, color:t.sub.color}))} margin={{top:5,right:5,left:-25,bottom:5}}>
              <CartesianGrid strokeDasharray="2 4" stroke="#ffffff06"/>
              <XAxis dataKey="name" tick={{fill:'#ffffff55',fontSize:9}} stroke="transparent"/>
              <YAxis tick={{fill:'#ffffff55',fontSize:9}} stroke="transparent"/>
              <Tooltip contentStyle={{background:'#111',border:'1px solid #333',borderRadius:8,fontSize:11}} formatter={(v,n,p)=>[v,'Priority Index']}/>
              <Bar dataKey="pi" radius={[4,4,0,0]}>
                {priorityTopics.map((t,i)=><Cell key={i} fill={t.sub.color}/>)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="priority-list">
          {priorityTopics.map((t,i)=>(
            <div key={t.id} className="prio-row">
              <span className="prio-rank" style={{color:t.sub.color}}>#{i+1}</span>
              <span className="prio-id" style={{color:t.sub.color}}>{t.id}</span>
              <span className="prio-name">{t.name}</span>
              <span className="prio-pi" style={{color:t.sub.color}}>{t.priority_index}</span>
              <span className="prio-trend">{t.trend?.split(' ')[0]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Heatmap */}
      <div className="card">
        <div className="sec-title">📅 26-Day Progress Heatmap</div>
        <div className="heatmap">
          {heatmapData.map(d=>(
            <div key={d.day} className="hm-cell" title={`Day ${d.day}: ${d.pct}% done`}
              style={{ background: d.pct===100?d.color:d.pct>0?d.color+'55':'#ffffff08', border:d.date===todayStr?`2px solid ${d.color}`:'2px solid transparent' }}>
              <span className="hm-day">D{d.day}</span>
              {d.pct===100 && <span className="hm-check">✓</span>}
              {d.date===todayStr && <span className="hm-dot" style={{background:d.color}}/>}
            </div>
          ))}
          <div className="hm-cell hm-exam" title="EXAM DAY">🏆</div>
        </div>
        <div className="hm-legend">
          <span className="hml-item"><span className="hml-dot" style={{background:'#ffffff11'}}/> Not started</span>
          <span className="hml-item"><span className="hml-dot" style={{background:'#ffffff44'}}/> In progress</span>
          <span className="hml-item"><span className="hml-dot" style={{background:'#00e676'}}/> Complete</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────── MASTERY TRACKER ──────────────────────────
function MasteryTracker({ mastery, setMastery, done, setDone }) {
  const [filter, setFilter] = useState('all');
  const filters = [
    { k:'all',     label:'All Topics' },
    { k:'0',       label:'Not Started' },
    { k:'1',       label:'Weak' },
    { k:'2',       label:'Learning' },
    { k:'3',       label:'Good' },
    { k:'4',       label:'Mastered' },
  ];

  const filtered = filter === 'all'
    ? ALL_TOPICS
    : ALL_TOPICS.filter(t => (mastery[t.id] || 0) === +filter);

  const overallMastery = ALL_TOPICS.reduce((a,t) => a + (mastery[t.id]||0), 0) / (ALL_TOPICS.length * 4) * 100;

  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div className="card">
        <div className="sec-title">🏆 Topic Mastery Tracker</div>
        <div className="mastery-summary">
          {MASTERY.map((m,i)=>{
            const count = ALL_TOPICS.filter(t=>(mastery[t.id]||0)===i).length;
            return (
              <div key={i} className="ms-item" style={{background:m.color,border:`1px solid ${m.text}33`}}>
                <span className="ms-count" style={{color:m.text}}>{count}</span>
                <span className="ms-label">{m.label}</span>
              </div>
            );
          })}
        </div>
        <div className="mastery-overall">
          <span className="mo-label">Overall Mastery</span>
          <div className="mo-bar"><div style={{width:overallMastery+'%',height:'100%',background:'linear-gradient(90deg,#ff4757,#ffc107,#00e676)',borderRadius:3,transition:'width .4s'}}/></div>
          <span className="mo-pct" style={{color:overallMastery>=75?'#00e676':overallMastery>=50?'#ffc107':'#ff4757'}}>{overallMastery.toFixed(0)}%</span>
        </div>
        <div className="ms-filters">
          {filters.map(f=>(
            <button key={f.k} className={`ms-filter-btn ${filter===f.k?'ms-filter-active':''}`}
              onClick={()=>setFilter(f.k)}>{f.label}</button>
          ))}
        </div>
      </div>

      <div style={{display:'flex',flexDirection:'column',gap:8}}>
        {filtered.map(t => {
          const m = mastery[t.id] || 0;
          const mc = MASTERY[m];
          const chk = !!done[t.id];
          return (
            <div key={t.id} className="mastery-card" style={{borderLeft:`3px solid ${t.sub.color}`,background:mc.color}}>
              <div className="mc-top">
                <div className="mc-left">
                  <span className="mc-id" style={{color:t.sub.color}}>{t.id}</span>
                  <div>
                    <div className="mc-name">{t.name}</div>
                    <div className="mc-meta">
                      <span style={{color:t.sub.color,fontSize:10,fontWeight:700}}>{t.sub.emoji} {t.sub.name}</span>
                      <span className="mc-q">~{t.exp}Q</span>
                      <span className="mc-priority">{t.priority}</span>
                      <span className="mc-trend">{t.trend}</span>
                    </div>
                  </div>
                </div>
                <div className="mc-right">
                  <div className="mc-status" style={{color:mc.text,background:mc.color,border:`1px solid ${mc.text}44`}}>{mc.label}</div>
                  <div className="mc-chk" onClick={()=>setDone(p=>({...p,[t.id]:!p[t.id]}))}>
                    <div className="tchk-sm" style={{borderColor:chk?t.sub.color:'#ffffff33',background:chk?t.sub.color:'transparent'}}>
                      {chk && '✓'}
                    </div>
                    <span style={{fontSize:9,color:chk?t.sub.color:'#ffffff33'}}>{chk?'Done':'Mark done'}</span>
                  </div>
                </div>
              </div>
              {/* Mastery stars */}
              <div className="mc-stars">
                {[0,1,2,3,4].map(i=>(
                  <button key={i} className="star-btn"
                    style={{background:i<=m?MASTERY[i].text+'33':'#ffffff09',borderColor:i<=m?MASTERY[i].text:'#ffffff18',color:i<=m?MASTERY[i].text:'#ffffff33'}}
                    onClick={()=>setMastery(p=>({...p,[t.id]:i}))}>
                    {['✗','Weak','Learn','Good','✓✓'][i]}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────── TODAY'S PLAN ────────────────────────────
function TodayPlan({ done, setDone, mastery }) {
  const plan = getTodayPlan();
  const meta = PHASE[plan.phase] || PHASE.exam;
  const ids  = plan.topics || [];
  const doneIds = ids.filter(id=>done[id]);
  const pct  = ids.length ? Math.round(doneIds.length/ids.length*100) : 100;

  return (
    <div className="card" style={{borderTop:`3px solid ${meta.color}`}}>
      <div className="today-hdr">
        <div className="today-l">
          <div className="phase-chip" style={{background:meta.color+'18',color:meta.color,border:`1px solid ${meta.color}44`}}>
            {meta.emoji} {meta.label} · {plan.date}
          </div>
          <h2 className="today-title">{plan.title}</h2>
          <p className="today-mantra">"{plan.mantra}"</p>
          {plan.pyqInsight && (
            <div className="pyq-insight-box">📊 {plan.pyqInsight}</div>
          )}
        </div>
        <div className="today-ring">
          <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="#ffffff09" strokeWidth="7"/>
            <circle cx="36" cy="36" r="28" fill="none" stroke={meta.color} strokeWidth="7"
              strokeDasharray={`${pct*1.759} 175.9`} strokeLinecap="round"
              transform="rotate(-90 36 36)" style={{transition:'stroke-dasharray .4s'}}/>
            <text x="36" y="40" textAnchor="middle" fill="white" fontSize="14" fontWeight="900">{pct}%</text>
          </svg>
          <div style={{fontSize:10,color:'#ffffff44',marginTop:2}}>{doneIds.length}/{ids.length} done</div>
        </div>
      </div>

      {ids.length > 0 && (
        <div className="prog-bar"><div style={{width:pct+'%',background:meta.color,height:'100%',borderRadius:3,transition:'width .4s'}}/></div>
      )}

      {ids.length > 0 ? (
        <div className="topic-list">
          {ids.map(id => {
            const t = findTopic(id);
            if (!t) return null;
            const chk = !!done[id];
            const m = mastery[id] || 0;
            const mc = MASTERY[m];
            return (
              <div key={id} className={`topic-row ${chk?'topic-done':''}`}
                onClick={() => setDone(p=>({...p,[id]:!p[id]}))}>
                <div className="tchk" style={{borderColor:chk?t.sub.color:'#ffffff2a',background:chk?t.sub.color:'transparent'}}>
                  {chk&&<svg width="12" height="12" viewBox="0 0 12 12"><polyline points="2,6 4.5,9.5 10,2.5" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <span className="tid" style={{color:t.sub.color}}>{id}</span>
                <div className="tinfo">
                  <div className="tname-row">
                    <span className={`tname ${chk?'tname-done':''}`}>{t.name}</span>
                    <span className="mc-badge" style={{background:mc.color,color:mc.text,border:`1px solid ${mc.text}33`}}>{mc.label}</span>
                  </div>
                  <div className="tmeta-row">
                    <span className="tpriority">{t.priority}</span>
                    <span className="ttrend">{t.trend}</span>
                    <span className="tq-badge">~{t.exp}Q expected</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="special-area">
          {plan.isExam&&<div className="exam-msg">🏆 Walk in. Execute. WIN.</div>}
          {plan.isEve&&<div className="eve-msg">🌙 Zero new content. Sleep by 9:30 PM.</div>}
          {plan.phaseComplete&&<div className="done-msg">✅ {plan.phaseCompleteLabel} — COMPLETE!</div>}
          {!plan.isExam&&!plan.isEve&&!plan.phaseComplete&&<div className="done-msg">📝 Revision + mock day.</div>}
        </div>
      )}
      {plan.mock && <div className="mock-pill">📝 {plan.mockLabel}</div>}
    </div>
  );
}

// ─────────────────── FULL PLAN ────────────────────────────────
function FullPlan({ done, setDone }) {
  const [open, setOpen] = useState(null);
  return (
    <div className="card" style={{padding:0,overflow:'hidden'}}>
      <div style={{padding:'16px 18px 10px'}}><h2 className="sec-title">📅 26-Day Eat The Frog Plan</h2></div>
      {DAILY_PLAN.map(plan => {
        const meta = PHASE[plan.phase]||PHASE.exam;
        const isToday = plan.date===todayStr;
        const isPast  = plan.date<todayStr;
        const isOpen  = open===plan.day;
        const ids = plan.topics||[];
        const doneIds = ids.filter(id=>done[id]);
        const pct = ids.length ? Math.round(doneIds.length/ids.length*100) : (plan.isExam?0:100);
        return (
          <div key={plan.day} style={{borderLeft:`3px solid ${isToday?meta.color:isPast?meta.color+'55':'#ffffff0d'}`,borderBottom:'1px solid #ffffff07'}}>
            <div className="plan-hdr" onClick={()=>setOpen(isOpen?null:plan.day)}
              style={{background:isToday?meta.color+'06':''}}>
              <div className="plan-hdr-l">
                <span className="plan-day" style={{color:meta.color}}>D{plan.day}</span>
                <div>
                  <div className="plan-ttl">{plan.title}</div>
                  <div style={{fontSize:9,color:meta.color+'88',marginTop:1}}>{meta.emoji} {meta.label} · {plan.date}</div>
                </div>
              </div>
              <div className="plan-hdr-r">
                {ids.length>0&&<span style={{fontSize:11,fontWeight:800,color:pct===100?'#00e676':meta.color}}>{pct}%</span>}
                {isToday&&<span className="tag tag-today">TODAY</span>}
                {plan.mock&&<span className="tag tag-mock">MOCK</span>}
                {plan.phaseComplete&&<span className="tag tag-done">✓ DONE</span>}
                <span style={{color:'#ffffff22',fontSize:9}}>{isOpen?'▲':'▼'}</span>
              </div>
            </div>
            {isOpen && (
              <div className="plan-body">
                <div className="plan-mantra">"{plan.mantra}"</div>
                {plan.pyqInsight&&<div className="plan-insight">📊 {plan.pyqInsight}</div>}
                {ids.length>0 && ids.map(id=>{
                  const t=findTopic(id); if(!t) return null;
                  const chk=!!done[id];
                  return (
                    <div key={id} className={`plan-t ${chk?'plan-t-done':''}`}
                      onClick={e=>{e.stopPropagation();setDone(p=>({...p,[id]:!p[id]}))}}>
                      <div className="ptchk" style={{borderColor:chk?t.sub.color:'#ffffff22',background:chk?t.sub.color:'transparent',color:'white',fontSize:9}}>
                        {chk&&'✓'}
                      </div>
                      <span style={{color:t.sub.color,fontSize:9,fontWeight:800,minWidth:22}}>{id}</span>
                      <span className={chk?'pt-done':'pt-name'}>{t.name}</span>
                      <span style={{fontSize:9,color:'#ffffff33',marginLeft:'auto'}}>~{t.exp}Q</span>
                    </div>
                  );
                })}
                {plan.mock&&<div className="plan-mock-badge">{plan.mockLabel}</div>}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────── PYQ ANALYSIS ────────────────────────────
function PYQAnalysis() {
  const [sub, setSub] = useState('math');
  const subTabs = [
    {k:'math',l:'📐 Math',c:'#7c6dfa'},
    {k:'reasoning',l:'🧠 Reasoning',c:'#00d4ff'},
    {k:'gs',l:'🔬 Science',c:'#00e676'},
    {k:'gk',l:'🌍 GK',c:'#ffc107'},
  ];
  const color = subTabs.find(t=>t.k===sub)?.c||'#fff';
  const getTopics = () => {
    if(sub==='gs') return [...PYQ_ANALYSIS.gs.physics.topics,...PYQ_ANALYSIS.gs.chemistry.topics,...PYQ_ANALYSIS.gs.biology.topics];
    return PYQ_ANALYSIS[sub].topics;
  };
  const topics = getTopics();
  const chartData = topics.map(t=>({ name:t.id, '2018':t.q18,'2022':t.q22,'2025-26':t.q25,'Exp':t.exp }));

  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div className="card">
        <h2 className="sec-title">📊 PYQ Deep Analysis — 3 Cycles: 2018 + 2022 + 2025-26</h2>
        <div className="sub-tabs">
          {subTabs.map(t=>(
            <button key={t.k} className={`sub-tab ${sub===t.k?'sub-tab-active':''}`}
              style={sub===t.k?{color:t.c,borderBottomColor:t.c}:{}}
              onClick={()=>setSub(t.k)}>{t.l}</button>
          ))}
        </div>
        {PYQ_ANALYSIS[sub]?.trends && (
          <div className="diff-row">
            {Object.entries(PYQ_ANALYSIS[sub].trends).map(([yr,tr])=>(
              <div key={yr} className="diff-card" style={{borderColor:color+'33'}}>
                <div className="diff-yr" style={{color}}>{yr}</div>
                <div className="diff-lvl">{tr.difficulty}</div>
                {tr.topHighlights.map((h,i)=><div key={i} className="diff-item">• {h}</div>)}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card">
        <div className="chart-title">Questions per topic — 3 exam cycles comparison</div>
        <div style={{height:180}}>
          <ResponsiveContainer>
            <BarChart data={chartData} margin={{top:5,right:5,left:-25,bottom:5}}>
              <CartesianGrid strokeDasharray="2 4" stroke="#ffffff06"/>
              <XAxis dataKey="name" tick={{fill:'#ffffff44',fontSize:9}} stroke="transparent"/>
              <YAxis tick={{fill:'#ffffff44',fontSize:9}} stroke="transparent" domain={[0,7]}/>
              <Tooltip contentStyle={{background:'#111',border:'1px solid #333',borderRadius:8,fontSize:11}}/>
              <Bar dataKey="2018" fill="#7c6dfa44" radius={[3,3,0,0]}/>
              <Bar dataKey="2022" fill="#00d4ff44" radius={[3,3,0,0]}/>
              <Bar dataKey="2025-26" fill={color+'77'} radius={[3,3,0,0]}/>
              <Bar dataKey="Exp" fill={color} radius={[3,3,0,0]}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div style={{display:'flex',flexDirection:'column',gap:6}}>
        {sub==='gs'
          ? ['physics','chemistry','biology'].map(sec=>(
              <div key={sec} className="card" style={{padding:14}}>
                <div className="gs-sec-hdr">{sec==='physics'&&'⚡ Physics'}{sec==='chemistry'&&'⚗️ Chemistry'}{sec==='biology'&&'🧬 Biology'}</div>
                {PYQ_ANALYSIS.gs[sec].topics.map(t=><TopicRow key={t.id} t={t} color={color}/>)}
              </div>
            ))
          : topics.map(t=><TopicRow key={t.id} t={t} color={color}/>)
        }
      </div>
    </div>
  );
}

function TopicRow({ t, color }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="card" style={{padding:0,overflow:'hidden',marginBottom:0}}>
      <div className="tr-hdr" onClick={()=>setOpen(o=>!o)}>
        <div className="tr-l">
          <div className="tr-dot" style={{background:color}}/>
          <div>
            <div className="tr-name"><span style={{color,fontSize:9,fontWeight:800,marginRight:5}}>{t.id}</span>{t.name}</div>
            <div className="tr-bars">
              {[['18',t.q18,'#7c6dfa'],['22',t.q22,'#00d4ff'],['25',t.q25,color],['Exp',t.exp,'#ffffff']].map(([yr,q,c])=>(
                <div key={yr} className="trb-row">
                  <span className="trb-yr">{yr}</span>
                  <div className="trb-track"><div className="trb-fill" style={{width:`${(q/6)*100}%`,background:c}}/></div>
                  <span style={{fontSize:9,fontWeight:700,color:c,minWidth:16}}>{q}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tr-r">
          <div style={{fontSize:10,fontWeight:700}}>{t.priority}</div>
          <div style={{fontSize:18,fontWeight:900,color}}>~{t.exp}Q</div>
          <div style={{color:'#ffffff22',fontSize:9}}>{open?'▲':'▼'}</div>
        </div>
      </div>
      {open&&<div className="tr-body">{t.trend}</div>}
    </div>
  );
}

// ─────────────────── CUTOFFS ─────────────────────────────────
function Cutoffs() {
  const chartData = CUTOFFS.filter(c=>typeof c.st==='number').map(c=>({name:c.year,ST:c.st,UR:c.ur}));
  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div className="card">
        <h2 className="sec-title">🎯 Official Cutoffs — All Exams · Chennai Zone</h2>
        <div className="alert-crit">⚠️ <strong>CRITICAL TREND:</strong> ST cutoff: 55.33 (2018) → 43.58 (2022) → 63.00 (2025-26). CEN 09/2025 has only 22,195 vacancies — fewer than all previous cycles. Expected ST: <strong>~65+</strong>. Your target of 78 gives +13 margin. CORRECT STRATEGY.</div>
        {CUTOFFS.map((c,i)=>(
          <div key={i} className="co-card" style={{borderColor:c.year.includes('Your')?'#ffc10755':c.year.includes('2025-26')?'#f850a655':'#ffffff11',background:c.year.includes('Your')?'#ffc10709':c.year.includes('2025-26')?'#f850a609':'#ffffff04'}}>
            <div className="co-top">
              <div>
                <div className="co-yr" style={{color:c.year.includes('Your')?'#ffc107':c.year.includes('2025-26')?'#f850a6':'#ffffff77'}}>{c.year}</div>
                <div className="co-cen">{c.cen} · {c.exam}</div>
                <div className="co-vac">👥 {typeof c.vacancy==='number'?c.vacancy.toLocaleString():c.vacancy} vacancies · {c.difficulty}</div>
              </div>
              <div className="co-marks">
                {[['UR',c.ur,'#ffffff66'],['OBC',c.obc,'#00d4ff'],['SC',c.sc,'#00e676'],['ST',c.st,'#f850a6'],['EWS',c.ews,'#ffc107']].filter(([,v])=>v).map(([cat,val,clr])=>(
                  <div key={cat} className="co-cat"><span className="co-cat-l" style={{color:clr}}>{cat}</span><span className="co-cat-v" style={{color:clr}}>{typeof val==='number'?val.toFixed(2):val}</span></div>
                ))}
              </div>
            </div>
            <div className="co-note">{c.note}</div>
          </div>
        ))}
      </div>
      <div className="card">
        <div className="chart-title">ST Cutoff Trend — Chennai Zone (all exams)</div>
        <div style={{height:180}}>
          <ResponsiveContainer>
            <LineChart data={chartData} margin={{top:5,right:10,left:-20,bottom:5}}>
              <CartesianGrid strokeDasharray="2 4" stroke="#ffffff08"/>
              <XAxis dataKey="name" tick={{fill:'#ffffff55',fontSize:10}} stroke="transparent"/>
              <YAxis domain={[30,90]} tick={{fill:'#ffffff55',fontSize:10}} stroke="transparent"/>
              <Tooltip contentStyle={{background:'#111',border:'1px solid #333',borderRadius:8,fontSize:11}}/>
              <ReferenceLine y={78} stroke="#00e67655" strokeDasharray="4 4"/>
              <ReferenceLine y={65} stroke="#f850a655" strokeDasharray="3 3"/>
              <Line type="monotone" dataKey="ST" stroke="#f850a6" strokeWidth={3} dot={{r:6,fill:'#f850a6',stroke:'#07071a',strokeWidth:2}}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="co-insight-strip">
          {[{l:'2018 ST',v:'55.33',c:'#ffffff66'},{l:'2022 ST',v:'43.58',c:'#f850a6'},{l:'2025-26 ST',v:'63.00',c:'#f850a6'},{l:'Expected 2026',v:'~65+',c:'#ffc107'},{l:'Your Target',v:'78+',c:'#00e676'}].map(({l,v,c})=>(
            <div key={l} className="ci-block"><span style={{fontSize:18,fontWeight:900,color:c}}>{v}</span><span style={{fontSize:9,color:'#ffffff44'}}>{l}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────── MOCK TRACKER ────────────────────────────
function MockTracker({ mocks, setMocks }) {
  const [form, setForm] = useState({r:'',m:'',s:'',g:'',w:''});
  const submit = () => {
    const r=+form.r||0,m=+form.m||0,s=+form.s||0,g=+form.g||0,w=+form.w||0;
    const raw=r+m+s+g, net=+(raw-w/3).toFixed(2);
    setMocks(p=>[...p,{r,m,s,g,w,raw,net,date:todayStr,id:Date.now()}]);
    setForm({r:'',m:'',s:'',g:'',w:''});
  };
  const chartData=mocks.map((mk,i)=>({n:`M${i+1}`,net:mk.net,r:mk.r,m:mk.m,s:mk.s,g:mk.g}));
  const best=mocks.length?Math.max(...mocks.map(m=>m.net)):0;
  const latest=mocks.length?mocks[mocks.length-1].net:0;
  const avg=mocks.length?+(mocks.reduce((a,m)=>a+m.net,0)/mocks.length).toFixed(1):0;
  const trend=mocks.length>=2?+(mocks[mocks.length-1].net-mocks[0].net).toFixed(1):0;
  return (
    <div style={{display:'flex',flexDirection:'column',gap:14}}>
      <div className="card">
        <h2 className="sec-title">📈 Mock Test Command Center</h2>
        <div className="mstats">
          {[['Total',mocks.length,'#fff'],['Best',best||'—',best>=78?'#00e676':'#ff4757'],['Avg',avg||'—',avg>=78?'#00e676':'#ffc107'],['Latest',latest||'—',latest>=78?'#00e676':'#ff4757'],['Trend',trend>0?'+'+trend:trend||'—',trend>0?'#00e676':'#ff4757']].map(([l,v,c])=>(
            <div key={l} className="mstat"><span className="mstat-v" style={{color:c}}>{v}</span><span className="mstat-l">{l}</span></div>
          ))}
        </div>
        {mocks.length>0&&(
          <div style={{height:160,marginBottom:10}}>
            <ResponsiveContainer>
              <LineChart data={chartData} margin={{top:5,right:5,left:-25,bottom:5}}>
                <CartesianGrid strokeDasharray="2 4" stroke="#ffffff07"/>
                <XAxis dataKey="n" tick={{fill:'#ffffff44',fontSize:10}} stroke="transparent"/>
                <YAxis domain={[0,100]} tick={{fill:'#ffffff44',fontSize:10}} stroke="transparent"/>
                <Tooltip contentStyle={{background:'#111',border:'1px solid #333',borderRadius:8,fontSize:11}}/>
                <ReferenceLine y={78} stroke="#00e67655" strokeDasharray="4 4" label={{value:'Target 78',fill:'#00e67688',fontSize:8,position:'right'}}/>
                <ReferenceLine y={65} stroke="#f850a644" strokeDasharray="3 3" label={{value:'ST ~65',fill:'#f850a677',fontSize:8,position:'right'}}/>
                <Line type="monotone" dataKey="net" stroke="#00d4ff" strokeWidth={2.5} dot={{r:5,fill:'#00d4ff',stroke:'#07071a',strokeWidth:2}} name="Net Score"/>
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
        <div className="mform">
          {[['🧠 R/30','r','#00d4ff'],['📐 M/25','m','#7c6dfa'],['🔬 S/25','s','#00e676'],['🌍 G/20','g','#ffc107'],['✗ Wrong','w','#ff4757']].map(([l,k,c])=>(
            <div key={k} className="mf-g"><label className="mf-l" style={{color:c}}>{l}</label><input className="mf-i" type="number" min="0" max="100" value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))} placeholder="0"/></div>
          ))}
          <button className="mf-btn" onClick={submit}>+ LOG</button>
        </div>
        {mocks.length>0&&<div className="mhist">{[...mocks].reverse().slice(0,5).map(mk=>(
          <div key={mk.id} className="mhist-row">
            <span style={{fontSize:10,color:'#ffffff44',minWidth:76}}>{mk.date}</span>
            <span style={{fontSize:10,flex:1}}>R:{mk.r} M:{mk.m} S:{mk.s} G:{mk.g} ✗:{mk.w}</span>
            <span style={{fontSize:9,color:'#ffffff33'}}>Raw:{mk.raw}</span>
            <span className={`mhist-net ${mk.net>=78?'mnet-pass':mk.net>=65?'mnet-warn':'mnet-fail'}`}>Net:{mk.net}</span>
            <button className="del-btn" onClick={()=>setMocks(p=>p.filter(x=>x.id!==mk.id))}>✕</button>
          </div>
        ))}</div>}
      </div>
    </div>
  );
}

// ─────────────────── POWER QUOTE ────────────────────────────
function PowerQuote() {
  const [idx, setIdx] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % QUOTES.length);
        setFade(true);
      }, 400);
    }, 8000);
    return () => clearInterval(id);
  }, []);

  const next = () => {
    setFade(false);
    setTimeout(() => { setIdx(i => (i + 1) % QUOTES.length); setFade(true); }, 300);
  };

  const q = QUOTES[idx];
  return (
    <div className="quote-bar" onClick={next} title="Click for next quote">
      <span className="quote-icon">💬</span>
      <div className="quote-content" style={{ opacity: fade ? 1 : 0, transition: 'opacity 0.4s' }}>
        <span className="quote-text">"{q.q}"</span>
        <span className="quote-author">— {q.a}</span>
      </div>
      <span className="quote-dots">
        {QUOTES.map((_,i) => <span key={i} className="qdot" style={{background: i===idx?'#ffc107':'#ffffff22'}}/>)}
      </span>
    </div>
  );
}

// ─────────────────── SCORE SIMULATOR ────────────────────────
function ScoreCalc() {
  const [v,setV]=useState({r:28,m:22,s:20,g:15,w:5});
  const raw=v.r+v.m+v.s+v.g, net=+(raw-v.w/3).toFixed(2);
  const status = net>=78?{l:'🔥 POWER ZONE',c:'#00e676',bg:'#00e67612'}:net>=65?{l:'✅ Above Expected ST ~65',c:'#00d4ff',bg:'#00d4ff0d'}:net>=43.58?{l:'⚠️ Above 2022 cutoff only',c:'#ffc107',bg:'#ffc10710'}:{l:'❌ Below cutoff',c:'#ff4757',bg:'#ff47571a'};
  return (
    <div className="card">
      <h2 className="sec-title">🧮 Score Simulator</h2>
      {[{l:'🧠 Reasoning',k:'r',max:30,c:'#00d4ff'},{l:'📐 Mathematics',k:'m',max:25,c:'#7c6dfa'},{l:'🔬 Science',k:'s',max:25,c:'#00e676'},{l:'🌍 GK & CA',k:'g',max:20,c:'#ffc107'},{l:'✗ Wrong Answers',k:'w',max:100,c:'#ff4757'}].map(({l,k,max,c})=>(
        <div key={k} className="sc-row">
          <label className="sc-l" style={{color:c}}>{l}</label>
          <input type="range" min="0" max={max} value={v[k]} onChange={e=>setV(p=>({...p,[k]:+e.target.value}))} className="sc-slider" style={{'--c':c}}/>
          <span style={{fontSize:13,fontWeight:800,color:c,minWidth:26,textAlign:'right'}}>{v[k]}</span>
        </div>
      ))}
      <div className="sc-result" style={{background:status.bg,borderColor:status.c+'44'}}>
        <div style={{fontSize:50,fontWeight:900,color:status.c,lineHeight:1}}>{net}</div>
        <div style={{fontSize:12,color:'#ffffff55',marginBottom:4}}>Net / 100 · Raw: {raw} · Deduction: {+(v.w/3).toFixed(2)}</div>
        <div style={{fontSize:14,fontWeight:700,color:status.c,marginBottom:12}}>{status.l}</div>
        {[{l:'ST 2022 Cutoff',v:43.58,c:'#ffffff55'},{l:'Expected ST 2026',v:65,c:'#f850a6'},{l:'Your Target',v:78,c:'#00e676'}].map(({l,v:cv,c})=>(
          <div key={l} className="sc-ref-row">
            <span style={{fontSize:9,color:c,minWidth:110,textAlign:'right'}}>{l}: {cv}</span>
            <div className="sc-bar-track"><div style={{width:`${Math.min(net,100)}%`,height:'100%',background:net>=cv?c:'#ff475744',borderRadius:2,transition:'width .4s'}}/></div>
            <span style={{fontSize:10,fontWeight:800,color:net>=cv?'#00e676':'#ff4757',minWidth:36}}>{net>=cv?`+${(net-cv).toFixed(1)}`:(net-cv).toFixed(1)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────── APP ─────────────────────────────────────
export default function App() {
  const [done,    setDone]    = useLS('rrb-done-v8',{});
  const [mastery, setMastery] = useLS('rrb-mastery-v1',{});
  const [mocks,   setMocks]   = useLS('rrb-mocks-v8',[]);
  const [tab,     setTab]     = useState('today');
  const dl = daysLeft();
  const totalT = ALL_TOPICS.length;
  const doneT  = ALL_TOPICS.filter(t=>done[t.id]).length;
  const pct    = Math.round(doneT/totalT*100);

  const tabs = [
    {k:'today',   l:'📋 Today'},
    {k:'plan',    l:'📅 Plan'},
    {k:'mastery', l:'⭐ Mastery'},
    {k:'analytics',l:'📡 Analytics'},
    {k:'pyq',     l:'📊 PYQ'},
    {k:'cutoffs', l:'🎯 Cutoffs'},
    {k:'mocks',   l:'📈 Mocks'},
    {k:'timer',   l:'⏱ Timer'},
    {k:'calc',    l:'🧮 Simulator'},
  ];

  return (
    <div className="app">
      <header className="hdr">
        <div className="hdr-top">
          <div className="hdr-brand">
            <span className="hdr-logo">🚂</span>
            <div>
              <h1 className="hdr-title">RRB Group D</h1>
              <p className="hdr-sub">CEN 09/2025 · Chennai Zone · ST Category · EAT THE FROG</p>
            </div>
          </div>
          <div className="hdr-tags">
            <span className="htag" style={{color:'#f850a6',borderColor:'#f850a644',background:'#f850a614'}}>ST</span>
            <span className="htag" style={{color:'#00d4ff',borderColor:'#00d4ff44',background:'#00d4ff14'}}>Chennai</span>
            <span className="htag" style={{color:dl<=10?'#ff4757':'#ffc107',borderColor:dl<=10?'#ff475744':'#ffc10744',background:dl<=10?'#ff475714':'#ffc10714'}}>{dl}d</span>
            <span className="htag" style={{color:'#00e676',borderColor:'#00e67644',background:'#00e67614'}}>{pct}%</span>
          </div>
        </div>
        <Countdown/>
        <PowerQuote/>
        <div className="frog-strip">
          🐸 EAT THE FROG: <span style={{color:'#7c6dfa'}}>① Math</span>
          <span style={{color:'#ffffff22'}}> → </span><span style={{color:'#00d4ff'}}>② Reasoning</span>
          <span style={{color:'#ffffff22'}}> → </span><span style={{color:'#00e676'}}>③ Science</span>
          <span style={{color:'#ffffff22'}}> → </span><span style={{color:'#ffc107'}}>④ GK</span>
          <span style={{color:'#ffffff22'}}> → </span><span style={{color:'#f850a6'}}>⑤ Revision</span>
          <span style={{color:'#ffffff22'}}> → </span><span style={{color:'#ff4757'}}>🏆 Exam Aug 3</span>
        </div>
        <nav className="nav">
          {tabs.map(t=>(
            <button key={t.k} className={`nav-btn ${tab===t.k?'nav-active':''}`} onClick={()=>setTab(t.k)}>{t.l}</button>
          ))}
        </nav>
      </header>

      <main className="main">
        {tab==='today'    && <TodayPlan done={done} setDone={setDone} mastery={mastery}/>}
        {tab==='plan'     && <FullPlan done={done} setDone={setDone}/>}
        {tab==='mastery'  && <MasteryTracker mastery={mastery} setMastery={setMastery} done={done} setDone={setDone}/>}
        {tab==='analytics'&& <Analytics mastery={mastery} mocks={mocks} done={done}/>}
        {tab==='pyq'      && <PYQAnalysis/>}
        {tab==='cutoffs'  && <Cutoffs/>}
        {tab==='mocks'    && <MockTracker mocks={mocks} setMocks={setMocks}/>}
        {tab==='timer'    && <PomodoroTimer/>}
        {tab==='calc'     && <ScoreCalc/>}
      </main>
    </div>
  );
}
