import FakeCryptoProvider from "@modules/user/providers/crypto-provider/fakes/FakeCryptoProvider";
import FakeTokenProvider from "@modules/user/providers/token-provider/fakes/FakeTokenProvider";
import FakeUsersRepository from "@modules/user/repositories/fakes/FakeUsersRepository";
import AuthenticateUserService from "../AuthenticateUserService";

describe('AuthenticateUser', () => {
  it('should be able to authenticate the user', async () => {
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
});
