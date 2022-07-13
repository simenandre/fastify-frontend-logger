# fastify-frontend-logger

A Fastify plugin for receiving browser logs to a server

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
    "message": "Hello world",
    "level": "info",
    "timestamp": "2017-05-29T12:53:46.000Z",
    "payload": {
      "browser": "Firefox"
    }
  }
]
```
