/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) { }

  public async execute(): Promise<User[]> {
    return this.usersRepository.fetchAll();
  }
}

export default ListAppointmentsService;
