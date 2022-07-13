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
          message: 'Hello world',
          level: 'info',
          timestamp: '2017-05-29T12:53:46.000Z',
          payload: {
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
          "hostname": "[Redacted]",
          "level": 30,
          "msg": "Hello world",
          "payload": Object {
            "browser": "Firefox",
          },
          "pid": "[Redacted]",
          "reqId": "req-1",
          "timestamp": "2017-05-29T12:53:46.000Z",
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
