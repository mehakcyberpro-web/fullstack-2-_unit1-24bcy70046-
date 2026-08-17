import { useEffect, useMemo, useRef, useState } from 'react';
export function PerformanceDemo(){
 const [items,setItems]=useState(Array.from({length:500},(_,i)=>i+1));
 const [query,setQuery]=useState(''); const renderCount=useRef(0); renderCount.current++;
 const filtered=useMemo(()=>items.filter(i=>String(i).includes(query)),[items,query]);
 useEffect(()=>{document.title=`Filtered ${filtered.length}`},[filtered.length]);
 return <section><h2>1.4.2 Performance & Testing Demo</h2><p>Render count: {renderCount.current}</p><input placeholder="Filter 1–500" value={query} onChange={e=>setQuery(e.target.value)}/><div className="perf-list">{filtered.map(i=><span key={i}>{i}</span>)}</div></section>
}
