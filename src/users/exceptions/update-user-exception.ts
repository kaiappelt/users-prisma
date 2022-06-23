import { GlobalErrorException } from '../../core/error/global-error-exception';

export class UpdateUserException extends GlobalErrorException {
  constructor(cause: string, httpCode: number) {
    super('Erro ao atualizar usuário!', cause, httpCode);
  }
}
