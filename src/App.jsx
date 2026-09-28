import React, { useEffect, useMemo, useState } from 'react';
import {
  CalendarDays, Dumbbell, Utensils, ChevronRight, Sun, ShieldCheck,
  Droplets, Flame, Moon, Scale, Camera, Activity, Undo2, Trash2,
} from 'lucide-react';
import { WORKOUT_PLAN, POSTURE } from './data/workoutPlan';
import { ROUTINE, DIET } from './data/routine';
import { useLocalDay } from './hooks/useLocalDay';
import { useTracker } from './hooks/useTracker';
import { useWater, WATER_GOAL_ML } from './hooks/useWater';
import { useHabits } from './hooks/useHabits';
import { useHistory, COMPLETION_THRESHOLD } from './hooks/useHistory';
import { useWeightLog } from './hooks/useWeightLog';
import { useTransformation, CHECKPOINT_WEEKS } from './hooks/useTransformation';
import { usePhotoUrl } from './hooks/usePhotoUrl';
import { formatShortDate, addDays } from './utils/date';
import './styles.css';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const TOTAL_CHECKS = ROUTINE.length + POSTURE.length;

function weekdayName(key) {
  const [y, m, d] = key.split('-').map(Number);
  return new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date(y, m - 1, d));
}

function App() {
  const [tab, setTab] = useState('Today');
  const todayKey = useLocalDay();
  const day = weekdayName(todayKey);
  const [selectedDay, setSelectedDay] = useState(day);
  const workout = WORKOUT_PLAN[day] || WORKOUT_PLAN.Monday;
  const selectedWorkout = WORKOUT_PLAN[selectedDay] || workout;

  const tracker = useTracker(todayKey);
  const water = useWater(todayKey);
  const { habits, toggle, setSleep } = useHabits(todayKey);
  const { days, streak, best, recordToday } = useHistory(todayKey);
  const weight = useWeightLog();
  const transform = useTransformation();

  const done = tracker.done;
  const pct = Math.round((done / TOTAL_CHECKS) * 100);

  // First not-yet-logged checkpoint gets the milestone highlight.
  const currentWeek = CHECKPOINT_WEEKS.find((w) => {
    const e = transform.checkpoints[w] || {};
    return !(e.loggedDate || e.weight || e.frontPhotoId || e.sidePhotoId || e.backPhotoId);
  });

  // Archive today's completion snapshot (guarded inside: no-op when unchanged).
  useEffect(() => {
    recordToday(todayKey, { pct, done, total: TOTAL_CHECKS, waterMl: water.ml });
  }, [todayKey, pct, done, water.ml, recordToday]);

  const nav = [
    ['Today', CalendarDays],
    ['Workout', Dumbbell],
    ['Diet', Utensils],
    ['Progress', Activity],
    ['Transform', Camera],
  ];

  const waterPct = Math.min(100, Math.round((water.ml / WATER_GOAL_ML) * 100));
  const waterLeft = Math.max(0, WATER_GOAL_ML - water.ml);

  return (
    <div className="app">
      <header>
        <div>
          <span className="eyebrow">PERSONAL TRANSFORMATION</span>
          <h1>Better You</h1>
          <p>Build the physique, posture, skin and habits you want — one day at a time.</p>
        </div>
        <div className="date">
          <b>{day}</b>
          <span>{new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
        </div>
      </header>

      <nav>
        {nav.map(([n, I]) => (
          <button className={tab === n ? 'active' : ''} onClick={() => setTab(n)} key={n}>
            <I size={17} />{n}
          </button>
        ))}
      </nav>

      {tab === 'Today' && (
        <main>
          <section className="hero">
            <div>
              <span className="pill">TODAY’S PLAN</span>
              <h2>{workout.title}</h2>
              <p>{workout.focus}</p>
            </div>
            <div className="progress">
              <div className="ring" style={{ '--p': pct }}>
                <div className="ring-inner"><b>{pct}%</b><span>{done}/{TOTAL_CHECKS}</span></div>
              </div>
              <small>checklist done</small>
            </div>
          </section>

          <section className="summary-grid">
            <div className="stat s-orange"><Flame size={16} /><b>{streak}</b><span>day streak</span></div>
            <div className="stat s-blue"><Droplets size={16} /><b>{(water.ml / 1000).toFixed(2)} L</b><span>water today</span></div>
            <div className="stat s-purple"><Moon size={16} /><b>{habits.sleepHours ?? '–'}</b><span>hours slept</span></div>
          </section>

          <Card title="Water" icon={<Droplets size={18} />}>
            <div className="water-top">
              <b>{(water.ml / 1000).toFixed(2)} L</b>
              <span className="muted">of ~{(WATER_GOAL_ML / 1000).toFixed(1)} L goal · {(waterLeft / 1000).toFixed(2)} L left</span>
            </div>
            <div className="bar"><div className="bar-fill" style={{ width: `${waterPct}%` }} /></div>
            <div className="btn-row">
              <button className="btn" onClick={() => water.add(250)}>+250 ml</button>
              <button className="btn" onClick={() => water.add(500)}>+500 ml</button>
              <button className="icon-btn" onClick={water.undo} disabled={!water.canUndo} aria-label="Undo last water entry"><Undo2 size={16} /></button>
            </div>
          </Card>

          <section className="grid">
            <Card title="Full-day routine" icon={<CalendarDays size={18} />}>
              {ROUTINE.map((r, i) => (
                <label className="row" key={r[0] + i}>
                  <input type="checkbox" checked={!!tracker.checks['r' + i]} onChange={() => tracker.toggle('r' + i)} />
                  <span className="time">{r[0]}</span>
                  <span><b>{r[1]}</b><small>{r[2]}</small></span>
                </label>
              ))}
            </Card>
            <Card title="Today’s workout" icon={<Dumbbell size={18} />}>
              <WorkoutList workout={workout} />
              <button className="link" onClick={() => setTab('Workout')}>Open full workout <ChevronRight size={16} /></button>
            </Card>
          </section>

          <Card title="Daily posture" icon={<ShieldCheck size={18} />}>
            <div className="mini-grid">
              {POSTURE.map((p, i) => (
                <label className="mini" key={p[0]}>
                  <input type="checkbox" checked={!!tracker.checks['p' + i]} onChange={() => tracker.toggle('p' + i)} />
                  <span><b>{p[0]}</b><small>{p[1]}</small></span>
                </label>
              ))}
            </div>
          </Card>

          <Card title="Daily habits" icon={<Sun size={18} />}>
            <label className="habit-row"><input type="checkbox" checked={habits.creatine} onChange={() => toggle('creatine')} /><span><b>Creatine 3–5 g</b><small>Once daily, any consistent time</small></span></label>
            <label className="habit-row"><input type="checkbox" checked={habits.fishOil} onChange={() => toggle('fishOil')} /><span><b>Fish oil</b><small>With lunch/dinner per label</small></span></label>
            <label className="habit-row"><input type="checkbox" checked={habits.skinAM} onChange={() => toggle('skinAM')} /><span><b>Skin — morning</b><small>Cleanser → moisturizer → SPF 30–50</small></span></label>
            <label className="habit-row"><input type="checkbox" checked={habits.skinPM} onChange={() => toggle('skinPM')} /><span><b>Skin — night</b><small>Cleanser → moisturizer</small></span></label>
            <label className="habit-row"><input type="checkbox" checked={habits.gainer} onChange={() => toggle('gainer')} /><span><b>Gainer (optional)</b><small>Only if normal food fell short — never forced</small></span></label>
            <div className="sleep-row">
              <span><b>Sleep</b><small>Hours slept last night</small></span>
              <input
                className="input sleep-input"
                type="number" inputMode="decimal" step="0.5" min="0" max="14"
                value={habits.sleepHours ?? ''}
                placeholder="7.5"
                onChange={(e) => {
                  const v = e.target.value;
                  setSleep(v === '' ? null : Math.max(0, Math.min(14, Number(v))));
                }}
              />
            </div>
          </Card>
        </main>
      )}

      {tab === 'Workout' && (
        <main>
          <section className="section-head">
            <span className="pill">6-DAY PLAN</span>
            <h2>Aesthetic Home Training</h2>
            <p>2 × 3 kg plates · ~60 min · controlled reps · progressive overload.</p>
          </section>
          <div className="day-tabs">
            {DAYS.map((d) => (
              <button className={d === selectedDay ? 'selected' : ''} onClick={() => setSelectedDay(d)} key={d}>{d.slice(0, 3)}</button>
            ))}
          </div>
          <Card title={selectedWorkout.title} icon={<Dumbbell size={18} />}>
            <p className="muted">{selectedWorkout.focus}</p>
            <WorkoutList workout={selectedWorkout} />
          </Card>
          <Card title="Progression rules">
            <ul className="bullets">
              <li>Add reps before adding sets.</li>
              <li>Then use a 3–4 sec lowering phase or a pause.</li>
              <li>When 25 reps are easy with clean form, use a harder variation or eventually heavier resistance.</li>
              <li>Neck work stays light: no loaded neck circles, jerking or bridges.</li>
            </ul>
          </Card>
        </main>
      )}

      {tab === 'Diet' && (
        <main>
          <section className="section-head">
            <span className="pill">NUTRITION</span>
            <h2>Eat to build, not just to look lean</h2>
            <p>Starting estimates — adjust using your 2–3 week weight trend.</p>
          </section>
          <div className="cards">
            <Card title="Daily targets"><ul className="bullets">{DIET.targets.map((x) => <li key={x}>{x}</li>)}</ul></Card>
            <Card title="Protein rotation"><Chips items={DIET.protein} /></Card>
            <Card title="Fruit rotation"><Chips items={DIET.fruits} /></Card>
            <Card title="Seed mix"><Chips items={DIET.seeds} /></Card>
            <Card title="Skin basics">
              <ul className="bullets">
                <li>Morning: gentle cleanser → moisturizer → SPF 30–50.</li>
                <li>Night: gentle cleanser → moisturizer.</li>
                <li>If you have no cleanser yet, use plain water gently rather than harsh DIY scrubs.</li>
                <li>Do not use lemon, toothpaste or baking soda on your face.</li>
              </ul>
            </Card>
            <Card title="Avoid / limit"><Chips items={DIET.avoid} /></Card>
          </div>
        </main>
      )}

      {tab === 'Progress' && (
        <main>
          <section className="section-head">
            <span className="pill">STREAK &amp; HISTORY</span>
            <h2>Consistency, tracked</h2>
            <p>A day counts at {COMPLETION_THRESHOLD}%+ of the routine + posture checklist.</p>
          </section>

          <section className="summary-grid">
            <div className="stat s-orange"><Flame size={16} /><b>{streak}</b><span>current streak</span></div>
            <div className="stat s-warm"><Activity size={16} /><b>{best}</b><span>best streak</span></div>
            <div className="stat s-green"><CalendarDays size={16} /><b>{pct}%</b><span>today so far</span></div>
          </section>

          <Card title="Last 14 days" icon={<CalendarDays size={18} />}>
            <div className="strip">
              {Array.from({ length: 14 }, (_, i) => addDays(todayKey, i - 13)).map((k) => {
                const e = days[k];
                const cls = k === todayKey ? 'today' : e ? (e.pct >= COMPLETION_THRESHOLD ? 'done' : 'miss') : (k < todayKey ? 'miss' : '');
                return (
                  <div className="hday" key={k}>
                    <span className="hdate">{formatShortDate(k)}</span>
                    <span className={`dot ${cls}`}>{e ? `${e.pct}` : k === todayKey ? `${pct}` : '–'}</span>
                  </div>
                );
              })}
            </div>
            <p className="muted">Today updates live as you check items off. Missed days break the streak.</p>
          </Card>

          <Card title="Weight" icon={<Scale size={18} />}>
            <WeightBlock weight={weight} todayKey={todayKey} />
          </Card>
        </main>
      )}

      {tab === 'Transform' && (
        <main>
          <section className="section-head">
            <span className="pill">TRANSFORMATION</span>
            <h2>Photos &amp; checkpoints</h2>
            <p>Front / side / back photos stay on this device (compressed, in IndexedDB).</p>
          </section>
          {CHECKPOINT_WEEKS.map((w) => (
            <CheckpointCard key={w} week={w} store={transform} current={w === currentWeek} />
          ))}
        </main>
      )}

      <footer><Sun size={15} /> Consistency beats complexity · Sleep 7.5–8.5 h · Food first, supplements second.</footer>
    </div>
  );
}

function Card({ title, icon, children }) {
  return <section className="card"><h3>{icon}{title}</h3>{children}</section>;
}

function WorkoutList({ workout }) {
  return (
    <div className="exercise-list">
      {workout.exercises.map((e, i) => (
        <div className="exercise" key={e[0] + i}>
          <span className="num">{i + 1}</span>
          <div><b>{e[0]}</b><div><SplitBadges spec={e[1]} /><span className="badge rest">Rest {e[2]}</span></div></div>
        </div>
      ))}
    </div>
  );
}

function Chips({ items }) {
  return <div className="chips">{items.map((x) => <span key={x}>{x}</span>)}</div>;
}

// Splits a "sets × reps" spec (data unchanged) into green sets + purple reps
// badges. Duration-only specs (no ×) render as a single badge.
function SplitBadges({ spec }) {
  const parts = String(spec).split('×');
  if (parts.length < 2) return <span className="badge reps">{spec}</span>;
  return (
    <>
      <span className="badge sets">{parts[0].trim()} sets</span>
      <span className="badge reps">{parts[1].trim()}</span>
    </>
  );
}

function WeightBlock({ weight, todayKey }) {
  const { entries, addEntry, removeEntry, latest } = weight;
  const [kg, setKg] = useState('');
  const [wdate, setWdate] = useState(todayKey);

  const save = () => {
    const v = Number(kg);
    if (!kg || Number.isNaN(v) || v <= 0 || v > 300 || !wdate) return;
    addEntry(wdate, Math.round(v * 10) / 10);
    setKg('');
  };

  const first = entries[0] || null;
  const deltaTotal = latest && first && latest.date !== first.date
    ? Math.round((latest.kg - first.kg) * 10) / 10 : null;
  const prev = entries.length > 1 ? entries[entries.length - 2] : null;
  const deltaRecent = latest && prev ? Math.round((latest.kg - prev.kg) * 10) / 10 : null;
  const recent = useMemo(() => [...entries].reverse().slice(0, 14), [entries]);
  const maxKg = entries.length ? Math.max(...entries.map((e) => e.kg)) : 0;

  return (
    <div>
      {latest ? (
        <div className="weight-top">
          <b>{latest.kg} kg</b>
          <span className="muted">last logged {formatShortDate(latest.date)}
            {deltaTotal !== null && (<span className="trend-up"> · {deltaTotal > 0 ? '+' : ''}{deltaTotal} kg since start</span>)}
            {deltaRecent !== null && (<span className="trend-up"> · {deltaRecent > 0 ? '+' : ''}{deltaRecent} kg vs previous</span>)}
          </span>
        </div>
      ) : (
        <p className="muted">No weigh-ins yet — log your first one below.</p>
      )}
      <div className="weight-form">
        <input className="input" type="date" value={wdate} max={todayKey} onChange={(e) => setWdate(e.target.value)} aria-label="Weigh-in date" />
        <input
          className="input" type="number" inputMode="decimal" step="0.1" min="0"
          value={kg} placeholder="Weight in kg"
          onChange={(e) => setKg(e.target.value)} aria-label="Weight in kg"
        />
        <button className="btn" onClick={save}>Log</button>
      </div>
      {recent.length > 0 && (
        <div className="weight-list">
          {recent.map((e) => (
            <div className="weight-row" key={e.date}>
              <span className="muted">{formatShortDate(e.date)}</span>
              <span className="wbar"><span className="wbar-fill" style={{ width: `${maxKg ? Math.round((e.kg / maxKg) * 100) : 0}%` }} /></span>
              <b>{e.kg} kg</b>
              <button className="icon-btn" onClick={() => removeEntry(e.date)} aria-label={`Remove entry ${e.date}`}>
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const ANGLES = ['front', 'side', 'back'];

function PhotoThumb({ id, angle, onDelete }) {
  const url = usePhotoUrl(id);
  if (!url) return <span className="thumb empty">{angle}: none yet</span>;
  return (
    <span className="thumb">
      <img src={url} alt={`${angle} progress`} />
      <button className="icon-btn thumb-del" onClick={onDelete} aria-label={`Delete ${angle} photo`}>
        <Trash2 size={13} />
      </button>
    </span>
  );
}

function CheckpointCard({ week, store, current }) {
  const { checkpoints, saveCheckpoint, deleteCheckpointPhoto } = store;
  const entry = checkpoints[week] || {};
  const [w, setW] = useState('');

  const saveWeight = async () => {
    const v = Number(w);
    if (!w || Number.isNaN(v) || v <= 0 || v > 300) return;
    await saveCheckpoint(week, { weight: Math.round(v * 10) / 10 });
    setW('');
  };

  const onFile = async (angle, file) => {
    if (!file) return;
    try {
      await saveCheckpoint(week, { photos: { [angle]: file } });
    } catch {
      // compression/IDB failure -> photo simply not saved
    }
  };

  const isDone = !!(entry.loggedDate || entry.weight || entry.frontPhotoId || entry.sidePhotoId || entry.backPhotoId);
  return (
    <section className={`card tcard${current && !isDone ? ' current' : ''}`}>
      <h3><Camera size={18} /> Week {week}
        <span className={`status ${isDone ? 'done' : 'todo'}`}>{isDone ? 'Logged' : 'Upcoming'}</span>
        <span className="muted head-note">
          {entry.loggedDate ? `logged ${formatShortDate(entry.loggedDate)}` : `${week * 7} days in`}
          {entry.weight ? ` · ${entry.weight} kg` : ''}
        </span>
      </h3>
      <div className="weight-form">
        <input
          className="input" type="number" inputMode="decimal" step="0.1" min="0"
          value={w} placeholder={entry.weight ? `Update (${entry.weight} kg)` : 'Weight in kg'}
          onChange={(e) => setW(e.target.value)} aria-label={`Week ${week} weight`}
        />
        <button className="btn" onClick={saveWeight}>Save</button>
      </div>
      <div className="photo-grid">
        {ANGLES.map((a) => (
          <div className="photo-cell" key={a}>
            <PhotoThumb id={entry[`${a}PhotoId`]} angle={a} onDelete={() => deleteCheckpointPhoto(week, a)} />
            <label className="btn-ghost">
              {entry[`${a}PhotoId`] ? 'Replace' : 'Upload'} {a}
              <input
                type="file" accept="image/*" hidden
                onChange={(e) => {
                  onFile(a, e.target.files && e.target.files[0]);
                  e.target.value = '';
                }}
              />
            </label>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
