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
