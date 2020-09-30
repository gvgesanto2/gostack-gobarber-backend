import { v4 } from 'uuid';
import { isEqual } from 'date-fns';

import IAppointmentsRepository from '@modules/appointment/repositories/models/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointment/dtos/ICreateAppointmentDTO';
import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';

class FakeAppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async fetchAll(): Promise<Appointment[]> {
    return this.appointments;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
  }

  public async createAndSave(
    appointmentData: ICreateAppointmentDTO,
  ): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, {
      ...appointmentData,
      id: v4(),
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.appointments.push(appointment);

    return appointment;
  }
}

export default FakeAppointmentsRepository;
