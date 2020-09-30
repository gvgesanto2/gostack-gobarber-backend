import FakeUsersRepository from "@modules/user/repositories/fakes/FakeUsersRepository";
import ErrorResponse from "@shared/errors/ErrorResponse";
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

  it('should not be able to update avatar of a non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const nonExistingUserID = 'invalid-id';

    await expect(
      updateUserAvatarService.execute({
        userId: nonExistingUserID,
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(ErrorResponse);
  })

  it('should delete user old avatar when updating it to a new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFileSpy = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider
    );

    const user = await fakeUsersRepository.createAndSave({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '123456'
    });

    const oldAvatar = 'avatar.jpg';
    const newAvatar = 'avatar2.jpg';

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: oldAvatar,
    });

    await updateUserAvatarService.execute({
      userId: user.id,
      avatarFilename: newAvatar,
    });

    expect(deleteFileSpy).toHaveBeenCalledWith(oldAvatar);
    expect(user.avatar).toBe(newAvatar);
  })
})
