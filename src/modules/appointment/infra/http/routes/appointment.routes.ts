import { Router } from 'express';

import requireAuth from '@modules/user/infra/http/middleware/requireAuth';
import { createAppointment } from '../controllers/appointment.controller';

const appointmentRouter = Router();

appointmentRouter.use(requireAuth);

appointmentRouter.route('/').get().post(createAppointment);

export default appointmentRouter;
