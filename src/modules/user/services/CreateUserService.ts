import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import ErrorResponse from '@shared/errors/ErrorResponse';
import User from '../infra/typeorm/entities/User';

interface ServiceRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({
    name,
    email,
    password,
  }: ServiceRequest): Promise<User> {
    const usersRepository = getRepository(User);

    const existingUser = await usersRepository.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new ErrorResponse('This email address is already used.', 400);
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
