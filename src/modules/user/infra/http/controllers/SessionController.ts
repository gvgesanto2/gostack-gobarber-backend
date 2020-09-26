import { Response } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import asyncHandler from '@shared/infra/http/middleware/asyncHandler';

class SessionController {
  // @desc Create Session
  // @route POST /api/v1/sessions
  // @access Public
  public create = asyncHandler(
    async (req, res, _): Promise<Response | void> => {
      const { email, password } = req.body;

      const authenticateUserService = container.resolve(
        AuthenticateUserService,
      );

      const { user, token } = await authenticateUserService.execute({
        email,
        password,
      });

      const userWithoutPassword = {
        ...user,
        password: undefined,
      };

      res.status(200).json({
        success: true,
        token,
        data: {
          user: userWithoutPassword,
        },
      });
    },
  );
}

export default SessionController;
