import { Router } from 'express';

import { createUser, getUsers } from '../controllers/user.controller';

const userRouter = Router();

userRouter.route('/').get(getUsers).post(createUser);

export default userRouter;
