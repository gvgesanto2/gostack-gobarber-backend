import FakeHashProvider from "@modules/user/providers/hash-provider/fakes/FakeHashProvider";
import FakeTokenProvider from "@modules/user/providers/token-provider/fakes/FakeTokenProvider";
import FakeUsersRepository from "@modules/user/repositories/fakes/FakeUsersRepository";
import AuthenticateUserService from "../AuthenticateUserService";
import CreateUserService from "../CreateUserService";

describe('AuthenticateUser', () => {
  it('should be able to authenticate the user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeTokenProvider = new FakeTokenProvider();

    const createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )

    const authenticaUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
      fakeTokenProvider
    );

    const user = await createUserService.execute({
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
