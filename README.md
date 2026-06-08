# Stranger Things OSC Controller

A web-based interactive interface inspired by the aesthetics of the TV series "Stranger Things". This application provides a tactile-feeling control panel that communicates with external visual software (like TouchDesigner, Resolume, or any OSC-compatible software) via the OSC (Open Sound Control) protocol. To be used in a tablet device.

## Features

- **Thematic Interface**: A dark, retro-styled UI mimicking a CRT monitor and hardware device.
- **Interactive Controls**: 
  - Main button to toggle between realities ("UPSIDE DOWN" vs. "UPSIDE UP").
  - Hidden "Panic Mode" triggered by dual panic buttons.
- **Visual Feedback**: Glowing neon text and simulated LED indicators that reflect the current state.
- **OSC Integration**: Translates web interactions into UDP network messages using the OSC protocol.

## Architecture

- **Frontend**: Pure HTML, CSS (Tailwind via CDN + Custom Styles), and Vanilla JavaScript.
- **Backend**: Node.js with Express to serve the static files and receive HTTP POST requests from the frontend.
- **Communication**: The backend uses the `osc` package to relay the frontend actions to your target software via UDP.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- An OSC-compatible software to receive the messages (e.g., TouchDesigner).

## Installation

1. **Clone or Download** the repository to your local machine.
2. Open a terminal and navigate to the project directory:
   ```bash
   cd path/to/stranger-things
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```

## Configuration

The application uses environment variables for easy configuration without modifying the source code.

1. Ensure there is a `.env` file in the root directory of the project (if not, create one).
2. Configure the following variables according to your network setup:

```env
# The port where the web interface will be served
PORT=3000

# Local OSC Settings (where this app listens)
OSC_LOCAL_ADDRESS=0.0.0.0
OSC_LOCAL_PORT=57121

# Remote OSC Settings (where your target software listens)
OSC_REMOTE_ADDRESS=127.0.0.1
OSC_REMOTE_PORT=8000
```

## Running the Application

1. Start the server:
   ```bash
   node server.js
   ```
   *(Alternatively, if you have a `start.bat` file, you can double-click it on Windows).*

2. Open your web browser (or mobile device connected to the same network) and navigate to:
   ```
   http://localhost:3000
   ```
   *(Replace `localhost` with the host machine's local IP address if accessing from a mobile device).*

## OSC Messages Reference

The application sends the following OSC messages to the configured `OSC_REMOTE_ADDRESS` and `OSC_REMOTE_PORT`:

| Action / State | OSC Address Sent | Description |
| :--- | :--- | :--- |
| **Upside Down** | `/down` | Triggered when returning to the "normal" state (Red LED on). |
| **Upside Up** | `/up` | Triggered when switching to the alternate reality (Green LED on). |
| **Panic Mode** | `/panic` | Triggered by interacting with the panic buttons. Causes LEDs to pulse and text to turn white. |

## License

This project is for educational and entertainment purposes.

## Screenshots

UI

<img src="image/ui.png" alt="UI" width="400">
