import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should be able to create a user', async () => {
      mockRepository.create.mockImplementation(({ name, email }) =>
        Object.assign(new User(), {
          id: 1,
          name,
          email,
          created: new Date('2021-02-12'),
        }),
      );
      mockRepository.save.mockImplementation((user) => user);

      const user = await service.create({
        name: 'user test',
        email: 'user@test.com',
      });

      expect(user).toBeInstanceOf(User);
      expect(user.name).toBe('user test');
      expect(user.email).toBe('user@test.com');
      expect(mockRepository.create).toHaveBeenCalledTimes(1);
    });
  });

  describe('index method', () => {
    it('should list all users', async () => {
      const user = Object.assign(new User(), {
        id: 1,
        name: 'user',
        email: 'user@test.com',
        created: new Date('2021-02-12'),
      });
      mockRepository.find.mockReturnValue([user, user]);

      const users = await service.index();

      expect(users).toHaveLength(2);
      expect(users[0]).toBeInstanceOf(User);
    });
  });

  describe('show method', () => {
    it('should be able to list a user', async () => {
      const userTest = Object.assign(new User(), {
        id: 1,
        name: 'user',
        email: 'user@test.com',
        created: new Date('2021-02-12'),
      });
      mockRepository.findOne.mockReturnValue(userTest);

      const user = await service.show(1);

      expect(user).toBeInstanceOf(User);
      expect(user.id).toBe(1);
    });

    it('should not list an invalid user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await expect(service.show(0)).rejects.toThrow(Error);
    });
  });

  describe('update method', () => {
    it('should be able to update a user', async () => {
      const userTest = Object.assign(new User(), {
        id: 1,
        name: 'user',
        email: 'user@test.com',
        created: new Date('2021-02-12'),
      });
      mockRepository.findOne.mockReturnValue(userTest);
      mockRepository.save.mockImplementation((user) => user);

      const user = await service.update(1, { email: 'email@test.com' });

      expect(user.email).toBe('email@test.com');
      expect(mockRepository.findOne).toHaveReturnedWith(userTest);
    });

    it('should not update an invalid user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await expect(
        service.update(0, { email: 'email@teste.com' }),
      ).rejects.toThrow(Error);
    });
  });

  describe('delete method', () => {
    it('should be able to delete a user', async () => {
      mockRepository.findOne.mockReturnValue(new User());
      mockRepository.delete.mockReturnValue(null);

      const user = await service.delete(1);

      expect(user).toBeNull;
      expect(mockRepository.findOne).toHaveReturnedTimes(1);
    });

    it('should not delete an invalid user', async () => {
      mockRepository.findOne.mockReturnValue(null);

      await expect(service.delete(0)).rejects.toThrow(Error);
    });
  });
});
