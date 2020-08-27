import { Router } from 'express';

import { createUser } from '../controllers/user.controller';

const userRouter = Router();

userRouter.route('/').post(createUser);

export default userRouter;
