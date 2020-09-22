import path from 'path';
import fs from 'fs';

import { getRepository } from 'typeorm';

import uploadConfig from '@config/upload.config';
import ErrorResponse from '@shared/errors/ErrorResponse';
import User from '../infra/typeorm/entities/User';

interface ServiceRequest {
  userId: string;
  avatarFilename: string;
}

class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: ServiceRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(userId);

    if (!user) {
      throw new ErrorResponse(
        'Only authenticated users can change avatar.',
        401,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
