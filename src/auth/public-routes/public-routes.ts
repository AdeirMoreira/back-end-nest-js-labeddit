import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Rota publica, sem necessidade de autenticação
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
