import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointment/repositories/models/IAppointmentsRepository';
import AppointmentsRepository from '@modules/appointment/infra/typeorm/repositories/AppointmentsRepository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
