import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/user/repositories/models/IUsersRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async fetchAll(): Promise<User[]> {
    return this.ormRepository.find();
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public create(userData: ICreateUserDTO): User {
    return this.ormRepository.create(userData);
  }

  public async save(user: User): Promise<User> {
    const savedUser = await this.ormRepository.save(user);

    return savedUser;
  }

  public async createAndSave(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }
}

export default UsersRepository;
