import { GlobalErrorException } from '../../core/error/global-error-exception';

export class GetUserException extends GlobalErrorException {
  constructor(cause: string, httpCode: number) {
    super('Erro ao buscar um usuário!', cause, httpCode);
  }
}
