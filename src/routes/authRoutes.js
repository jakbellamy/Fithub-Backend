import { authRequest } from "../controllers/authController";
import {auth} from '../middleware/auth'

const authRoutes = (app) => {
    app.route('/login')
    .post(authRequest);

    app.route('/auth')
    .post(auth)
}

export default authRoutes