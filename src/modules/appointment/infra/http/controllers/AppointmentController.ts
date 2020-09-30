import { container, inject, injectable } from 'tsyringe';
import { Response } from 'express';

import CreateAppointmentService from '@modules/appointment/services/CreateAppointmentService';
import asyncHandler from '@shared/infra/http/middleware/asyncHandler';
import ListAppointmentsService from '@modules/appointment/services/ListAppointmentsService';
import IDateManagementProvider from '@shared/providers/date-management-provider/models/IDateManagementProvider';

@injectable()
class AppointmentController {
  constructor(
    @inject('DateManagementProvider')
    private dateManagementProvider: IDateManagementProvider,
  ) { }

  // @desc Get all appointments
  // @route GET /api/v1/appointments
  // @access Private
  public list = asyncHandler(
    async (req, res, _): Promise<Response | void> => {
      const listAppointmentsService = container.resolve(
        ListAppointmentsService,
      );

      const appointments = await listAppointmentsService.execute();

      res.status(200).json({
        success: true,
        data: appointments,
      });
    },
  );

  // @desc Create a new appointment
  // @route POST /api/v1/appointments
  // @access Private
  public create = asyncHandler(
    async (req, res, _): Promise<Response | void> => {
      const { providerId, date } = req.body;

      const parsedDate = this.dateManagementProvider.parseISO(date);

      const createAppointmentService = container.resolve(
        CreateAppointmentService,
      );

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
}

export default AppointmentController;
