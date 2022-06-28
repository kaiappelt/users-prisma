import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { MessagesHelper } from '../../core/helpers/messages.helper';
import { RegExHelper } from '../../core/helpers/regex.helper';

export class LoginRequestBody {
  @ApiPropertyOptional({ example: 'teste@gmail.com' })
  @IsString({ message: 'O campo "email" deve ser uma String!' })
  @IsOptional()
  @IsEmail({}, { message: 'O campo "email" deve ser válido!' })
  email: string;

  @ApiPropertyOptional({ example: 'Kai@1234' })
  @IsString({ message: 'O campo "password" deve ser umas string!' })
  @Matches(RegExHelper.password, {
    // message: 'error',
    message: MessagesHelper.PASSWORD_VALID,
  })
  password: string;
}
