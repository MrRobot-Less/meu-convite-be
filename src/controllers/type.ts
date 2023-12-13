import { Request } from 'express';

export type BodyRequest<T, PT = unknown> = Request<PT, unknown, T>;
export type QueryRequest<T, PT = unknown> = Request<PT, unknown, unknown, T>;