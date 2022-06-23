import { HttpStatus, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserException } from './exceptions/create-user-exception';
import * as bcrypt from 'bcrypt';
import { CreateUserExistException } from './exceptions/create-user-exist-exception';
import { DeleteUserException } from './exceptions/delete-user-exception';
import { GetUserException } from './exceptions/get-user-exception';
import { GetUsersException } from './exceptions/get-users-exception';
import { UpdateUserException } from './exceptions/update-user-exception';
import { UpdateUserExistException } from './exceptions/update-user-exist-exception';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const userExist = await this.prisma.user.findUnique({
        where: {
          email: createUserDto.email,
        },
      });

      if (userExist)
        throw new CreateUserExistException(
          'Já existe um cadastro com este EMAIL',
          HttpStatus.CONFLICT,
        );

      const data: Prisma.UserCreateInput = {
        email: createUserDto.email,
        name: createUserDto.name,
        cpfCnpj: createUserDto.cpfCnpj,
        // ...createUserDto,
        password: await bcrypt.hash(createUserDto.password, 10),
      };
      const createUser = await this.prisma.user.create({
        data,
      });
      return {
        ...createUser,
        password: undefined,
      };
    } catch (e) {
      throw new CreateUserException(
        e.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  // async create(createUserDto: CreateUserDto): Promise<User> {
  //   const data: Prisma.UserCreateInput = {
  //     ...createUserDto,
  //     password: await bcrypt.hash(createUserDto.password, 10),
  //   };

  //   const createdUser = await this.prisma.user.create({ data });

  //   return {
  //     ...createdUser,
  //     password: undefined,
  //   };
  // }

  async findAll(): Promise<User[]> {
    try {
      return this.prisma.user.findMany();
    } catch (e) {
      throw new GetUsersException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: number): Promise<User> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { id },
      });
      return user;
    } catch (e) {
      throw new GetUserException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOneEmail(email: string) {
    try {
      return await this.prisma.user.findUnique({ where: { email } });
    } catch (e) {
      throw new GetUserException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const userExist = await this.prisma.user.findMany({
        where: {
          id: id,
        },
      });

      if (!userExist)
        throw new UpdateUserExistException(
          'Não existe cadastro com esse email',
          HttpStatus.CONFLICT,
        );

      const data: Prisma.UserCreateInput = {
        email: updateUserDto.email,
        name: updateUserDto.name,
        cpfCnpj: updateUserDto.cpfCnpj,
        password: updateUserDto.password,
      };
      const result = await this.prisma.user.update({
        where: {
          id: id,
        },
        data,
      });
      return result;
    } catch (e) {
      throw new UpdateUserException(
        e.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number): Promise<User> {
    try {
      return await this.prisma.user.delete({ where: { id } });
    } catch (e) {
      throw new DeleteUserException(
        e.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
