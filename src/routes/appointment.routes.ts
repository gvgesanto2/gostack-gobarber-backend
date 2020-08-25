import { Router } from 'express';

import {
  getAppointment,
  createAppointment,
} from '../controllers/appointment.controller';

const appointmentRouter = Router();

appointmentRouter.route('/').get(getAppointment).post(createAppointment);

export default appointmentRouter;
