import express, { Request, Response } from "express";
import { exec } from "child_process";
import  logger  from './utils/logger';

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

app.get("/", (_, res) => {
  res.send("Welcome to the Playwright automation server!");
});

app.post("/run-automation", (req: Request, res: Response) => {
  logger.info("Test execution started...");
  

  exec("npx playwright test", { env: { ...process.env, PATH: process.env.PATH } }, (error, stdout, stderr) => {
    if (error) {
      logger.error(`Error: ${error.message}`);
      res.status(500).send({ message: "Test execution failed", error: error.message });
      return;
    }
    if (stderr) {
      logger.error(`stderr: ${stderr}`);
      res.status(500).send({ message: "Test execution failed", error: stderr });
      return;
    }
    logger.info(`stdout: ${stdout}`);
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