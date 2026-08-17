import React, { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './style.css';

type Role = 'Admin' | 'Editor' | 'Viewer';
type Claims = { sub:string; name:string; role:Role; exp:number };

const demoUsers = [
  { email:'admin@demo.com', password:'admin123', name:'Admin User', role:'Admin' as Role },
  { email:'editor@demo.com', password:'editor123', name:'Editor User', role:'Editor' as Role },
  { email:'viewer@demo.com', password:'viewer123', name:'Viewer User', role:'Viewer' as Role },
];

function base64url(value:string){ return btoa(unescape(encodeURIComponent(value))).replace(/=/g,'').replace(/\\+/g,'-').replace(/\\//g,'_'); }
function createDemoJWT(user: typeof demoUsers[number]){
  const header = base64url(JSON.stringify({alg:'HS256',typ:'JWT'}));
  const payload = base64url(JSON.stringify({sub:user.email,name:user.name,role:user.role,exp:Math.floor(Date.now()/1000)+3600}));
  return `${header}.${payload}.demo-signature`;
}
function saveSession(user: typeof demoUsers[number]) { sessionStorage.setItem('jwt_demo', createDemoJWT(user)); }
function getClaims(): Claims|null {
  const token=sessionStorage.getItem('jwt_demo'); if(!token) return null;
  try { const c=jwtDecode<Claims>(token); return c.exp*1000>Date.now()?c:null; } catch { return null; }
}

function Login(){
  const [email,setEmail]=useState('admin@demo.com'), [password,setPassword]=useState('admin123'), [error,setError]=useState('');
  const navigate=useNavigate();
  function submit(e:React.FormEvent){e.preventDefault(); const u=demoUsers.find(x=>x.email===email&&x.password===password); if(!u){setError('Invalid demo credentials');return;} saveSession(u); navigate('/dashboard');}
  return <main className="center"><form className="card auth" onSubmit={submit}><span className="badge">EXP 1.3.1</span><h1>JWT Authentication</h1><p>Stateless login demonstration using a simulated JWT.</p><label>Email<input value={email} onChange={e=>setEmail(e.target.value)} /></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} /></label>{error&&<div className="error">{error}</div>}<button>Login</button><small>Demo: admin@demo.com / admin123</small></form></main>
}
function Dashboard(){const claims=getClaims(); if(!claims)return <Navigate to="/login"/>; return <><nav><b>JWT Lab</b><div><Link to="/dashboard">Dashboard</Link><Link to="/rbac">RBAC</Link><Link to="/calendar">Calendar</Link><button onClick={()=>{sessionStorage.removeItem('jwt_demo');location.href='/login'}}>Logout</button></div></nav><main className="grid"><section className="card"><span className="badge">AUTHENTICATED</span><h2>Welcome, {claims.name}</h2><p>Role: <strong>{claims.role}</strong></p><p>Token is kept in <code>sessionStorage</code> for this classroom demo.</p></section><section className="card"><h3>Decoded JWT claims</h3><pre>{JSON.stringify(claims,null,2)}</pre></section></main></>}
function RequireRole({roles,children}:{roles:Role[];children:React.ReactNode}){const c=getClaims(); if(!c)return <Navigate to="/login"/>; return roles.includes(c.role)?children:<Navigate to="/rbac"/>}
function RBAC(){const c=getClaims(); if(!c)return <Navigate to="/login"/>; const permissions:Record<Role,string[]>={Admin:['Create users','Delete posts','View analytics'],Editor:['Create posts','Edit posts'],Viewer:['Read posts']}; return <><nav><b>RBAC</b><div><Link to="/dashboard">Dashboard</Link><Link to="/calendar">Calendar</Link></div></nav><main className="grid"><section className="card"><h1>Role-Based Access Control</h1><p>Signed-in role: <strong>{c.role}</strong></p>{permissions[c.role].map(x=><div className="permission" key={x}>✓ {x}</div>)}</section><RequireRole roles={['Admin']}><section className="card"><h2>Admin-only panel</h2><p>This route is available only to Admin.</p><button onClick={()=>alert('Admin action allowed')}>Test Admin Action</button></section></RequireRole></main></>}
const initialEvents=[{id:1,title:'Cybersecurity Workshop',date:'2026-08-18',time:'10:00'},{id:2,title:'Content Review',date:'2026-08-20',time:'14:00'},{id:3,title:'Team Meeting',date:'2026-08-24',time:'11:30'}];
function Calendar(){const [events,setEvents]=useState(initialEvents),[title,setTitle]=useState(''),[date,setDate]=useState('2026-08-25'),[time,setTime]=useState('10:00'); const sorted=useMemo(()=>[...events].sort((a,b)=>(a.date+a.time).localeCompare(b.date+b.time)),[events]); return <><nav><b>Post Scheduler</b><Link to="/dashboard">Dashboard</Link></nav><main className="calendar"><section className="card"><h1>Interactive Schedule</h1><div className="formrow"><input placeholder="Post title" value={title} onChange={e=>setTitle(e.target.value)}/><input type="date" value={date} onChange={e=>setDate(e.target.value)}/><input type="time" value={time} onChange={e=>setTime(e.target.value)}/><button onClick={()=>{if(title.trim()){setEvents([...events,{id:Date.now(),title,date,time}]);setTitle('')}}}>Schedule</button></div>{sorted.map(e=><article className="event" key={e.id}><div><strong>{e.title}</strong><small>{e.date} · {e.time}</small></div><button onClick={()=>setEvents(events.filter(x=>x.id!==e.id))}>Delete</button></article>)}</section></main></>}
function App(){return <BrowserRouter><Routes><Route path="/" element={<Navigate to="/login"/>}/><Route path="/login" element={<Login/>}/><Route path="/dashboard" element={<Dashboard/>}/><Route path="/rbac" element={<RBAC/>}/><Route path="/calendar" element={<Calendar/>}/></Routes></BrowserRouter>}
export default App;
