import { Router } from 'express';

import { createSession } from '../controllers/session.controller';

const sessionRouter = Router();

sessionRouter.route('/').post(createSession);

export default sessionRouter;
