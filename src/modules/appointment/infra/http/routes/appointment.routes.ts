import { container } from 'tsyringe';
import { Router } from 'express';

import requireAuth from '@modules/user/infra/http/middleware/requireAuth';
import ITokenProvider from '@modules/user/providers/token-provider/models/ITokenProvider';
import AppointmentController from '../controllers/AppointmentController';

const appointmentRouter = Router();
const appointmentController = container.resolve(
  AppointmentController,
);
const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');

appointmentRouter.use(requireAuth(tokenProvider));

appointmentRouter
  .route('/')
  .get(appointmentController.list)
  .post(appointmentController.create);

export default appointmentRouter;
