/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import ErrorResponse from '@shared/errors/ErrorResponse';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IServiceRequest {
  email: string;
  password: string;
}

interface IServiceResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute({
    email,
    password,
  }: IServiceRequest): Promise<IServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ErrorResponse('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new ErrorResponse('Incorrect email/password combination.', 401);
    }

    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

    const token = sign({}, `${JWT_SECRET}`, {
      subject: user.id,
      expiresIn: JWT_EXPIRES_IN,
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
