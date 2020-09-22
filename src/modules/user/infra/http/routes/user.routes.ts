import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload.config';

import requireAuth from '@modules/user/infra/http/middleware/requireAuth';
import {
  createUser,
  getUsers,
  updateAvatar,
} from '../controllers/user.controller';

const userRouter = Router();
const upload = multer(uploadConfig);

userRouter.route('/').get(getUsers).post(createUser);
userRouter
  .route('/avatar')
  .patch(requireAuth, upload.single('avatar'), updateAvatar);

export default userRouter;
