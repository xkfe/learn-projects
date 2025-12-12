import { readFile, writeFile } from "node:fs/promises";
import express from "express";
import bodyParser from "body-parser";

const PORT = 3000;
const app = express();
// parse application/json
app.use(bodyParser.json())

// 构建相对于当前模块的文件路径，而不是依赖运行时的工作目录
const mockDatabasePath = new URL('./mock-database.json', import.meta.url);

async function getTodosData() {
    try {
        const todosData = await readFile(mockDatabasePath, "utf-8");
        const todos = JSON.parse(todosData);
        return todos;
    } catch (error) {
        return [];
    }
}

// 查询全部数据
app.get("/todos", async (_req, res) => {
    try {
        const todos = await getTodosData();
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch todos" });
    }
});

// 根据 id 查询数据
app.get("/todos/:todoId", async (req, res) => {
    const todos = await getTodosData();
    try {
        const todo = todos.find(todo => todo.id === parseInt(req.params.todoId));
        if (!todo) {
            throw new Error("todo id is not valid");
        }
        return res.status(200).json(todo);
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
})

// 根据 id 删除数据
app.delete("/todos/:todoId", async (req, res) => {
    debugger
    const todos = await getTodosData();
    try {
        const updatedTodos = todos.filter(todo => todo.id !== parseInt(req.params.todoId));
        if (updatedTodos.listen === todos.length) {
            throw new Error("delete todo failed, todo id is not valid");
        }
        await writeFile(mockDatabasePath, JSON.stringify(updatedTodos, null, 2));
        return res.status(200).json({ message: "delete todo success" });
    } catch (error) {
        return res.status(404).json({ error: error.message });
    }
})

// 添加
app.post("/addTodo", async (req, res) => {
    const todos = await getTodosData();
    try {
        const newTodo = {
            id: todos.length + 1,
            ...req.body,
        }
        const newTodos = [...todos, newTodo];
        await writeFile(mockDatabasePath, JSON.stringify(newTodos, null, 2));
        return res.status(200).json(newTodo);
    } catch (error) {
        return res.status(500).json({ error: "add todo failed" });
    }
})

// 修改
app.put("/updateTodo", async (req, res) => {
    const todos = await getTodosData();
    try {
        const { id, ...updates } = req.body;
        const todo = todos.find(todo => todo.id === parseInt(id));
        if(!todo) {
            throw new Error("update todo failed, todo id is not valid");
        }
        const updatedTodo = { ...todo, ...updates };
        const newTodos = todos.map(todo => todo.id === parseInt(id) ? updatedTodo : todo);
        await writeFile(mockDatabasePath, JSON.stringify(newTodos, null, 2));
        return res.status(200).json(updatedTodo);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});