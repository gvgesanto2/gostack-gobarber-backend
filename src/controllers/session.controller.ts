import { Request, Response, NextFunction } from 'express';

import AuthenticateUserService from '../services/AuthenticateUserService';

// @desc Create Session
// @route POST /api/v1/sessions
// @access Public
export const createSession = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
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
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
