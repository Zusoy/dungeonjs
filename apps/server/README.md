# Server

### Stack

The socket is made in NodeJS and http server for the [socket handshake](https://en.wikipedia.org/wiki/WebSocket#Opening_handshake).

### Hexagonal architecture

The socket server is made with the [hexagonal architecture principal](https://en.wikipedia.org/wiki/Hexagonal_architecture_(software)).

### Dependency injection

For more testable specs the [dependecy injection pattern](https://en.wikipedia.org/wiki/Dependency_injection) is used.

To achieve that the [tsyringe](https://github.com/microsoft/tsyringe) lib is used.

See in `container.ts` file for the container configuration.
