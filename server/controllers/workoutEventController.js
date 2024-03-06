import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Controller method to create a new workout event
async function createWorkoutEvent(req, res) {
  try {
    const { workout, date } = req.body;
    const newWorkoutEvent = await prisma.workoutEvent.create({
      data: {
        workout,
        date,
      },
    });
    res.json(newWorkoutEvent);
  } catch (error) {
    console.error('Error creating workout event:', error);
    res.status(500).json({ message: 'Failed to create workout event' });
  }
}

// Controller method to fetch all workout events
async function getWorkoutEvents(req, res) {
    try {
      const workoutEvents = await prisma.workoutEvent.findMany();
      res.json(workoutEvents);
    } catch (error) {
      console.error('Error fetching workout events:', error);
      res.status(500).json({ message: 'Failed to fetch workout events' });
    }
  }

// Other CRUD operation handlers go here...

export { createWorkoutEvent, getWorkoutEvents };
