import React,{useMemo,useState} from 'react';
import {CalendarDays,Dumbbell,Utensils,ChevronRight,Sun,ShieldCheck} from 'lucide-react';
import {WORKOUT_PLAN,POSTURE} from './data/workoutPlan';
import {ROUTINE,DIET} from './data/routine';
import {useTracker} from './hooks/useTracker';
import './styles.css';

const DAYS=['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
function today(){return new Intl.DateTimeFormat('en-US',{weekday:'long'}).format(new Date())}
function App(){
 const [tab,setTab]=useState('Today');
 const day=useMemo(()=>today(),[]); const [selectedDay,setSelectedDay]=useState(day); const workout=WORKOUT_PLAN[day]; const selectedWorkout=WORKOUT_PLAN[selectedDay];
 const {checks,toggle,done}=useTracker();
 const nav=[['Today',CalendarDays],['Workout',Dumbbell],['Diet',Utensils]];
 return <div className="app">
  <header><div><span className="eyebrow">PERSONAL TRANSFORMATION</span><h1>Better You</h1><p>Build the physique, posture, skin and habits you want — one day at a time.</p></div><div className="date"><b>{day}</b><span>{new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short'})}</span></div></header>
  <nav>{nav.map(([n,I])=><button className={tab===n?'active':''} onClick={()=>setTab(n)} key={n}><I size={17}/>{n}</button>)}</nav>
  {tab==='Today'&&<main>
   <section className="hero"><div><span className="pill">TODAY’S PLAN</span><h2>{workout.title}</h2><p>{workout.focus}</p></div><div className="progress"><strong>{done}</strong><span>habits checked</span></div></section>
   <section className="grid">
    <Card title="Full-day routine" icon={<CalendarDays size={18}/>}>{ROUTINE.map((r,i)=><label className="row" key={r[0]+i}><input type="checkbox" checked={!!checks['r'+i]} onChange={()=>toggle('r'+i)}/><span className="time">{r[0]}</span><span><b>{r[1]}</b><small>{r[2]}</small></span></label>)}</Card>
    <Card title="Today’s workout" icon={<Dumbbell size={18}/>}><WorkoutList workout={workout}/><button className="link" onClick={()=>setTab('Workout')}>Open full workout <ChevronRight size={16}/></button></Card>
   </section>
   <Card title="Daily posture" icon={<ShieldCheck size={18}/>}><div className="mini-grid">{POSTURE.map((p,i)=><label className="mini" key={p[0]}><input type="checkbox" checked={!!checks['p'+i]} onChange={()=>toggle('p'+i)}/><span><b>{p[0]}</b><small>{p[1]}</small></span></label>)}</div></Card>
  </main>}
  {tab==='Workout'&&<main><section className="section-head"><span className="pill">6-DAY PLAN</span><h2>Aesthetic Home Training</h2><p>2 × 3 kg plates · ~60 min · controlled reps · progressive overload.</p></section><div className="day-tabs">{DAYS.map(d=><button className={d===selectedDay?'selected':''} onClick={()=>setSelectedDay(d)} key={d}>{d.slice(0,3)}</button>)}</div><Card title={selectedWorkout.title} icon={<Dumbbell size={18}/>}><p className="muted">{selectedWorkout.focus}</p><WorkoutList workout={selectedWorkout}/></Card><Card title="Progression rules"><ul className="bullets"><li>Add reps before adding sets.</li><li>Then use a 3–4 sec lowering phase or a pause.</li><li>When 25 reps are easy with clean form, use a harder variation or eventually heavier resistance.</li><li>Neck work stays light: no loaded neck circles, jerking or bridges.</li></ul></Card></main>}
  {tab==='Diet'&&<main><section className="section-head"><span className="pill">NUTRITION</span><h2>Eat to build, not just to look lean</h2><p>Starting estimates — adjust using your 2–3 week weight trend.</p></section><div className="cards"><Card title="Daily targets"><ul className="bullets">{DIET.targets.map(x=><li key={x}>{x}</li>)}</ul></Card><Card title="Protein rotation"><Chips items={DIET.protein}/></Card><Card title="Fruit rotation"><Chips items={DIET.fruits}/></Card><Card title="Seed mix"><Chips items={DIET.seeds}/></Card><Card title="Skin basics"><ul className="bullets"><li>Morning: gentle cleanser → moisturizer → SPF 30–50.</li><li>Night: gentle cleanser → moisturizer.</li><li>If you have no cleanser yet, use plain water gently rather than harsh DIY scrubs.</li><li>Do not use lemon, toothpaste or baking soda on your face.</li></ul></Card><Card title="Avoid / limit"><Chips items={DIET.avoid}/></Card></div></main>}
  <footer><Sun size={15}/> Consistency beats complexity · Sleep 7.5–8.5 h · Food first, supplements second.</footer>
 </div>
}
function Card({title,icon,children}){return <section className="card"><h3>{icon}{title}</h3>{children}</section>}
function WorkoutList({workout}){return <div className="exercise-list">{workout.exercises.map((e,i)=><div className="exercise" key={e[0]+i}><span className="num">{i+1}</span><div><b>{e[0]}</b><small>{e[1]}</small></div><span className="rest">Rest {e[2]}</span></div>)}</div>}
function Chips({items}){return <div className="chips">{items.map(x=><span key={x}>{x}</span>)}</div>}
export default App;
