import { Response } from 'express';
import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/user/services/UpdateUserAvatarService';
import asyncHandler from '@shared/infra/http/middleware/asyncHandler';

class UserAvatarController {
  // @desc Update the user avatar
  // @route PATCH /api/v1/users/avatar
  // @access Private
  public update = asyncHandler(
    async (req, res, _): Promise<Response | void> => {
      const updateUserAvatarService = container.resolve(
        UpdateUserAvatarService,
      );

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
}

export default UserAvatarController;
