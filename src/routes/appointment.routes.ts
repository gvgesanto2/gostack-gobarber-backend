import { Router } from 'express';

import {
  getAppointments,
  createAppointment,
} from '../controllers/appointment.controller';

import requireAuth from '../middleware/requireAuth';

const appointmentRouter = Router();

appointmentRouter.use(requireAuth);

appointmentRouter.route('/').get(getAppointments).post(createAppointment);

export default appointmentRouter;
