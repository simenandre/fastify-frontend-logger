import { Static, Type } from '@sinclair/typebox';

export const logSchema = Type.Object({
  msg: Type.String(),
  level: Type.Union([
    Type.Literal(10),
    Type.Literal(20),
    Type.Literal(30),
    Type.Literal(40),
    Type.Literal(50),
    Type.Literal(60),
  ]),
  time: Type.Optional(Type.Number()),
  stack: Type.Optional(Type.String()),
  ctx: Type.Optional(Type.Record(Type.String(), Type.Any())),
  payload: Type.Optional(Type.Record(Type.String(), Type.Any())),
});

export type LogSchemaType = Static<typeof logSchema>;

export const logRequestSchema = Type.Array(logSchema);

export type LogRequestSchemaType = Static<typeof logRequestSchema>;
