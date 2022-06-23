import { GlobalErrorException } from '../../core/error/global-error-exception';

export class UpdateUserExistException extends GlobalErrorException {
  constructor(cause: string, httpCode: number) {
    super('Não existe cadastro com esse email!', cause, httpCode);
  }
}
