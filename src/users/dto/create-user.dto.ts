import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { MessagesHelper } from 'src/core/helpers/messages.helper';
import { RegExHelper } from 'src/core/helpers/regex.helper';

export class CreateUserDto implements Omit<User, 'id'> {
  @ApiProperty({ example: 'teste@gmail.com' })
  @IsNotEmpty({ message: 'O campo "email" não pode ser vazio!' })
  @IsString({ message: 'O campo "email" deve ser uma string!' })
  @IsEmail({}, { message: 'O campo "email" deve ser um email válido!' })
  email: string;

  @IsString({ message: ' /  O campo "name" deve ser uma string!' })
  @IsNotEmpty()
  @ApiProperty()
  name: string | null;

  @ApiProperty({ example: '73116469000164', maxLength: 14, minLength: 14 })
  @IsNotEmpty({ message: 'O campo "cpfCnpj" não pode ser vazio!' })
  @IsString({ message: 'O campo "cpfCnpj" deve ser uma string!' })
  @Length(11, 14, {
    message: 'O campo "cpfCnpj" deve ter entre 11 e 14 caracteres!',
  })
  cpfCnpj: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'O campo "password" não pode ser vazio!' })
  @IsString({ message: 'O campo "password" deve ser umas string!' })
  @Matches(RegExHelper.password, {
    // message: 'error',
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}
