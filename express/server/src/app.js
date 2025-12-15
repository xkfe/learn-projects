import express from "express";
import { getLocalIP } from "./utils/getLocalIP.js";
import todoRouters from "./routes/todoRouters.js";

const PORT = process.env.PORT || 3000;
const app = express();
app.use('/api',todoRouters);

app.listen(PORT, () => {
    console.log(`Server is running at:`);
    console.log(`- Local:   \x1b[38;2;130;182;200mhttp://localhost:${PORT}\x1b[0m`);
    console.log(`- Network: \x1b[38;2;130;182;200mhttp://${getLocalIP()}:${PORT}\x1b[0m`);
});