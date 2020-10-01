import FakeCryptoProvider from "@modules/user/providers/crypto-provider/fakes/FakeCryptoProvider";
import FakeTokenProvider from "@modules/user/providers/token-provider/fakes/FakeTokenProvider";
import FakeUsersRepository from "@modules/user/repositories/fakes/FakeUsersRepository";
import ErrorResponse from "@shared/errors/ErrorResponse";
import AuthenticateUserService from "../AuthenticateUserService";

describe('AuthenticateUser', () => {
  it('should be able to authenticate a user with the correct password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCryptoProvider = new FakeCryptoProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const authenticaUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCryptoProvider,
      fakeTokenProvider
    );

    const user = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const response = await authenticaUserService.execute({
      email: user.email,
      password: user.password
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCryptoProvider = new FakeCryptoProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const authenticaUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCryptoProvider,
      fakeTokenProvider
    );

    await expect(
      authenticaUserService.execute({
        email: 'no-user@gmail.com',
        password: '123456'
      }),
    ).rejects.toBeInstanceOf(ErrorResponse);
  });

  it('should not be able to authenticate a user with the wrong password', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeCryptoProvider = new FakeCryptoProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const authenticaUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeCryptoProvider,
      fakeTokenProvider
    );

    const { email } = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    await expect(
      authenticaUserService.execute({
        email,
        password: 'wrong-password'
      }),
    ).rejects.toBeInstanceOf(ErrorResponse);
  });
});
