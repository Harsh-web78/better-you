import {useEffect,useMemo,useState} from 'react';
export function useTracker(){
 const key='better-you-checks-'+new Date().toISOString().slice(0,10);
 const [checks,setChecks]=useState(()=>JSON.parse(localStorage.getItem(key)||'{}'));
 useEffect(()=>localStorage.setItem(key,JSON.stringify(checks)),[key,checks]);
 const toggle=(id)=>setChecks(v=>({...v,[id]:!v[id]}));
 const done=useMemo(()=>Object.values(checks).filter(Boolean).length,[checks]);
 return {checks,toggle,done};
}
