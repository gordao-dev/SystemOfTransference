import { Router } from "express";
import { celebrate, Segments, Joi } from 'celebrate'

import AuthController from 'Shared/Containers/AuthProvider/Controllers/AuthController'st usersRoutes = Router();
import SessionsController from '../Controllers/SessionsController'

const usersRoutes = Router()

const authController = new AuthController()
const sessionsController = new SessionsController()

usersRoutes.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        },
    }),
    sessionsController.create,
)

usersRoutes.use(authController.on)
usersRoutes.delete('/', sessionsController.delete)
usersRoutes.get('/', sessionsController.show)

export default usersRoutes