## Development Commands

### Docker-based Development (Recommended)
- `make build` - Build the Docker containers
- `make start` - Start the development stack (client on :3000, server on :8080)
- `make stop` - Stop the containers
- `make kill` - Remove containers entirely
- Copy `.env.dist` to `.env` before first use

### Client (React/Vite)
- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript check first)
- `npm run lint` - Run ESLint

### Server (Node.js/TypeScript)
- `npm run dev` - Start development server with nodemon
- `npm run test` - Run tests with Vitest
- `npm run build` - Build for production

## Architecture Overview

### Client Architecture
- **React + Three.js**: 3D multiplayer game using React Three Fiber
- **State Management**: Redux Toolkit with Redux Saga for side effects
- **Real-time Communication**: Socket.io client
- **Styling**: Tailwind CSS with DaisyUI components
- **3D Rendering**: Three.js with React Three Fiber, React Three Drei for helpers

### Server Architecture  
- **Dependency Injection**: Uses TSyringe container pattern for IoC
- **Domain-Driven Design**: Clear separation between Domain, Application, and Infrastructure layers
- **Event-Driven**: Socket.io events handled through dedicated event handlers
- **Game Logic**: Turn-based dungeon crawler with dice combat, loot collection, and room generation

### Key Patterns
- **Client Features**: Organized by domain (Authentication, Game/Combat, Game/Dungeon, Lobby, Rooms)
- **Server Events**: Event handlers in `Domain/EventHandler/` process game actions
- **Real-time Sync**: Socket.io maintains game state synchronization between clients
- **3D Game Objects**: Modular React components for characters, props, and tiles

### Project Structure
- `apps/client/` - React Three Fiber frontend
- `apps/server/` - Node.js Socket.io backend  
- Monorepo setup with shared types and utilities

### Game Logic
- Turn-based movement and combat system
- Procedural room generation when exploring
- Dice-based combat mechanics
- Inventory management (keys, weapons, treasures)
- Win condition: defeat the golem boss, most treasures wins