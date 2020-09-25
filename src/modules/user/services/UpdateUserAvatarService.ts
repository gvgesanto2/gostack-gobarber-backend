/* eslint-disable prettier/prettier */
import path from 'path';
import fs from 'fs';

import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload.config';
import ErrorResponse from '@shared/errors/ErrorResponse';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IServiceRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    userId,
    avatarFilename,
  }: IServiceRequest): Promise<User> {
    const user = await this.usersRepository.findById(userId);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
