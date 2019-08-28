import { addNewWorkout, getWorkoutWithID, updateWorkout, deleteWorkout, getWorkouts } from "../controllers/workoutController";
import { auth } from "../middleware/auth";

const workoutRoutes = (app) => {
    app.route('/workouts')
    .get(auth, getWorkouts)
    .post(auth, addNewWorkout);

    app.route('/workout/:workoutId')
    .get(auth, getWorkoutWithID)
    .put(auth, updateWorkout)
    .delete(auth, deleteWorkout);
}

export default workoutRoutes