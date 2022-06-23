import { GlobalErrorException } from '../../core/error/global-error-exception';

export class DeleteUserException extends GlobalErrorException {
  constructor(cause: string, httpCode: number) {
    super('Erro ao remover usuário!', cause, httpCode);
  }
}
