import { authRequest } from "../controllers/authController";

const authRoutes = (app) => {
    app.route('/login')
    .post(authRequest);
}

export default authRoutes