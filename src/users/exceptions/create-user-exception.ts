import { GlobalErrorException } from '../../core/error/global-error-exception';

export class CreateUserException extends GlobalErrorException {
  constructor(cause: string, httpCode: number) {
    super('Erro ao cadastrar um usuário!', cause, httpCode);
  }
}
