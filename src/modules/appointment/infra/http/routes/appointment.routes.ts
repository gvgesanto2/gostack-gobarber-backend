import { Router } from 'express';

import requireAuth from '@modules/user/infra/http/middleware/requireAuth';
import AppointmentController from '../controllers/AppointmentController';

const appointmentRouter = Router();
const appointmentController = new AppointmentController();

appointmentRouter.use(requireAuth);

appointmentRouter
  .route('/')
  .get(appointmentController.list)
  .post(appointmentController.create);

export default appointmentRouter;
