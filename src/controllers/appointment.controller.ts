import { Request, Response, NextFunction } from 'express';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

// appointmensRepository
const appointmentsRepository = new AppointmentsRepository();

// @desc Get all appointments
// @route GET /api/v1/appointments
// @access Public
export const getAppointment = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  const appointments = appointmentsRepository.fetchAll();

  res.status(200).json({
    success: true,
    data: appointments,
  });
};

// @desc Create a new appointment
// @route POST /api/v1/appointments
// @access Public
export const createAppointment = (
  req: Request,
  res: Response,
  next: NextFunction,
): Response | void => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointmentService = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointmentService.execute({
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
