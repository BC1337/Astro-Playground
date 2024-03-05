import React, { useState } from 'react';
import WorkoutCard from './WorkoutCard'; // Create this component separately
import '../styles/workoutPlans.css';

const WorkoutPlans = () => {
  const workouts = [
    {
      id: 1,
      muscleGroup: 'Legs',
      name: 'Squats',
      description: 'Build lower body strength and improve flexibility.',
    },
    {
      id: 2,
      muscleGroup: 'Chest',
      name: 'Push-ups',
      description: 'Strengthen your chest, shoulders, and triceps.',
    },
    {
      id: 3,
      muscleGroup: 'Back',
      name: 'Deadlifts',
      description: 'Develop overall strength and muscle mass.',
    },
    {
      id: 4,
      muscleGroup: 'Arms',
      name: 'Bicep Curls',
      description: 'Target the biceps for increased muscle mass and strength.',
    },
    {
      id: 5,
      muscleGroup: 'Shoulders',
      name: 'Shoulder Press',
      description: 'Strengthen and build muscle in the shoulders and arms.',
    },
    {
      id: 6,
      muscleGroup: 'Legs',
      name: 'Lunges',
      description: 'Improve balance and coordination while targeting the legs.',
    },
    {
      id: 7,
      muscleGroup: 'Chest',
      name: 'Bench Press',
      description: 'Build strength and mass in the chest and triceps.',
    },
    {
      id: 8,
      muscleGroup: 'Back',
      name: 'Pull-ups',
      description: 'Strengthen the back and arms with this bodyweight exercise.',
    },
    {
      id: 9,
      muscleGroup: 'Arms',
      name: 'Tricep Dips',
      description: 'Isolate and strengthen the triceps muscles.',
    },
    {
      id: 10,
      muscleGroup: 'Shoulders',
      name: 'Lateral Raises',
      description: 'Target the lateral deltoids for broader shoulders.',
    },
    {
      id: 11,
      muscleGroup: 'Legs',
      name: 'Leg Press',
      description: 'Build leg strength and muscle without loading the spine.',
    },
    {
      id: 12,
      muscleGroup: 'Chest',
      name: 'Dumbbell Flyes',
      description: 'Isolate the chest muscles for a well-rounded chest workout.',
    },
    {
      id: 13,
      muscleGroup: 'Back',
      name: 'Seated Rows',
      description: 'Target the mid-back muscles for improved posture and strength.',
    },
    {
      id: 14,
      muscleGroup: 'Arms',
      name: 'Hammer Curls',
      description: 'Build forearm and bicep strength with this variation of curls.',
    },
    {
      id: 15,
      muscleGroup: 'Shoulders',
      name: 'Front Raises',
      description: 'Target the front deltoids for balanced shoulder development.',
    },
  ];

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState('All'); // Default to show all workouts

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleTabClick = (muscleGroup) => {
    setSelectedMuscleGroup(muscleGroup);
  };
  

  const filteredWorkouts = selectedMuscleGroup === 'All' ? workouts : workouts.filter(workout => workout.muscleGroup.toLowerCase() === selectedMuscleGroup.toLowerCase());

  return (
    <div className="workout-plans-container">
      <h2>Workout Plans</h2>
      <div className="tabs">
  <button className={selectedMuscleGroup === 'All' ? 'active' : ''} onClick={(event) => handleTabClick('All', event)}>All</button>
  <button className={selectedMuscleGroup === 'Legs' ? 'active' : ''} onClick={(event) => handleTabClick('Legs', event)}>Legs</button>
  <button className={selectedMuscleGroup === 'Chest' ? 'active' : ''} onClick={(event) => handleTabClick('Chest', event)}>Chest</button>
  <button className={selectedMuscleGroup === 'Back' ? 'active' : ''} onClick={(event) => handleTabClick('Back', event)}>Back</button>
  <button className={selectedMuscleGroup === 'Arms' ? 'active' : ''} onClick={(event) => handleTabClick('Arms', event)}>Arms</button>
  <button className={selectedMuscleGroup === 'Shoulders' ? 'active' : ''} onClick={(event) => handleTabClick('Shoulders', event)}>Shoulders</button>
</div>


      <div className="workout-cards">
        {filteredWorkouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
      </div>
    </div>
  );
};

export default WorkoutPlans;
