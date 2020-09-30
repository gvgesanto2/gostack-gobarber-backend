import { inject, injectable } from 'tsyringe';

import ErrorResponse from '@shared/errors/ErrorResponse';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/models/IUsersRepository';
import ITokenProvider from '../providers/token-provider/models/ITokenProvider';
import IHashProvider from '../providers/hash-provider/models/IHashProvider';

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

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('TokenProvider')
    private tokenProvider: ITokenProvider,
  ) { }

  public async execute({
    email,
    password,
  }: IServiceRequest): Promise<IServiceResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new ErrorResponse('Incorrect email/password combination.', 401);
    }

    const passwordMatched = await this.hashProvider.compareHash({
      payload: password,
      hashed: user.password,
    });

    if (!passwordMatched) {
      throw new ErrorResponse('Incorrect email/password combination.', 401);
    }

    const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

    const token = this.tokenProvider.generateToken({
      payload: {},
      secret: `${JWT_SECRET}`,
      options: {
        subject: user.id,
        expiresIn: JWT_EXPIRES_IN,
      }
    });

    return {
      user,
      token,
    };
  }
}

export default AuthenticateUserService;
