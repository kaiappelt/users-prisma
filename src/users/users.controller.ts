import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Criar um novo usuário' })
  @ApiCreatedResponse({
    description: 'Novo Usuário criado com sucesso',
  })
  @ApiBadRequestResponse({ description: 'Parâmetros inválidos' })
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Listar de todos usuários' })
  @ApiOkResponse({
    description: 'Lista de usuário com sucesso',
    type: [CreateUserDto],
  })
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Mostrar um usuário' })
  @ApiOkResponse({
    description: 'Dados de um usuário retornado com sucesso',
    type: CreateUserDto,
  })
  @ApiResponse({ description: 'Usuário não encontrado' })
  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  findOne(@Param('id') id: number) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiOkResponse({
    description: 'Usuário atualizado com sucesso',
    type: CreateUserDto,
  })
  @ApiBadRequestResponse({ description: 'Dados inválidos' })
  @ApiNotFoundResponse({ description: 'Usuário não foi encontrado' })
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ summary: 'Deletar um usuário' })
  @ApiOkResponse({
    description: 'Usuário removido com sucesso',
    type: CreateUserDto,
  })
  @ApiNotFoundResponse({ description: 'Usuário não foi encontrado' })
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
