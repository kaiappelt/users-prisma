import { GlobalErrorException } from '../../core/error/global-error-exception';

export class GetUsersException extends GlobalErrorException {
  constructor(cause: string, httpCode: number) {
    super('Erro ao buscar vários usuários!', cause, httpCode);
  }
}
