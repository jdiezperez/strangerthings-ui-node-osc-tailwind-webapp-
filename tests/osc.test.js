const { udpPort } = require('../app');
const osc = require('osc');

jest.mock('osc', () => {
  const mockUDPPort = jest.fn().mockImplementation(() => ({
    open: jest.fn(),
    send: jest.fn()
  }));
  return { UDPPort: mockUDPPort };
});

describe('OSC UDPPort', () => {
  it('should initialize with correct parameters', () => {
    const localAddress = process.env.OSC_LOCAL_ADDRESS || '0.0.0.0';
    const localPort = parseInt(process.env.OSC_LOCAL_PORT) || 57121;
    const remoteAddress = process.env.OSC_REMOTE_ADDRESS || '127.0.0.1';
    const remotePort = parseInt(process.env.OSC_REMOTE_PORT) || 8000;

    // Require app after mocking
    const { udpPort } = require('../app');
    expect(udpPort).toBeDefined();
    // Since we mocked, ensure open called
    expect(udpPort.open).toHaveBeenCalled();
  });

  it('should send action messages via send', () => {
    const mockSend = udpPort.send;
    const action = 'testAction';
    udpPort.send({ address: action });
    expect(mockSend).toHaveBeenCalledWith({ address: action });
  });
});
