const {
  createHandshakeAck,
  createPingCommand,
  createError,
  isValidMessage
} = require('../src/protocol');

test('createHandshakeAck returns the correct handshake response', () => {
  expect(createHandshakeAck()).toEqual({
    type: 'handshake_ack',
    message: 'connected'
  });
});

test('createPingCommand returns the correct ping command', () => {
  expect(createPingCommand()).toEqual({
    type: 'command',
    action: 'ping'
  });
});

test('createError returns the correct error object', () => {
  expect(createError('Unknown message type')).toEqual({
    type: 'error',
    message: 'Unknown message type'
  });
});

test('isValidMessage returns true for a valid message', () => {
  expect(isValidMessage({ type: 'handshake' })).toBe(true);
});

test('isValidMessage returns false for null', () => {
  expect(isValidMessage(null)).toBe(false);
});

test('isValidMessage returns false when type is missing', () => {
  expect(isValidMessage({ action: 'ping' })).toBe(false);
});

test('isValidMessage returns false when type is not a string', () => {
  expect(isValidMessage({ type: 123 })).toBe(false);
});

test('createError works with empty string message', () => {
  expect(createError('')).toEqual({
    type: 'error',
    message: ''
  });
});

test('createError works with long error messages', () => {
    const longMessage = 'A'.repeat(1000);
    expect(createError(longMessage)).toEqual({
      type: 'error',
      message: longMessage
    });
});