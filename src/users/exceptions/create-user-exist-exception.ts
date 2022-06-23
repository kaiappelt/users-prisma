import { GlobalErrorException } from '../../core/error/global-error-exception';

export class CreateUserExistException extends GlobalErrorException {
  constructor(cause: string, httpCode: number) {
    super('Já existe um cadastro com este EMAIL', cause, httpCode);
  }
}
