import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from '../models/User';

interface ServiceRequest {
  email: string;
  password: string;
}

interface ServiceResponse {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({
    email,
    password,
  }: ServiceRequest): Promise<ServiceResponse> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error('Incorrect email/password combination.');
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
