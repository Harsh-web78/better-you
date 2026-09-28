import {useEffect,useMemo,useState} from 'react';
// Local-date key (YYYY-MM-DD in the user's timezone). The previous version
// used new Date().toISOString() which is UTC, so the checklist rolled over
// at 05:30 IST instead of local midnight.
function localDayKey(d=new Date()){
 const y=d.getFullYear();
 const m=String(d.getMonth()+1).padStart(2,'0');
 const day=String(d.getDate()).padStart(2,'0');
 return `${y}-${m}-${day}`;
}
function readChecks(key){
 try{return JSON.parse(localStorage.getItem(key)||'{}')}
 catch{return {}}
}
export function useTracker(){
 const [dayKey,setDayKey]=useState(()=>localDayKey());
 const key='better-you-checks-'+dayKey;
 const [checks,setChecks]=useState(()=>readChecks(key));
 // If the app stays open past local midnight, pick up the new day.
 useEffect(()=>{
  const t=setInterval(()=>{
   const k=localDayKey();
   setDayKey(prev=>prev===k?prev:k);
  },30000);
  return ()=>clearInterval(t);
 },[]);
 // Load the new day's checklist when the day rolls over.
 useEffect(()=>{setChecks(readChecks(key))},[key]);
 useEffect(()=>{try{localStorage.setItem(key,JSON.stringify(checks))}catch{}},[key,checks]);
 const toggle=(id)=>setChecks(v=>({...v,[id]:!v[id]}));
 const done=useMemo(()=>Object.values(checks).filter(Boolean).length,[checks]);
 return {checks,toggle,done};
}
