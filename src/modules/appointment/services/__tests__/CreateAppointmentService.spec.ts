import Appointment from '@modules/appointment/infra/typeorm/entities/Appointment';
import FakeAppointmentsRepository from '@modules/appointment/repositories/fakes/FakeAppointmentsRepository';
import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import ErrorResponse from '@shared/errors/ErrorResponse';
import FakeDateManagementProvider from '@shared/providers/date-management-provider/fakes/FakeDateManagementProvider';
import CreateAppointmentService from '../CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDateManagementProvider = new FakeDateManagementProvider();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeDateManagementProvider,
    );

    const { id } = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const appointmentDate = new Date();
    appointmentDate.setHours(11, 15, 0); // the current date set to 11:15am + UTC

    const newAppointment = await createAppointmentService.execute({
      date: appointmentDate,
      providerId: id,
    });

    expect(newAppointment.providerId).toBe(id);
    expect(newAppointment).toBeInstanceOf(Appointment);
  });

  it('should not be able to create a new appointment with a non existing provider', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDateManagementProvider = new FakeDateManagementProvider();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeDateManagementProvider,
    );

    const appointmentDate = new Date();
    appointmentDate.setHours(11, 0, 0); // the current date set to 11am + UTC
    const nonExistingProviderId = 'invalid-id';

    await expect(
      createAppointmentService.execute({
        date: appointmentDate,
        providerId: nonExistingProviderId,
      }),
    ).rejects.toBeInstanceOf(ErrorResponse);
  });

  it('should not be able to create two appointments at the same hour', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeDateManagementProvider = new FakeDateManagementProvider();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeUsersRepository,
      fakeDateManagementProvider,
    );

    const { id } = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const appointmentDate = new Date();
    appointmentDate.setHours(11, 0, 0); // the current date set to 11am + UTC

    const laterDateInSameHour = new Date(
      appointmentDate.getTime() + 40 * 60000,
    ); // 40 minutes from the appointment date

    await createAppointmentService.execute({
      date: appointmentDate,
      providerId: id,
    });

    await expect(
      createAppointmentService.execute({
        date: laterDateInSameHour,
        providerId: id,
      }),
    ).rejects.toBeInstanceOf(ErrorResponse);
  });
});
