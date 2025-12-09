import express from "express";
const app = express();
import { getLocalIP } from "./utils/getLocalIP.js";

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running Local: http://localhost:${PORT}`);
  console.log(`Server is running Network: http://${getLocalIP()}:${PORT}`);
});
