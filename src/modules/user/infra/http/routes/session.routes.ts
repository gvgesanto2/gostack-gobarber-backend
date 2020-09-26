import { Router } from 'express';

import SessionController from '../controllers/SessionController';

const sessionRouter = Router();
const sessionController = new SessionController();

sessionRouter.route('/').post(sessionController.create);

export default sessionRouter;
