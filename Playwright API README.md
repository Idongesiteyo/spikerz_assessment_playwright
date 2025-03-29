# Playwright Automation API with Docker

This repository contains a Playwright automation framework that runs tests via an API endpoint. The framework is containerized using Docker and provides an HTTP API to trigger test execution.

---

## Prerequisites
Before proceeding, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or later)
- [Docker](https://www.docker.com/get-started)
- [Postman](https://www.postman.com/) or `curl` for API testing

---

## Setup Instructions

### 1️. Install Dependencies
Run the following command to install the required dependencies:
```sh
npm install
```

### 2️.  Compile TypeScript
Ensure TypeScript compiles without errors:
```sh
npx tsc
```

If you see JavaScript files generated in the `dist/` folder, it means the compilation was successful.

---

## API Server Setup

### 3️.  Create `server.ts` (API Server)
Ensure your `server.ts` file is correctly set up:

```ts
mport express, { Request, Response } from "express";
import { exec } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (_, res) => {
  res.send("Welcome to the Playwright automation server!");
});

app.post("/run-automation", (req: Request, res: Response) => {
  console.log("Test execution started...");

  exec("npx playwright test", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send({ message: "Test execution failed", error: error.message });
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      res.status(500).send({ message: "Test execution failed", error: stderr });
      return;
    }
    console.log(`stdout: ${stdout}`);
    res.status(200).send({ message: "Test execution started", output: stdout });
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    playwright: 'installed',
    time: new Date().toISOString()
  });
});
```

### 4. Compile Server File
Run:
```sh
npx tsc
```
This will generate `dist/server.js`.

### 5️.  Start the Server
Run:
```sh
node dist/server.js
```
You should see:
```
Server running on port 3000
```

---

## Running Tests via API

### Using Postman
1. Open **Postman**.
2. Select **POST** as the request type.
3. Enter the URL: `http://localhost:3000/run-automation`
4. Click **Send**.
5. You should see a response indicating that the test execution has started.

### Using `curl`
Alternatively, use this command:
```sh
curl -X POST http://localhost:3000/run-automation
```

---

## Docker Setup

### 6️. Create `Dockerfile`
Ensure you have the following `Dockerfile`:
```Dockerfile
# Use Node.js as the base image
FROM mcr.microsoft.com/playwright:v1.42.1-jammy

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci
RUN npm install playwright
RUN npx playwright install-deps
RUN npm install --save-dev @types/express

# Copy the entire project
COPY . .

# Build TypeScript files
RUN npx tsc

# Expose API port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
CMD node healthcheck.js || exit 1

# Start the server
CMD ["node", "dist/server.js"]
```

### 7️. Build and Run Docker Container
Run the following commands:
```sh
# Build the Docker image
docker build -t playwright-automation .

# Run the container
docker run -p 3000:3000 playwright-automation
```

### 8️. Test the API in Docker
Once the container is running, send a **POST** request to:
```sh
curl -X POST http://localhost:3000/run-automation
```

If everything is set up correctly, this will trigger your Playwright tests inside the container.

---

##  Verifying the Server is Running
To check if the server is running:
```sh
curl http://localhost:3000/
```
If a **Cannot GET /** response appears, the server is running but lacks a root route.

---

## Troubleshooting

###  `Cannot GET /` in Browser
This happens because there’s no **GET** route in `server.ts`. You can add this:
```ts
app.get("/", (req, res) => {
  res.send(" Playwright Automation API is running!");
});
```

###  `Command failed: npx playwright test`
Ensure Playwright is installed inside the container:
```sh
docker exec -it <container_id> npx playwright test
```

If Playwright is missing, install it inside the container:
```sh
docker exec -it <container_id> npm install playwright
```

---

##  Conclusion
You have successfully set up my API-based Playwright test execution framework using Docker!


