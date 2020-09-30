/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import ErrorResponse from '@shared/errors/ErrorResponse';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/models/IUsersRepository';
import IHashProvider from '../providers/hash-provider/models/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,
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

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.createAndSave({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
