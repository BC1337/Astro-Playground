import React, { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import '../styles/workoutCard.css';

const WorkoutCard = ({ workout }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleConfirmDate = async () => {
    try {
      // Retrieve the token from local storage
      const token = localStorage.getItem('token');
  
      // Ensure that the token is not undefined
      if (!token) {
        console.error('Token is missing');
        return;
      }
  
      // Attach the token to the headers of the Axios request
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Convert the selected date to ISO-8601 format
      const isoDate = new Date(selectedDate).toISOString();
  
      // Send the request with the token attached
      const response = await axios.post(
        'http://localhost:3001/api/auth/workout-events',
        {
          workout: workout.name,
          date: isoDate, // Use ISO-8601 formatted date
        },
        config
      );
  
      console.log('Workout event created:', response.data);
      setIsDatePickerOpen(false);
    } catch (error) {
      console.error('Error creating workout event:', error);
      // Handle error display or notification to the user
    }
  };
  

  const handleCancelDate = () => {
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
