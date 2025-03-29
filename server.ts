import express, { Request, Response } from "express";
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