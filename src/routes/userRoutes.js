import { addNewUser, getUserWithID, updateUser, deleteUser, getUsers } from "../controllers/userController";
import { auth } from "../middleware/auth";

const userRoutes = (app) => {
    app.route('/users')
    .get(auth, getUsers)
    
    app.route('/register')
    .post(addNewUser);

    app.route('/user/:userId')
    .get(auth, getUserWithID)
    .put(auth, updateUser)
    .delete(auth, deleteUser);
}

export default userRoutes
