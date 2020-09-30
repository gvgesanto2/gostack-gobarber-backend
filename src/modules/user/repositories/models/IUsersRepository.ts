import User from '@modules/user/infra/typeorm/entities/User';
import ICreateUserDTO from '@modules/user/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  fetchAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): User;
  save(user: User): Promise<User>;
  createAndSave(data: ICreateUserDTO): Promise<User>;
}
