import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import ErrorResponse from '@shared/errors/ErrorResponse';
import Appointment from '../infra/typeorm/entities/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface ServiceRequest {
  providerId: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    providerId,
    date,
  }: ServiceRequest): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointmentDate = startOfHour(date);

    if (!providerId) {
      throw new ErrorResponse('No provider found with this ID', 404);
    }

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (findAppointmentInSameDate) {
      throw new ErrorResponse('This appointment is already booked', 400);
    }

    const appointment = appointmentsRepository.create({
      providerId,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
