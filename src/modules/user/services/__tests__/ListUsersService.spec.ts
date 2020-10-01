import FakeUsersRepository from "@modules/user/repositories/fakes/FakeUsersRepository";
import ListUsersService from '../ListUsersService';

describe('ListUsers', () => {
  it('should be able to list all the users', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const listUsersService = new ListUsersService(
      fakeUsersRepository,
    );

    const user1 = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    const user2 = await fakeUsersRepository.createAndSave({
      name: 'Jane Doe',
      email: 'janedoe@gmail.com',
      password: '123456',
    });

    const users = await listUsersService.execute();

    expect(users[0]).toEqual(user1);
    expect(users[1]).toEqual(user2);
  });
});
