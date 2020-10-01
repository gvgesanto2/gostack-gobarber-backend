import FakeAppointmentsRepository from "@modules/appointment/repositories/fakes/FakeAppointmentsRepository";
import ListAppointmentsService from "../ListAppointmentsService";

describe('ListAppointments', () => {
  it('should be able to list all the appointments', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentsRepository();

    const listAppointmentsService = new ListAppointmentsService(
      fakeAppointmentsRepository,
    );

    const providerId = 'valid-provider-id';
    const currentDate = new Date();
    const firstAppointmentDate = new Date(currentDate.setHours(9, 0, 0));
    const secondAppointmentDate = new Date(currentDate.setHours(11, 0, 0));

    const firstAppointment = await fakeAppointmentsRepository.createAndSave({
      date: firstAppointmentDate,
      providerId,
    });

    const secondAppointment = await fakeAppointmentsRepository.createAndSave({
      date: secondAppointmentDate,
      providerId,
    });

    const appointments = await listAppointmentsService.execute();

    expect(appointments[0]).toEqual(firstAppointment);
    expect(appointments[1]).toEqual(secondAppointment);
  });
});
