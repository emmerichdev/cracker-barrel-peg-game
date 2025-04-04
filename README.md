# Cracker Barrel Peg Game

A fun online version of the classic Cracker Barrel peg game!

## Project Structure

- **Frontend**: React application. managing ui
- **Backend**: Express.js REST API, managing game state

## Installation and Development Setup

### Requirements

- Node.js (v16 or higher recommended)
- npm (v8 or higher recommended)
- Docker and Docker Compose (this is optional for a containerized setup)

### Install

```bash
# Install all dependencies (root, backend, and frontend)
npm run install:all

# Build both backend and frontend
npm run build

# Start both services in development mode
npm run dev
```

The frontend will open automatically in your browser at http://localhost:3000
The backend server will run on http://localhost:3001

### Docker Setup

```bash
# Build and start the containers
docker-compose up
```

Or run in detached mode:
```bash
docker-compose up -d
```

This will start both the frontend and backend services in Docker containers.
The frontend will be available at http://localhost:3000
The backend server will be at http://localhost:3001

## Libraries Used

- React
- TypeScript
- Express.js
- Axios for API communication
- Webpack

## Todo's

- ✅ Make setting up project easier and running it (root directory install & docker)
- ✅ Improve frontend and create a dark mode (should be default)
- Make game expandable by x amount
- Create logic to show all ways to solve the board on different size values (Might not do this to keep it more entertaining)
- Implement a database for leaderboards and potentially sharing games? (Big Maybe)

## License
MIT License - See [LICENSE](LICENSE) for details.
