import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { CreateUserException } from './exceptions/create-user-exception';
import { DeleteUserException } from './exceptions/delete-user-exception';
import { GetUserException } from './exceptions/get-user-exception';
import { GetUsersException } from './exceptions/get-users-exception';
import { UpdateUserException } from './exceptions/update-user-exception';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: User = {
    id: 3,
    email: 'teste@gmail.com',
    name: 'teste',
    cpfCnpj: '04836857040',
    password: '123456',
  };

  const mockUsersArray: User[] = [
    {
      id: 1,
      email: 'teste1@gmail.com',
      name: 'teste1',
      cpfCnpj: '04836857040',
      password: '123456',
    },
    {
      id: 2,
      email: 'teste2@gmail.com',
      name: 'teste2',
      cpfCnpj: '04836857040',
      password: '123456',
    },
  ];

  const mockUserUpdate: User = {
    ...mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('findeAll', () => {
    it('should call findall and sucess', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUsersArray);

      expect(controller.findAll()).toBeDefined();
      expect(await controller.findAll()).toBe(mockUsersArray);
      expect(service.findAll).toBeCalledTimes(2);
    });

    it('should throw an GetUsersException', () => {
      controller.findAll = jest
        .fn()
        .mockRejectedValueOnce(new GetUsersException('erro ao trazer', 500));

      expect(controller.findAll()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Must create a user', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockUser);

      expect(await controller.create(mockUser)).toBe(mockUser);
    });
    it('should throw a CreateUserException', () => {
      controller.create = jest
        .fn()
        .mockRejectedValue(new CreateUserException('erro ao criar', 500));

      expect(controller.create).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('must bring a user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);

      expect(await controller.findOne(1)).toBe(mockUser);
    });

    it('should throw a GetUserException', () => {
      controller.findOne = jest
        .fn()
        .mockRejectedValue(new GetUserException('erro ao trazer', 500));

      expect(controller.findOne).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('must update a user', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUserUpdate);

      expect(controller.update(Number(mockUser.id), mockUser)).toBeDefined();
      expect(await controller.update(Number(mockUser.id), mockUser)).toBe(
        mockUserUpdate,
      );
      expect(service.update).toBeCalledTimes(2);
    });
    it('should throw an UpdateUserExeption', async () => {
      controller.update = jest
        .fn()
        .mockRejectedValue(new UpdateUserException('erro ao atualizar', 500));

      expect(controller.update).rejects.toThrowError();
    });
  });
  describe('delete', () => {
    it('Must remove a user', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockUser);

      expect(controller.remove(Number(mockUser.id))).toBeDefined();
      expect(await controller.remove(Number(mockUser.id))).toBe(mockUser);
      expect(service.remove).toBeCalledTimes(2);
    });

    it('should throw a DeleteUserException', async () => {
      controller.remove = jest
        .fn()
        .mockRejectedValue(new DeleteUserException('erro ao remover', 500));

      expect(controller.remove).rejects.toThrowError();
    });
  });
});
