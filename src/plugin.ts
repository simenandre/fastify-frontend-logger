import { FastifyPluginAsync, preHandlerAsyncHookHandler } from 'fastify';
import pino from 'pino';
import { LogRequestSchemaType, logRequestSchema } from './types';

export interface LogLevelRemotePluginOptions {
  /**
   * @default /logger
   */
  path?: string;

  /**
   * Body schema
   *
   * Used to validate something else than a default log
   * object. Default log objects are defined in types.
   * Read more about this in README.
   */
  bodySchema?: unknown;

  preHandler?: preHandlerAsyncHookHandler;

  loggerOptions?: pino.ChildLoggerOptions;
}

const defaultLoggerOptions = {
  type: 'frontend-logger',
};

export const frontendLoggerPlugin: FastifyPluginAsync<
  LogLevelRemotePluginOptions
> = async (fastify, options) => {
  const {
    path = '/logger',
    bodySchema = logRequestSchema,
    preHandler,
    loggerOptions = defaultLoggerOptions,
  } = options;

  fastify.route<{ Body: LogRequestSchemaType }>({
    url: path,
    method: 'POST',
    schema: {
      body: bodySchema,
    },
    preHandler,
    handler: async (req, reply) => {
      const logger = req.log.child(loggerOptions);
      req.body.forEach(log => {
        const { level, message, ...logObject } = log;
        logger[level](logObject, message);
      });

      return reply.code(204).send();
    },
  });
};
