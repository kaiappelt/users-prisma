import { HttpException } from '@nestjs/common';

export class GlobalErrorException extends HttpException {
  constructor(message: string, cause: string, httpCode: number) {
    super({ message, cause, httpCode }, httpCode);
  }
}
