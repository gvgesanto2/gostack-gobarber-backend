import { Response } from 'express';

import { getRepository } from 'typeorm';

import CreateUserService from '../services/CreateUserService';
import User from '../models/User';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import asyncHandler from '../middleware/asyncHandler';

// @desc Get all users
// @route POST /api/v1/users
// @access Private (Admin)
export const getUsers = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
    const usersRepository = getRepository(User);
    const users = await usersRepository.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users,
    });
  },
);

// @desc Register/Create a new user
// @route POST /api/v1/users
// @access Public
export const createUser = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
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
  },
);

// @desc Register/Create a new user
// @route PATCH /api/v1/users/avatar
// @access Private
export const updateAvatar = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
    const updateUserAvatarService = new UpdateUserAvatarService();

    const user = await updateUserAvatarService.execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    delete user.password;

    res.status(200).json({
      success: true,
      data: user,
    });
  },
);
