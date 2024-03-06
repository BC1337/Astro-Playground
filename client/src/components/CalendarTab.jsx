import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios'; // Import Axios
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar.css';

const localizer = momentLocalizer(moment);

const CalendarTab = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch workout events from the server when component mounts
    fetchWorkoutEvents();
  }, []);

  const fetchWorkoutEvents = () => {
    // Fetch workout events from the server using Axios
    axios.get('http://localhost:3001/api/auth/workout-events')
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.error('Error fetching workout events:', error);
      });
  };

  const handleCustomButtonClick = () => {
    console.log('Custom button clicked');
  };

  const CustomToolbar = () => {
    return (
      <div className="rbc-toolbar">
        <button className="custom-button" onClick={handleCustomButtonClick}>
          Custom Button
        </button>
        {/* You can add more buttons here */}
      </div>
    );
  };

  return (
    <div>
      <h2>Calendar Tab Content</h2>
      <div style={{ height: 500 }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          components={{
            toolbar: CustomToolbar
          }}
        />
      </div>
    </div>
  );
};

export default CalendarTab;
