import { container } from 'tsyringe';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload.config';
import ITokenProvider from '@modules/user/providers/token-provider/models/ITokenProvider';
import requireAuth from '@modules/user/infra/http/middleware/requireAuth';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';

const userRouter = Router();
const userController = new UserController();
const userAvatarController = new UserAvatarController();
const tokenProvider = container.resolve<ITokenProvider>('TokenProvider');

const upload = multer(uploadConfig);

userRouter.route('/').get(userController.list).post(userController.create);
userRouter
  .route('/avatar')
  .patch(requireAuth(tokenProvider), upload.single('avatar'), userAvatarController.update);

export default userRouter;
