import { TEXT_CONTENT } from './consts';

export function getMessageErrorLogin(serverErrorMessage: string): string {
  return `${TEXT_CONTENT.messageErrorLogin} ${serverErrorMessage}`;
}
