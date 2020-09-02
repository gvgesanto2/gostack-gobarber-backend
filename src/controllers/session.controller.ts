import { Response } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';
import asyncHandler from '../middleware/asyncHandler';

// @desc Create Session
// @route POST /api/v1/sessions
// @access Public
export const createSession = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
    const { email, password } = req.body;

    const authenticateUserService = new AuthenticateUserService();

    const { user, token } = await authenticateUserService.execute({
      email,
      password,
    });

    delete user.password;

    res.status(200).json({
      success: true,
      token,
      data: {
        user,
      },
    });
  },
);
