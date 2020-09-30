import FakeUsersRepository from "@modules/user/repositories/fakes/FakeUsersRepository";
import FakeStorageProvider from "@shared/providers/storage-provider/fakes/FakeStorageProvider";
import UpdateUserAvatarService from "../UpdateUserAvatarService";

describe('UpdateUserAvatar', () => {
  it('should be able to update the user avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const avatarFilename = 'avatar.jpg';

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename,
    });

    expect(user.avatar).toBe(avatarFilename);
  })
})
