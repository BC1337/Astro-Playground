import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '../styles/calendar.css';

const localizer = momentLocalizer(moment);

const CalendarTab = ({ selectedDate }) => {
  const events = [
    {
      title: 'Event 1',
      start: selectedDate,
      end: selectedDate,
    },
    // Add more events as needed
  ];

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
