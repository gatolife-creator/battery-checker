import express from "express";
import path from "path";
import { exec } from "child_process";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "../client/dist")));

app.get("/api/battery", (req, res) => {
  // Execute the command to get the battery level
  exec('pmset -g batt | grep -o "[0-9]\\+%"', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return res
        .status(500)
        .json({ error: "Failed to retrieve battery level" });
    }
    if (stderr) {
      console.error(`Command execution error: ${stderr}`);
      return res
        .status(500)
        .json({ error: "Failed to retrieve battery level" });
    }

    // Extract the battery level from the command output
    const batteryLevel = parseInt(stdout.trim().replace("%", ""), 10);
    console.log(`Battery level: ${batteryLevel}%`);

    // Send the battery level to the client
    res.json({ batteryLevel });
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
