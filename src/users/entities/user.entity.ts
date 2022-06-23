import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MessagesHelper } from 'src/core/helpers/messages.helper';
import { RegExHelper } from 'src/core/helpers/regex.helper';

export class User {
  @ApiProperty({ example: 'teste@gmail.com' })
  @IsNotEmpty({ message: 'O campo "email" não pode ser vazio!' })
  @IsString({ message: 'O campo "email" deve ser uma string!' })
  @IsEmail({}, { message: 'O campo "email" deve ser um email válido!' })
  email: string;

  @ApiProperty({ example: '123456' })
  @IsNotEmpty({ message: 'O campo "password" não pode ser vazio!' })
  @IsString({ message: 'O campo "password" deve ser umas string!' })
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
  static password: any;
}
