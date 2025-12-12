class TodoApp {
    constructor() {
        this.tasks = [];
        this.currentFilter = 'all';
        this.selectedPriorities = [];
        this.currentEditingTask = null;
        this.charts = {};
        
        this.init();
    }

    init() {
        this.loadTasks();
        this.bindEvents();
        this.render();
        this.updateStats();
        this.initAnimations();
    }

    // 数据管理
    loadTasks() {
        const savedTasks = localStorage.getItem('shadcn-todos');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        } else {
            // 添加示例数据
            this.tasks = [
                {
                    id: this.generateId(),
                    title: '完成项目文档',
                    description: '完成项目文档的编写',
                    priority: 'high',
                    dueDate: this.formatDate(new Date(Date.now() + 86400000)),
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: '代码审查',
                    description: '审查团队成员提交的代码变更',
                    priority: 'medium',
                    dueDate: this.formatDate(new Date(Date.now() + 172800000)),
                    completed: false,
                    createdAt: new Date().toISOString()
                },
                {
                    id: this.generateId(),
                    title: '更新依赖包',
                    description: '检查并更新项目的所有依赖包到最新版本',
                    priority: 'low',
                    dueDate: this.formatDate(new Date(Date.now() + 259200000)),
                    completed: true,
                    createdAt: new Date().toISOString()
                }
            ];
            this.saveTasks();
        }
    }

    saveTasks() {
        localStorage.setItem('shadcn-todos', JSON.stringify(this.tasks));
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    formatDate(date) {
        return date.toISOString().split('T')[0];
    }

    // 事件绑定
    bindEvents() {
        // 添加任务按钮
        document.getElementById('addTaskBtn').addEventListener('click', () => {
            this.openTaskModal();
        });

        // 妯℃€佹浜嬩欢
        document.getElementById('taskModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeTaskModal();
            }
        });

        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeTaskModal();
        });

        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closeTaskModal();
        });

        // 任务表单提交
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTaskSubmit();
        });

        // 鍒犻櫎妯℃€佹浜嬩欢
        document.getElementById('deleteModal').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeDeleteModal();
            }
        });

        document.getElementById('cancelDeleteBtn').addEventListener('click', () => {
            this.closeDeleteModal();
        });

        document.getElementById('confirmDeleteBtn').addEventListener('click', () => {
            this.confirmDelete();
        });

        // 筛选按钮
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });

        // 优先级筛选
        document.querySelectorAll('.priority-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.handlePriorityFilter(e.target);
            });
        });

        // 搜索
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.handleSearch(e.target.value);
        });

        // 閿洏蹇嵎閿�
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    // 任务操作
    addTask(taskData) {
        const task = {
            id: this.generateId(),
            ...taskData,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.unshift(task);
        this.saveTasks();
        this.render();
        this.updateStats();
        this.showNotification('任务添加成功', 'success');
    }

    updateTask(taskId, updates) {
        const taskIndex = this.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...updates };
            this.saveTasks();
            this.render();
            this.updateStats();
            this.showNotification('任务更新成功', 'success');
        }
    }

    deleteTask(taskId) {
        this.tasks = this.tasks.filter(task => task.id !== taskId);
        this.saveTasks();
        this.render();
        this.updateStats();
        this.showNotification('任务删除成功', 'success');
    }

    toggleTask(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
            this.updateStats();
            
            const message = task.completed ? '任务已完成�' : '浠诲姟宸叉爣璁颁负鏈畬鎴�';
            this.showNotification(message, task.completed ? 'success' : 'info');
        }
    }

    // 筛选和搜索
    setFilter(filter) {
        this.currentFilter = filter;
        
        // 更新按钮状态
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-filter="${filter}"]`).classList.add('active');
        
        this.render();
    }

    handlePriorityFilter(checkbox) {
        const priority = checkbox.dataset.priority;
        
        if (checkbox.checked) {
            if (!this.selectedPriorities.includes(priority)) {
                this.selectedPriorities.push(priority);
            }
        } else {
            this.selectedPriorities = this.selectedPriorities.filter(p => p !== priority);
        }
        
        this.render();
    }

    handleSearch(query) {
        this.searchQuery = query.toLowerCase();
        this.render();
    }

    getFilteredTasks() {
        let filtered = this.tasks;

        // 状态筛选
        if (this.currentFilter === 'pending') {
            filtered = filtered.filter(task => !task.completed);
        } else if (this.currentFilter === 'completed') {
            filtered = filtered.filter(task => task.completed);
        }

        // 优先级筛选
        if (this.selectedPriorities.length > 0) {
            filtered = filtered.filter(task => 
                this.selectedPriorities.includes(task.priority)
            );
        }

        // 搜索筛选
        if (this.searchQuery) {
            filtered = filtered.filter(task =>
                task.title.toLowerCase().includes(this.searchQuery) ||
                task.description.toLowerCase().includes(this.searchQuery)
            );
        }

        return filtered;
    }

    // 渲染
    render() {
        const tasksList = document.getElementById('tasksList');
        const emptyState = document.getElementById('emptyState');
        const filteredTasks = this.getFilteredTasks();

        if (filteredTasks.length === 0) {
            tasksList.style.display = 'none';
            emptyState.classList.add('show');
        } else {
            tasksList.style.display = 'flex';
            emptyState.classList.remove('show');
            
            tasksList.innerHTML = filteredTasks.map(task => this.createTaskCard(task)).join('');
            
            // 绑定任务卡片事件
            this.bindTaskCardEvents();
        }

        this.updateFilterCounts();
    }

    createTaskCard(task) {
        const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
        const isToday = task.dueDate && this.isToday(new Date(task.dueDate));
        const dueDateClass = isOverdue ? 'overdue' : (isToday ? 'today' : '');
        
        return `
            <div class="task-card ${task.completed ? 'completed' : ''}" data-task-id="${task.id}">
                <div class="task-header">
                    <div class="task-left">
                        <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''}>
                        <h3 class="task-title">${this.escapeHtml(task.title)}</h3>
                    </div>
                    <div class="task-actions">
                        <button class="task-action-btn edit" title="编辑">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                            </svg>
                        </button>
                        <button class="task-action-btn delete" title="删除">
                            <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
                ${task.description ? `
                    <div class="task-content">
                        <p class="task-description">${this.escapeHtml(task.description)}</p>
                    </div>
                ` : ''}
                <div class="task-footer">
                    <div class="task-meta">
                        <div class="task-priority ${task.priority}">
                            <span class="priority-dot"></span>
                            <span>${this.getPriorityText(task.priority)}</span>
                        </div>
                        ${task.dueDate ? `
                            <div class="task-due-date ${dueDateClass}">
                                <svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" style="width: 0.875rem; height: 0.875rem;">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                <span>${this.formatDisplayDate(task.dueDate)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
    }

    bindTaskCardEvents() {
        document.querySelectorAll('.task-card').forEach(card => {
            const taskId = card.dataset.taskId;
            
            // 澶嶉€夋浜嬩欢
            const checkbox = card.querySelector('.task-checkbox');
            checkbox.addEventListener('change', () => {
                this.toggleTask(taskId);
            });
            
            // 编辑按钮
            const editBtn = card.querySelector('.task-action-btn.edit');
            editBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openTaskModal(taskId);
            });
            
            // 删除按钮
            const deleteBtn = card.querySelector('.task-action-btn.delete');
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.openDeleteModal(taskId);
            });
        });
    }

    // 妯℃€佹绠＄悊
    openTaskModal(taskId = null) {
        const modal = document.getElementById('taskModal');
        const form = document.getElementById('taskForm');
        const title = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');
        
        form.reset();
        
        if (taskId) {
            // 编辑模式
            const task = this.tasks.find(t => t.id === taskId);
            if (task) {
                title.textContent = '编辑任务';
                submitBtn.querySelector('.btn-text').textContent = '更新任务';
                
                document.getElementById('taskTitle').value = task.title;
                document.getElementById('taskDescription').value = task.description || '';
                document.getElementById('taskPriority').value = task.priority;
                document.getElementById('taskDueDate').value = task.dueDate || '';
                
                this.currentEditingTask = taskId;
            }
        } else {
            // 添加模式
            title.textContent = '添加任务';
            submitBtn.querySelector('.btn-text').textContent = '添加任务';
            this.currentEditingTask = null;
        }
        
        modal.classList.add('show');
        document.getElementById('taskTitle').focus();
    }

    closeTaskModal() {
        const modal = document.getElementById('taskModal');
        modal.classList.remove('show');
        this.currentEditingTask = null;
        
        // 娓呴櫎閿欒鐘舵€�
        document.getElementById('titleError').classList.remove('show');
        document.getElementById('taskTitle').classList.remove('error');
    }

    handleTaskSubmit() {
        const title = document.getElementById('taskTitle').value.trim();
        const description = document.getElementById('taskDescription').value.trim();
        const priority = document.getElementById('taskPriority').value;
        const dueDate = document.getElementById('taskDueDate').value;
        
        // 验证
        if (!title) {
            this.showFieldError('taskTitle', 'titleError', '请输入任务标题');
            return;
        }
        
        const taskData = {
            title,
            description,
            priority,
            dueDate
        };
        
        if (this.currentEditingTask) {
            this.updateTask(this.currentEditingTask, taskData);
        } else {
            this.addTask(taskData);
        }
        
        this.closeTaskModal();
    }

    showFieldError(fieldId, errorId, message) {
        const field = document.getElementById(fieldId);
        const error = document.getElementById(errorId);
        
        field.classList.add('error');
        error.textContent = message;
        error.classList.add('show');
        
        field.addEventListener('input', () => {
            field.classList.remove('error');
            error.classList.remove('show');
        }, { once: true });
    }

    openDeleteModal(taskId) {
        const modal = document.getElementById('deleteModal');
        this.taskToDelete = taskId;
        modal.classList.add('show');
    }

    closeDeleteModal() {
        const modal = document.getElementById('deleteModal');
        modal.classList.remove('show');
        this.taskToDelete = null;
    }

    confirmDelete() {
        if (this.taskToDelete) {
            this.deleteTask(this.taskToDelete);
            this.closeDeleteModal();
        }
    }

    updateStats() {
        const total = this.tasks.length;
        const completed = this.tasks.filter(task => task.completed).length;
        const pending = total - completed;
        const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
        
        document.getElementById('totalTasks').textContent = total;
        document.getElementById('completedTasks').textContent = completed;
        document.getElementById('completionRate').textContent = `${completionRate}%`;
        
        this.updateFilterCounts();
    }

    updateFilterCounts() {
        const all = this.tasks.length;
        const pending = this.tasks.filter(task => !task.completed).length;
        const completed = this.tasks.filter(task => task.completed).length;
        
        document.getElementById('allCount').textContent = all;
        document.getElementById('pendingCount').textContent = pending;
        document.getElementById('completedCount').textContent = completed;
    }


    // 动画效果
    initAnimations() {
        // 页面加载动画
        anime({
            targets: '.app-container',
            opacity: [0, 1],
            translateY: [20, 0],
            duration: 800,
            easing: 'easeOutQuart'
        });

        anime({
            targets: '.shape',
            translateY: [0, -20, 0],
            rotate: [0, 360],
            duration: 20000,
            loop: true,
            easing: 'easeInOutSine',
            delay: anime.stagger(2000)
        });
    }

    // 通知系统
    showNotification(title, type = 'info', message = '', duration = 3000) {
        const container = document.getElementById('notificationContainer');
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        
        const iconMap = {
            success: `<svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>`,
            error: `<svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>`,
            warning: `<svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"/>
            </svg>`,
            info: `<svg class="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>`
        };
        
        notification.innerHTML = `
            ${iconMap[type] || iconMap.info}
            <div class="notification-content">
                <h4 class="notification-title">${this.escapeHtml(title)}</h4>
                ${message ? `<p class="notification-message">${this.escapeHtml(message)}</p>` : ''}
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </button>
        `;
        
        container.appendChild(notification);
        
        // 动画显示
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // 鑷姩闅愯棌
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, duration);
    }

    toggleTheme() {
        this.showNotification('涓婚鍒囨崲鍔熻兘鍗冲皢鎺ㄥ嚭', 'info', '鏁鏈熷緟鏇村鍔熻兘鏇存柊');
    }

    // 閿洏蹇嵎閿�
    handleKeyboardShortcuts(e) {
        if (e.ctrlKey || e.metaKey) {
            switch (e.key) {
                case 'n':
                    e.preventDefault();
                    this.openTaskModal();
                    break;
                case '/':
                    e.preventDefault();
                    document.getElementById('searchInput').focus();
                    break;
            }
        }
        
        if (e.key === 'Escape') {
            this.closeTaskModal();
            this.closeDeleteModal();
        }
    }

    // 工具函数
    getPriorityText(priority) {
        const priorityMap = {
            high: '高优先级',
            medium: '中优先级',
            low: '低优先级'
        };
        return priorityMap[priority] || '中优先级';
    }

    formatDisplayDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);
        
        if (this.isToday(date)) {
            return '今天';
        } else if (this.isTomorrow(date)) {
            return '明天';
        } else {
            return date.toLocaleDateString('zh-CN', {
                month: 'short',
                day: 'numeric'
            });
        }
    }

    isToday(date) {
        const today = new Date();
        return date.toDateString() === today.toDateString();
    }

    isTomorrow(date) {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return date.toDateString() === tomorrow.toDateString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 鍒濆鍖栧簲鐢�
document.addEventListener('DOMContentLoaded', () => {
    window.todoApp = new TodoApp();
});

// 响应式图表
window.addEventListener('resize', () => {
    if (window.todoApp && window.todoApp.charts) {
        Object.values(window.todoApp.charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    }
});