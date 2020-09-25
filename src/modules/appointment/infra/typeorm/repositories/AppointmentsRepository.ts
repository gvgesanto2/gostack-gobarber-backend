import { getRepository, Repository } from 'typeorm';
import IAppointmentsRepository from '@modules/appointment/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const foundAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return foundAppointment;
  }

  public async createAndSave({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const newAppointment = this.ormRepository.create({ providerId, date });

    await this.ormRepository.save(newAppointment);

    return newAppointment;
  }
}

export default AppointmentsRepository;
