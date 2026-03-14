const WebSocket = require('ws');
const {
  createHandshakeAck,
  createPingCommand,
  createError,
  isValidMessage
} = require('./protocol');

const port = 8080;
const wss = new WebSocket.Server({ port });

wss.on('connection', (ws) => {
  console.log('Client connected');

  let isHandshaked = false;

  ws.on('message', (data) => {
    const message = data.toString().replace(/^\uFEFF/, '').trim();
    console.log(`Received data: ${message}`);

    try {
      const parsedMessage = JSON.parse(message);

      if (!isValidMessage(parsedMessage)) {
        ws.send(JSON.stringify(createError('Invalid message structure')));
        return;
      }

      if (parsedMessage.type === 'handshake') {
        if (isHandshaked) {
          ws.send(JSON.stringify(createError('Handshake already completed')));
          return;
        }

        isHandshaked = true;

        ws.send(JSON.stringify(createHandshakeAck()));
        console.log('Handshake completed');

        ws.send(JSON.stringify(createPingCommand()));
        console.log('Command sent: ping');
      } else if (parsedMessage.type === 'response') {
        if (!isHandshaked) {
          ws.send(JSON.stringify(createError('Handshake required before response')));
          return;
        }

        console.log(`Client response received: ${parsedMessage.result}`);
      } else {
        ws.send(JSON.stringify(createError('Unknown message type')));
      }
    } catch (error) {
      ws.send(JSON.stringify(createError('Invalid JSON format')));
      console.error('Failed to parse message:', error.message);
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });

  ws.on('error', (err) => {
    console.error(`Socket error: ${err.message}`);
  });
});

wss.on('error', (err) => {
  console.error(`Server error: ${err.message}`);
});

console.log(`WebSocket server listening on port ${port}`);