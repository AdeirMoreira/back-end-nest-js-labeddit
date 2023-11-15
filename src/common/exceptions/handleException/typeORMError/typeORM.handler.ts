import { TypeORMError } from 'typeorm';
import { DEFAULT_MESSAGE } from '../handlerException.filter';

interface typeORMErrorDetails {
  errno?: number;
}

const COMMOM_TYPEORM_ERROR_CODES = [1054, 1146];

export const typeORMHandler = (
  error: TypeORMError & typeORMErrorDetails,
): string => {
  const { errno, message } = error;

  console.log('ERROR>>>>>>>>>>>>>>>>>>>', error);

  if (COMMOM_TYPEORM_ERROR_CODES.includes(errno as number)) {
    return DEFAULT_MESSAGE;
  }

  if (errno === 1062) {
    return duplicateEntryError(message);
  }

  return DEFAULT_MESSAGE;
};

const duplicateEntryError = (message: string) => {
  const posicoes = [];
  for (let i = 0; i < message.length; i++) {
    if (message[i] === "'" && posicoes.length < 2) {
      posicoes.push(i);
    }
  }

  const dadoDuplocado = message.slice(posicoes[0] + 1, posicoes[1]);

  return `Já existe um resgistro com o dado '${dadoDuplocado}'.`;
};
