// API基础URL
const API_BASE = 'http://localhost:3000';

// 状态管理
let todos = [];
let editingTodoId = null;

// DOM元素
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const titleInput = document.getElementById('title');
const tagInput = document.getElementById('tag');
const descriptionInput = document.getElementById('description');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
    setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
    todoForm.addEventListener('submit', handleSubmit);
    cancelBtn.addEventListener('click', cancelEdit);
}

// 加载所有todos
async function loadTodos() {
    try {
        const response = await fetch(`${API_BASE}/todos`);
        if (!response.ok) throw new Error('加载失败');
        todos = await response.json();
        renderTodos();
    } catch (error) {
        console.error('加载todos失败:', error);
        todoList.innerHTML = '<div class="empty-state">加载失败，请检查服务器连接</div>';
    }
}

// 渲染todos列表
function renderTodos() {
    if (todos.length === 0) {
        todoList.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📝</div>
                <p>还没有任务，添加一个吧！</p>
            </div>
        `;
        return;
    }

    todoList.innerHTML = todos.map(todo => `
        <div class="todo-item" data-id="${todo.id}">
            <div class="todo-header">
                <div>
                    <div class="todo-title">${escapeHtml(todo.title)}</div>
                    <span class="todo-tag tag-${getTagClass(todo.tag)}">${escapeHtml(todo.tag)}</span>
                </div>
                <div class="todo-actions">
                    <button class="btn btn-sm btn-secondary" onclick="editTodo(${todo.id})">
                        编辑
                    </button>
                    <button class="btn btn-sm btn-destructive" onclick="deleteTodo(${todo.id})">
                        删除
                    </button>
                </div>
            </div>
            ${todo.description ? `<div class="todo-description">${escapeHtml(todo.description)}</div>` : ''}
        </div>
    `).join('');
}

// 处理表单提交
async function handleSubmit(e) {
    e.preventDefault();
    
    const title = titleInput.value.trim();
    const tag = tagInput.value;
    const description = descriptionInput.value.trim();

    if (!title || !tag) {
        alert('请填写标题和标签');
        return;
    }

    try {
        if (editingTodoId) {
            // 更新现有todo
            const response = await fetch(`${API_BASE}/todos/${editingTodoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, tag, description }),
            });

            if (!response.ok) throw new Error('更新失败');
            
            await loadTodos();
            cancelEdit();
        } else {
            // 创建新todo
            const response = await fetch(`${API_BASE}/todos`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, tag, description }),
            });

            if (!response.ok) throw new Error('创建失败');
            
            await loadTodos();
            todoForm.reset();
        }
    } catch (error) {
        console.error('操作失败:', error);
        alert('操作失败，请重试');
    }
}

// 编辑todo
function editTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;

    editingTodoId = id;
    titleInput.value = todo.title;
    tagInput.value = todo.tag;
    descriptionInput.value = todo.description || '';
    
    formTitle.textContent = '编辑任务';
    submitBtn.textContent = '更新任务';
    cancelBtn.style.display = 'inline-flex';
    
    // 滚动到表单
    document.querySelector('.card').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 取消编辑
function cancelEdit() {
    editingTodoId = null;
    todoForm.reset();
    formTitle.textContent = '添加新任务';
    submitBtn.textContent = '添加任务';
    cancelBtn.style.display = 'none';
}

// 删除todo
async function deleteTodo(id) {
    if (!confirm('确定要删除这个任务吗？')) {
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/todos/${id}`, {
            method: 'DELETE',
        });

        if (!response.ok) throw new Error('删除失败');
        
        await loadTodos();
        
        // 如果正在编辑被删除的todo，取消编辑状态
        if (editingTodoId === id) {
            cancelEdit();
        }
    } catch (error) {
        console.error('删除失败:', error);
        alert('删除失败，请重试');
    }
}

// 工具函数：转义HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 工具函数：获取标签的CSS类名
function getTagClass(tag) {
    const tagMap = {
        '工作': 'work',
        '个人': 'personal',
        '健康': 'health',
        '学习': 'study',
        '生活': 'life',
        '效率': 'efficiency',
        '财务': 'finance',
        '安全': 'security',
        '休闲': 'leisure',
    };
    return tagMap[tag] || 'work';
}
