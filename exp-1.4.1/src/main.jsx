import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import './styles.css';

const initialPosts = [
  { id: '1', title: 'Cybersecurity Tips', start: '2026-08-18T10:00:00', backgroundColor: '#2563eb' },
  { id: '2', title: 'Club Announcement', start: '2026-08-20T14:00:00', backgroundColor: '#7c3aed' },
  { id: '3', title: 'Workshop Reminder', start: '2026-08-22T11:30:00', backgroundColor: '#059669' }
];

function App() {
  const [events, setEvents] = useState(initialPosts);
  const [selected, setSelected] = useState(null);

  const addPost = () => {
    const title = window.prompt('Enter post title:');
    if (!title) return;
    const date = window.prompt('Enter date and time (YYYY-MM-DDTHH:mm):', '2026-08-25T10:00');
    if (!date) return;
    setEvents(prev => [...prev, { id: crypto.randomUUID(), title, start: date, backgroundColor: '#ea580c' }]);
  };

  const handleEventDrop = info => {
    setEvents(prev => prev.map(e => e.id === info.event.id ? { ...e, start: info.event.startStr } : e));
  };

  const handleEventClick = info => {
    setSelected({ title: info.event.title, date: info.event.start?.toLocaleString() });
  };

  return (
    <main className="app">
      <header className="hero">
        <div><span className="badge">EXPERIMENT 1.4.1</span><h1>Post Scheduler</h1><p>Interactive calendar for scheduling and managing social posts.</p></div>
        <button onClick={addPost}>＋ Schedule Post</button>
      </header>
      <section className="stats">
        <div><b>{events.length}</b><span>Scheduled Posts</span></div>
        <div><b>Day / Week / Month</b><span>Calendar Views</span></div>
        <div><b>Drag & Drop</b><span>Reschedule Events</span></div>
      </section>
      <section className="calendar-card">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{ left: 'prev,next today', center: 'title', right: 'dayGridMonth,timeGridWeek,timeGridDay' }}
          events={events}
          editable
          selectable
          eventDrop={handleEventDrop}
          eventClick={handleEventClick}
          height="auto"
        />
      </section>
      {selected && <div className="modal" onClick={() => setSelected(null)}><div className="dialog" onClick={e => e.stopPropagation()}><h2>{selected.title}</h2><p>Scheduled: {selected.date}</p><button onClick={() => setSelected(null)}>Close</button></div></div>}
      <footer>Temporal Data Visualization • Event Mapping • HCI • Interactive Scheduling</footer>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
