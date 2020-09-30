import { inject, injectable } from 'tsyringe';

import ErrorResponse from '@shared/errors/ErrorResponse';
import IStorageProvider from '@shared/providers/storage-provider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/models/IUsersRepository';

interface IServiceRequest {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
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
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
