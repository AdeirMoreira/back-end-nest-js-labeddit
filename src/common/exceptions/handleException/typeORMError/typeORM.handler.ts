export const typeORMHandler = (
  errno: number | undefined,
  message: string,
): string => {
  switch (errno) {
    case 1062:
      return duplicateEntryError(message);
    default:
      console.log(message);
      return 'Erro no typeORM não indentificado.';
  }
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
