import { Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import asyncHandler from '../middleware/asyncHandler';

// @desc Get all appointments
// @route GET /api/v1/appointments
// @access Private
export const getAppointments = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    res.status(200).json({
      success: true,
      data: appointments,
    });
  },
);

// @desc Create a new appointment
// @route POST /api/v1/appointments
// @access Private
export const createAppointment = asyncHandler(
  async (req, res, _): Promise<Response | void> => {
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
  },
);
