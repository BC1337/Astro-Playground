import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/workoutCard.css';

const WorkoutCard = ({ workout }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleConfirmDate = () => {
    // Add logic to save the selected date
    setIsDatePickerOpen(false);
  };

  const handleCancelDate = () => {
    // Add logic to discard the selected date
    setSelectedDate('');
    setIsDatePickerOpen(false);
  };

  return (
    <div className="workout-card">
      <h3>{workout.name}</h3>
      <p><strong>Muscle Group:</strong> {workout.muscleGroup}</p>
      <p>{workout.description}</p>
      
      <div className="custom-date-picker">
        {!isDatePickerOpen && (
          <button className="date-picker-toggle" onClick={() => setIsDatePickerOpen(true)}>
            Add to calendar
          </button>
        )}
        {isDatePickerOpen && (
          <>
            <input
              type="date"
              value={selectedDate}
              onChange={handleDateChange}
            />
            <div className="date-picker-actions">
              <button className="cancel-button" onClick={handleCancelDate}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <button className="confirm-button" onClick={handleConfirmDate}>
                <FontAwesomeIcon icon={faCheck} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WorkoutCard;
