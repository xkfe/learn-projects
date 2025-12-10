import express from "express";
import { readFile } from "node:fs/promises";

const PORT = 3000;
const app = express();

// 构建相对于当前模块的文件路径，而不是依赖运行时的工作目录
const mockDatabasePath = new URL('./mock-database.json', import.meta.url);

// 查询数据
app.get("/todos", async(_req, res) => {
    try {
        const todosData = await readFile(mockDatabasePath, "utf-8");
        const todos = JSON.parse(todosData);
        return res.status(200).json(todos);   
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch todos" });
    }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});