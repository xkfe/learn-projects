import LayoutHeader from '@/components/LayoutHeader/index'
import LayoutAside from './components/LayoutAside'
import Modal from './components/Modal'
import { useState } from 'react'

function App() {
  const [modelState, setModelState] = useState(false)
  const toggleModal = () => setModelState(!modelState)

  function modalHeader() {
    return <h1>标题</h1>
  }

  return (
    <>
      <div className='app-container'>
        <LayoutHeader />
        <main className='main-content'>
          <LayoutAside />
          <section className="tasks-section">
            <div className="tasks-header">
              <h2 className="section-title">我的任务</h2>
              <button className="add-task-btn" onClick={toggleModal}>
                <svg
                  className="icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                <span>添加任务</span>
              </button>
            </div>
            {/* empty 空状态 */}
            <div className="empty-state">
              <div className="empty-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h3 className="empty-title">暂无任务</h3>
              <p className="empty-description">点击"添加任务"按钮创建您的第一个待办事项</p>
            </div>

            {/* 任务列表 */}
            <div className="tasks-list">
              <div className="task-card">
                <div className="task-header">
                  <div className="task-left">
                    <input type="checkbox" className="task-checkbox" />
                    <h3 className="task-title">完成项目文档</h3>
                  </div>
                  <div className="task-actions">
                    <button className="task-action-btn edit" title="编辑">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="task-action-btn delete" title="删除">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="task-content">
                  <p className="task-description">完成项目文档的编写</p>
                </div>
                <div className="task-footer">
                  <div className="task-meta">
                    <div className="task-priority high">
                      <span className="priority-dot" />
                      <span>高优先级</span>
                    </div>
                    <div className="task-due-date overdue">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        style={{ width: "0.875rem", height: "0.875rem" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>12月13日</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="task-card">
                <div className="task-header">
                  <div className="task-left">
                    <input type="checkbox" className="task-checkbox" />
                    <h3 className="task-title">代码审查</h3>
                  </div>
                  <div className="task-actions">
                    <button className="task-action-btn edit" title="编辑">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="task-action-btn delete" title="删除">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="task-content">
                  <p className="task-description">审查团队成员提交的代码变更</p>
                </div>
                <div className="task-footer">
                  <div className="task-meta">
                    <div className="task-priority medium">
                      <span className="priority-dot" />
                      <span>中优先级</span>
                    </div>
                    <div className="task-due-date overdue">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        style={{ width: "0.875rem", height: "0.875rem" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>12月14日</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="task-card completed">
                <div className="task-header">
                  <div className="task-left">
                    <input type="checkbox" className="task-checkbox" />
                    <h3 className="task-title">更新依赖包</h3>
                  </div>
                  <div className="task-actions">
                    <button className="task-action-btn edit" title="编辑">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button className="task-action-btn delete" title="删除">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="task-content">
                  <p className="task-description">检查并更新项目的所有依赖包到最新版本</p>
                </div>
                <div className="task-footer">
                  <div className="task-meta">
                    <div className="task-priority low">
                      <span className="priority-dot" />
                      <span>低优先级</span>
                    </div>
                    <div className="task-due-date ">
                      <svg
                        className="icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        style={{ width: "0.875rem", height: "0.875rem" }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span>12月15日</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>
      </div>
      <Modal show={modelState} toggleModal={toggleModal} headerTitle='添加' headerSlot={<h2>这是头部</h2>}></Modal>
    </>
  )
}

export default App
