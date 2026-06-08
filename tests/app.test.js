const request = require('supertest');
const { app, udpPort } = require('../app');

jest.mock('../app', () => {
  const originalModule = jest.requireActual('../app');
  return {
    ...originalModule,
    udpPort: {
      send: jest.fn()
    }
  };
});

describe('POST /enviar', () => {
  it('should respond with 200 and forward action to OSC', async () => {
    const action = 'testAction';
    const response = await request(app)
      .post('/enviar')
      .send({ action })
      .expect(200);
    // Verify that udpPort.send was called with the correct address
    expect(udpPort.send).toHaveBeenCalledWith({ address: action });
  });
});
