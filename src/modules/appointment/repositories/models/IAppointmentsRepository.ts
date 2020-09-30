import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';

export default interface IAppointmentsRepository {
  fetchAll(): Promise<Appointment[]>;
  createAndSave(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
