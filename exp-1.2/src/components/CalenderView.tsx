import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useAppSelector } from "../app/hooks";
import { selectDrafts } from "../features/drafts/draftSelectors";

const CalendarView = () => {
  const drafts = useAppSelector(selectDrafts);

const events = drafts.map((draft) => ({
  id: draft.id,
  title: draft.title,
  start: `${draft.scheduledDate}T${draft.scheduledTime}`,
}));
  return (
    <div style={{ padding: "20px" }}>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        events={events}
      />
    </div>
  );
};

export default CalendarView;