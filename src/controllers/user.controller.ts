import { Request, Response, NextFunction } from 'express';

import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';

// @desc Get all users
// @route POST /api/v1/appointments
// @access Private (Admin)
export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

// @desc Register/Create a new user
// @route POST /api/v1/users
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
