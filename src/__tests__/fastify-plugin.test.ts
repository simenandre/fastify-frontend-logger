import { PassThrough } from 'stream';
import fastify from 'fastify';
import pino from 'pino';
import { frontendLoggerPlugin } from '../plugin';

describe('Fastify plugin', () => {
  it('should forward basic logs', async () => {
    const passthrough = new PassThrough();
    const logs: string[] = [];
    passthrough.on('data', data => {
      logs.push(JSON.parse(data.toString()));
    });
    const logger = pino(
      { redact: ['hostname', 'pid', 'responseTime'], timestamp: false },
      passthrough,
    );

    const server = fastify({ logger });
    server.register(frontendLoggerPlugin);

    await server.inject({
      path: '/logger',
      method: 'POST',
      payload: [
        {
          msg: 'Hello world',
          level: 30,
          time: 1483531681798,
          ctx: {
            browser: 'Firefox',
          },
        },
      ],
    });

    expect(logs).toMatchInlineSnapshot(`
      Array [
        Object {
          "hostname": "[Redacted]",
          "level": 30,
          "msg": "incoming request",
          "pid": "[Redacted]",
          "req": Object {
            "hostname": "localhost:80",
            "method": "POST",
            "remoteAddress": "127.0.0.1",
            "url": "/logger",
          },
          "reqId": "req-1",
        },
        Object {
          "ctx": Object {
            "browser": "Firefox",
          },
          "hostname": "[Redacted]",
          "level": 30,
          "msg": "Hello world",
          "pid": "[Redacted]",
          "reqId": "req-1",
          "time": 1483531681798,
          "type": "frontend-logger",
        },
        Object {
          "hostname": "[Redacted]",
          "level": 30,
          "msg": "request completed",
          "pid": "[Redacted]",
          "reqId": "req-1",
          "res": Object {
            "statusCode": 204,
          },
          "responseTime": "[Redacted]",
        },
      ]
    `);
  });
});
