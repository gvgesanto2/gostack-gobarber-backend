import { inject, injectable } from 'tsyringe';

import ErrorResponse from '@shared/errors/ErrorResponse';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/models/IUsersRepository';
import ICryptoProvider from '../providers/crypto-provider/models/ICryptoProvider';

interface IServiceRequest {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CryptoProvider')
    private cryptoProvider: ICryptoProvider,
  ) { }

  public async execute({
    name,
    email,
    password,
  }: IServiceRequest): Promise<User> {
    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser) {
      throw new ErrorResponse('This email address is already used.', 400);
    }

    const hashedPassword = await this.cryptoProvider.encrypt(password);

    const user = await this.usersRepository.createAndSave({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
