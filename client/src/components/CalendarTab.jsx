import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import '../styles/calendar.css';

const localizer = momentLocalizer(moment);

const CalendarTab = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchWorkoutEvents();
  }, []);

  const fetchWorkoutEvents = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Missing token');
      return;
    }

    axios.get('http://localhost:3001/api/auth/workout-events', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(response => {
      const eventsData = response.data.map((event, index) => ({
        id: `${event.id}`, // Ensure id is a string
        title: event.workout,
        start: new Date(event.date),
        end: new Date(event.date),
        index: index // Store the index of the event
      }));
      setEvents(eventsData);
    })
    .catch(error => {
      console.error('Error fetching workout events:', error);
    });
  }; 
  

  const CustomToolbar = ({ label, onNavigate, onView }) => {
    return (
      <div className="rbc-toolbar">
        <span className="rbc-toolbar-label">{label}</span>
        <span className="rbc-btn-group">
          <button type="button" onClick={() => onNavigate('PREV')}>Back</button>
          <button type="button" onClick={() => onNavigate('TODAY')}>Today</button>
          <button type="button" onClick={() => onNavigate('NEXT')}>Next</button>
          <button type="button" onClick={() => onView('agenda')}>Agenda</button>
        </span>
      </div>
    );
  };

  return (
    <div>
      <div style={{ height: 600 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            onSelectSlot={(slotInfo) => console.log('Selected slot:', slotInfo)}
            onSelectEvent={(event) => console.log('Selected event:', event)}
            resizable
            style={{ minHeight: 500 }}
            components={{
              toolbar: CustomToolbar // Customize the toolbar with your custom component
            }}
          />
      </div>
    </div>
  );
};

export default CalendarTab;
