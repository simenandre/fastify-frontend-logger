# fastify-frontend-logger

A Fastify plugin for receiving browser logs to a server

## Features

- Very customizable
- Logger objects like `pino`
- Appends `"type": "frontend-logger"` to every log.

## Quickstart

```bash
yarn add fastify-frontend-logger
```

```typescript
import fastify from 'fastify';
import { frontendLoggerPlugin } from 'fastify-frontend-logger';

const server = fastify();
server.register(frontendLoggerPlugin);
```

The frontend logger adds a method to your server at `/logger`. This consumes a
default logger object:

```json
[
  {
    "msg": "Hello world",
    "level": 30,
    "time": 1483531681798,
    "ctx": {
      "browser": "Firefox"
    },
    "payload": {
      "users": ["cobraz"]
    }
  }
]
```

**Note**: You can change how the logger object is by setting `bodySchema` in the
plugin options.

## Options

- `path` can be used to change where the logger is served (defaults to
  `/logger`).
- `bodySchema` can be used to change the validation schema.
- `preHandler` can be used to run code before passing to logs (e.g.
  authentication)
- `loggerOptions` the plugin adds a logger child, with this option you can set
  your own.
