import { Inject } from '@nestjs/common';

export const InjectDomain = (token: symbol) => Inject(token);

export const InjectUseCase = (token: symbol) => Inject(token);

export const InjectRepository = (token: symbol) => Inject(token);

export const InjectAdapter = (token: symbol) => Inject(token);
