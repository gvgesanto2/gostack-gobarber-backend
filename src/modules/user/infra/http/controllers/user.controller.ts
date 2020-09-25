import { Response } from 'express';

import { getRepository } from 'typeorm';

import CreateUserService from '@modules/user/services/CreateUserService';
import User from '@modules/user/infra/typeorm/entities/User';
import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';
import asyncHandler from '@shared/infra/http/middleware/asyncHandler';
import { container } from 'tsyringe';

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

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  },
);

// @desc Register/Create a new user
// @route PATCH /api/v1/users/avatar
// @access Private
export const updateAvatar = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      userId: req.user.id,
      avatarFilename: req.file.filename,
    });

    const userWithoutPassword = {
      ...user,
      password: undefined,
    };

    res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  },
);
