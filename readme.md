# Dashboard System

1. **Express**: A backend server built with Express.js that accepts POST and GET requests to manage information.
2. **CLI**: A Node.js command-line interface to send POST requests with information.
3. **React**: A React frontend application to display and interact with information.

## How to Use

1. Start the server by following the instructions in the "Express" section.
2. Use the CLI tool to send data to the server by following the instructions in the "CLI" section.
3. View and interact with the data through the frontend by following the instructions in the "react" section.

## Express

The server is responsible for handling incoming POST and GET requests, validating data, and saving it to a file. It runs on Node.js and uses Express.js.

### Setup and Run

Navigate to the `express` directory and run:

```
npm install
node server.js
```

This will install the necessary dependencies and start the server at `http://localhost:3000`.
(And on the network)

### Setup and Run

Navigate to the `react` directory and run:

```
npm install
npm run dev
```

this will start a development server using `Vite`

## react

The frontend is a React application that displays a dial, level, and other UI components to interact with the data.

## CLI

The CLI tool prompts the user for data and sends it to the server as POST requests.

### Setup and Run

Navigate to the `cli` directory and run:

```
npm install
node cli.js
```

Follow the on-screen prompts to enter the information.
