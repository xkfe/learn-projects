import express from "express";
import { getTodos, getTodoById, deleteTodoById, addTodo, updateTodo } from "../controllers/todoController.js";

const router = express.Router();

router.get("/todos", getTodos);
router.get("/todos/:todoId", getTodoById);
router.delete("/todos/:todoId", deleteTodoById);
router.post("/todos", addTodo);
router.put("/todos/:todoId", updateTodo);

export default router;