/* eslint-disable prettier/prettier */
import { inject, injectable } from 'tsyringe';

import ErrorResponse from '@shared/errors/ErrorResponse';
import IDateManagementProvider from '@shared/providers/date-management-provider/models/IDateManagementProvider';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/models/IAppointmentsRepository';

interface IServiceRequest {
  providerId: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,

    @inject('DateManagementProvider')
    private dateManagementProvider: IDateManagementProvider
  ) { }

  public async execute({
    providerId,
    date,
  }: IServiceRequest): Promise<Appointment> {
    const appointmentDate = this.dateManagementProvider.startOfHour(date);

    if (!providerId) {
      throw new ErrorResponse('No provider found with this ID', 404);
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new ErrorResponse('This appointment is already booked', 400);
    }

    const appointment = await this.appointmentsRepository.createAndSave({
      providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
