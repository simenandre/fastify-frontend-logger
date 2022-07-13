import { Static, Type } from '@sinclair/typebox';

export const logSchema = Type.Object({
  message: Type.String(),
  level: Type.Union([
    Type.Literal('trace'),
    Type.Literal('debug'),
    Type.Literal('info'),
    Type.Literal('warn'),
    Type.Literal('error'),
  ]),
  logger: Type.Optional(Type.String()),
  timestamp: Type.Optional(Type.String()),
  stacktrace: Type.Optional(Type.String()),
  payload: Type.Optional(Type.Record(Type.String(), Type.Any())),
});

export type LogSchemaType = Static<typeof logSchema>;

export const logRequestSchema = Type.Array(logSchema);

export type LogRequestSchemaType = Static<typeof logRequestSchema>;
