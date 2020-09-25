import { Response } from 'express';

import AuthenticateUserService from '@modules/user/services/AuthenticateUserService';
import asyncHandler from '@shared/infra/http/middleware/asyncHandler';
import { container } from 'tsyringe';

// @desc Create Session
// @route POST /api/v1/sessions
// @access Public
export const createSession = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
    const { email, password } = req.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);

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
