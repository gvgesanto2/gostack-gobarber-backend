import { v4 } from 'uuid';

import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import User from '@modules/user/infra/typeorm/entities/User';
import IUsersRepository from '@modules/user/repositories/models/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];

  public async fetchAll(): Promise<User[]> {
    return this.users;
  }

  public async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  public create(userData: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, userData, {
      id: v4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return user;
  }

  public async save(user: User): Promise<User> {
    const existingUserIndex = this.users.findIndex(
      existingUser => existingUser.id === user.id,
    );

    if (existingUserIndex === -1) {
      this.users.push(user);
    } else {
      this.users[existingUserIndex] = user;
    }

    return user;
  }

  public async createAndSave(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, userData, {
      id: v4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.users.push(user);

    return user;
  }
}

export default FakeUsersRepository;
