import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// @desc Get all appointments
// @route GET /api/v1/appointments
// @access Private
export const getAppointments = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  res.status(200).json({
    success: true,
    data: appointments,
  });
};

// @desc Create a new appointment
// @route POST /api/v1/appointments
// @access Private
export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { providerId, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      providerId,
      date: parsedDate,
    });

    res.status(200).json({
      success: true,
      data: appointment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};
