import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import User from '../models/User';

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
      throw new Error('This email address is already used.');
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
