import { readFile, writeFile } from "node:fs/promises";

// 构建相对于当前模块的文件路径，而不是依赖运行时的工作目录
const mockDatabasePath = new URL('../mock-database.json', import.meta.url);

/**
 * 获取 todos 数据
 * @returns {Promise<Array>} 返回 todos 数据
 */
async function getTodosData() {
    try {
        const todosData = await readFile(mockDatabasePath, "utf-8");
        const todos = JSON.parse(todosData);
        return todos;
    } catch (error) {
        return [];
    }
}

/**
 * 获取 todos 数据
 * @param {Request} req - 请求对象
 * @param {Response} res - 响应对象
 * @returns {Promise<Response>} 响应对象
 */
export async function getTodos(_req, res) {
    debugger
    try {
        const todos = await getTodosData();
        return res.status(200).json(todos);
    } catch (error) {
        return res.status(500).json({ error: "Failed to fetch todos" });
    }
};

/**
 * 根据 id 获取 todo 数据
 * @param {Request} req - 请求对象
 * @param {Response} res - 响应对象
 * @returns {Promise<Response>} 响应对象
 */
export async function getTodoById(req, res) {
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
}

/**
 * 根据 id 删除 todo 数据
 * @param {Request} req - 请求对象
 * @param {Response} res - 响应对象
 * @returns {Promise<Response>} 响应对象
 */
export async function deleteTodoById(req, res) {
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
}

/**
 * 添加 todo 数据
 * @param {Request} req - 请求对象
 * @param {Response} res - 响应对象
 * @returns {Promise<Response>} 响应对象
 */
export async function addTodo(req, res) {
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
}

/**
 * 更新 todo 数据
 * @param {Request} req - 请求对象
 * @param {Response} res - 响应对象
 * @returns {Promise<Response>} 响应对象
 */
export async function updateTodo(req, res) {
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
}