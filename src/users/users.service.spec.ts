import { Test, TestingModule } from '@nestjs/testing';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserException } from './exceptions/create-user-exception';
import { DeleteUserException } from './exceptions/delete-user-exception';
import { GetUsersException } from './exceptions/get-users-exception';
import { UpdateUserException } from './exceptions/update-user-exception';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersService', () => {
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

  const prismaMock = {
    user: {
      create: jest.fn().mockResolvedValue(mockUsersArray[0]),
      findMany: jest.fn().mockResolvedValue(mockUsersArray),
      findUnique: jest.fn().mockResolvedValue(mockUsersArray[0]),
      update: jest.fn().mockResolvedValue(mockUsersArray[1]),
      delete: jest.fn().mockResolvedValue(mockUsersArray[1]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersService],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findeAll', () => {
    it('should call findall and sucess', async () => {
      jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue(mockUsersArray);

      expect(await service.findAll()).toBeDefined();
      expect(await service.findAll()).toBe(mockUsersArray);
    });

    it('should throw an GetUsersException', () => {
      prismaMock.user.findMany = jest
        .fn()
        .mockRejectedValue(new GetUsersException('erro ao criar', 500));

      expect(service.findAll).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('Must create a user', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockUser[0]);

      expect(await service.create(mockUser)).toBe(mockUser[0]);
    });
    it('should throw a CreateUserException', () => {
      prismaMock.user.create = jest
        .fn()
        .mockRejectedValue(new CreateUserException('erro ao criar', 500));

      expect(service.create).rejects.toThrowError();
    });
  });

  describe('findOne', () => {
    it('must bring a user', async () => {
      jest
        .spyOn(prismaMock.user, 'findUnique')
        .mockResolvedValue(mockUsersArray[0]);

      expect(await service.findOne(1)).toBeDefined();
      expect(await service.findOne(1)).toBe(mockUsersArray[0]);
    });

    it('should throw a GetUserException', () => {
      service.findOne = jest
        .fn()
        .mockRejectedValue(new GetUsersException('erro ao trazer', 500));

      expect(service.findOne).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('must update a user', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUserUpdate);

      expect(service.update(Number(mockUser.id), mockUser)).toBeDefined();
      expect(await service.update(Number(mockUser.id), mockUser)).toBe(
        mockUserUpdate,
      );
      expect(service.update).toBeCalledTimes(2);
    });
    it('should throw an UpdateUserExeption', async () => {
      service.update = jest
        .fn()
        .mockRejectedValue(new UpdateUserException('erro', 500));

      expect(service.update).rejects.toThrowError();
    });
  });
  describe('delete', () => {
    it('Must remove a user', async () => {
      jest
        .spyOn(prismaMock.user, 'delete')
        .mockResolvedValue(mockUsersArray[1]);

      expect(service.remove(1)).toBeDefined();
      expect(await service.remove(1)).toBe(mockUsersArray[1]);
    });

    it('should throw a DeleteUserException', async () => {
      service.remove = jest
        .fn()
        .mockRejectedValue(new DeleteUserException('erro', 500));

      expect(service.remove).rejects.toThrowError();
    });
  });
});
