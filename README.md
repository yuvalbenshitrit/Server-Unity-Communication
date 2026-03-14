# Server – Unity Communication

This project demonstrates a simple communication between a Node.js server and a Unity client using WebSockets.

## Technologies

- Node.js
- WebSocket (ws)
- Jest
- Unity (C#)

## Project Structure

SERVER-UNITY-COMMUNICATION\
├─ src/
│  ├─ protocol.js
│  └─ server.js
├─ tests/
│  └─ protocol.test.js
├─ UnityClient/
├─ package.json
├─ package-lock.json
└─ README.md

## How to Run the Server

Open a terminal in the project folder.

Install dependencies:

npm install

Start the server:

npm start

Run tests:

npm test

The WebSocket server will start on:

ws://localhost:8080

## How to Run the Unity Client

1. Open the **UnityClient** folder in Unity Hub.
2. Open the main scene.
3. Press **Play**.

The Unity client will automatically connect to the server.

## Communication Flow

1. Unity client connects to the server.
2. Client sends a handshake message.
3. Server returns a handshake acknowledgment.
4. Server sends a command to the client.
5. Client executes the command.
6. Client sends a response back to the server.

## Example Messages

### Handshake (Unity → Server)

{ "type": "handshake" }

### Handshake Acknowledgment (Server → Unity)

{ "type": "handshake_ack", "message": "connected" }

### Command (Server → Unity)

{ "type": "command", "action": "ping" }

### Response (Unity → Server)

{ "type": "response", "result": "pong" }
