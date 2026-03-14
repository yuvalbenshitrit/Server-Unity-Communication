function createHandshakeAck() {
  return {
    type: 'handshake_ack',
    message: 'connected'
  };
}

function createPingCommand() {
  return {
    type: 'command',
    action: 'ping'
  };
}

function createError(message) {
  return {
    type: 'error',
    message
  };
}

function isValidMessage(message) {
  return !!message && typeof message.type === 'string';
}

module.exports = {
  createHandshakeAck,
  createPingCommand,
  createError,
  isValidMessage
};
