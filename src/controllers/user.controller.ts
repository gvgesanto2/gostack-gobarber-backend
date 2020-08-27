import { Request, Response, NextFunction } from 'express';

import CreateUserService from '../services/CreateUserService';

// @desc Create a new appointment
// @route POST /api/v1/appointments
// @access Public
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  console.log('');
};

// @desc Create a new appointment
// @route POST /api/v1/appointments
// @access Public
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { name, email, password } = req.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    delete user.password;

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
