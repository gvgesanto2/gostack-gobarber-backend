import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';
import FakeAppointmentsRepository from '@modules/appointment/repositories/fakes/FakeAppointmentsRepository';
import ErrorResponse from '@shared/errors/ErrorResponse';
import FakeDateManagementProvider from '@shared/providers/date-management-provider/fakes/FakeDateManagementProvider';
import CreateAppointmentService from '../CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeDateManagementProvider = new FakeDateManagementProvider();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeDateManagementProvider,
    );

    const appointmentDate = new Date();
    appointmentDate.setHours(11, 15, 0); // the current date set to 11:15am + UTC

    const fakeProviderId = '123123';

    const newAppointment = await createAppointmentService.execute({
      date: appointmentDate,
      providerId: fakeProviderId,
    });

    expect(newAppointment.providerId).toBe(fakeProviderId);
    expect(newAppointment).toBeInstanceOf(Appointment);
  });

  it('should not be able to create two appointments at the same hour', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeDateManagementProvider = new FakeDateManagementProvider();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeDateManagementProvider,
    );

    const appointmentDate = new Date();
    appointmentDate.setHours(11, 0, 0); // the current date set to 11am + UTC

    const laterDateInSameHour = new Date(
      appointmentDate.getTime() + 40 * 60000,
    ); // 40 minutes from the appointment date
    const fakeProviderId = '123123';

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: fakeProviderId,
    });

    await expect(
      createAppointmentService.execute({
        date: laterDateInSameHour,
        providerId: fakeProviderId,
      }),
    ).rejects.toBeInstanceOf(ErrorResponse);
  });
});
