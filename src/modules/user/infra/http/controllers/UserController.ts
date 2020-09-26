import { Response } from 'express';
import { container } from 'tsyringe';

import CreateUserService from '@modules/user/services/CreateUserService';
import asyncHandler from '@shared/infra/http/middleware/asyncHandler';
import ListUsersService from '@modules/user/services/ListUsersService';

class UserController {
  // @desc Get all users
  // @route POST /api/v1/users
  // @access Private (Admin)
  public list = asyncHandler(
    async (req, res, _): Promise<Response | void> => {
      const listUsersService = container.resolve(ListUsersService);

      const users = await listUsersService.execute();

      res.status(200).json({
        success: true,
        data: users,
      });
    },
  );

  // @desc Register/Create a new user
  // @route POST /api/v1/users
  // @access Public
  public create = asyncHandler(
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
}

export default UserController;
