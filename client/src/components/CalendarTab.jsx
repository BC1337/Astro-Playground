import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
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

  const handleEventDrop = (result) => {
    if (!result.destination) return;

    const updatedEvents = Array.from(events);
    const [reorderedItem] = updatedEvents.splice(result.source.index, 1);
    updatedEvents.splice(result.destination.index, 0, reorderedItem);

    setEvents(updatedEvents);
  };

  const CustomToolbar = () => {
    return (
      <div className="rbc-toolbar">
        <button className="custom-button" onClick={handleCustomButtonClick}>
          Custom Button
        </button>
      </div>
    );
  };

  const handleCustomButtonClick = () => {
    console.log('Custom button clicked');
  };

  return (
    <div>
      <h2>Calendar Tab Content</h2>
      <div style={{ height: 600 }}>
        <DragDropContext onDragEnd={handleEventDrop}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable={true}
            components={{
              toolbar: CustomToolbar
            }}
            // Render each event as a draggable item
            eventWrapper={({ event, children }) => (
              <Draggable draggableId={event.id} index={event.index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {children}
                  </div>
                )}
              </Draggable>
            )}
          />
        </DragDropContext>
      </div>
    </div>
  );
};

export default CalendarTab;
