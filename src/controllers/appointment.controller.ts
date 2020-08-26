import { Request, Response, NextFunction } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// @desc Get all appointments
// @route GET /api/v1/appointments
// @access Public
export const getAppointment = async (
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
// @access Public
export const createAppointment = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService();

    const appointment = await createAppointmentService.execute({
      provider,
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
