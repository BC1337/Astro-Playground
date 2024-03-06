import React, { useState } from 'react';
import '../styles/workoutCard.css';

// this card component is used in workoutplan.jsx

const WorkoutCard = ({ workout }) => {
  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  return (
    <div className="workout-card">
      <h3>{workout.name}</h3>
      <p><strong>Muscle Group:</strong> {workout.muscleGroup}</p>
      <p>{workout.description}</p>
      
      {/* Custom date picker */}
      <div className="custom-date-picker">
        <label htmlFor={`date-${workout.id}`}>Select a Date:</label>
        <input
          type="date"
          id={`date-${workout.id}`}
          value={selectedDate}
          onChange={handleDateChange}
        />
      </div>
    </div>
  );
};

export default WorkoutCard;
