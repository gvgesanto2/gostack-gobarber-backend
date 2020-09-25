import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/user/repositories/IUsersRepository';
import AppointmentsRepository from '@modules/appointment/infra/typeorm/repositories/AppointmentsRepository';
import UsersRepository from '@modules/user/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
