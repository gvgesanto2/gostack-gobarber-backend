/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class ListAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) { }

  public async execute(): Promise<Appointment[]> {
    return this.appointmentsRepository.fetchAll();
  }
}

export default ListAppointmentsService;
