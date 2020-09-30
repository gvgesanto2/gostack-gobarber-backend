import User from '@modules/user/infra/typeorm/entities/User';
import FakeHashProvider from '@modules/user/providers/hash-provider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/user/repositories/fakes/FakeUsersRepository';
import ErrorResponse from '@shared/errors/ErrorResponse';
import CreateUserService from '../CreateUserService';

describe('CreateUser', () => {
  it('should be able to create a new user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const newUser = await createUserService.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456',
    });

    expect(newUser).toBeInstanceOf(User);
    expect(newUser).toHaveProperty('id');
  });

  it('should not be able to create a new user with an existing email from another user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const userEmail = 'johndoe@gmail.com';

    await createUserService.execute({
      name: 'John Doe',
      email: userEmail,
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'Jane Doe',
        email: userEmail,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(ErrorResponse);
  });
});
