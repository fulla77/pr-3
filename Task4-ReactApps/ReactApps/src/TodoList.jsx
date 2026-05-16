import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800&family=Space+Mono:wght@700&display=swap');

  .todo-wrap {
    font-family: 'Tajawal', sans-serif;
    direction: rtl;
    min-height: 100vh;
    padding: 2.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    background: #f7f6f2;
  }

  /* ── Header ── */
  .todo-header {
    text-align: center;
  }
  .todo-header h1 {
    font-size: 30px;
    font-weight: 800;
    color: #2c2c2a;
    margin: 0 0 4px;
  }
  .todo-subtitle {
    font-size: 13px;
    color: #b4b2a9;
    margin: 0;
  }

  /* ── Progress ── */
  .todo-progress-card {
    background: #ffffff;
    border: 0.5px solid #d3d1c7;
    border-radius: 14px;
    padding: 1rem 1.5rem;
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .todo-progress-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .todo-progress-label {
    font-size: 13px;
    font-weight: 500;
    color: #888780;
  }
  .todo-progress-count {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    font-weight: 700;
    color: #534AB7;
  }
  .todo-progress-track {
    height: 7px;
    border-radius: 999px;
    background: #f1efe8;
    overflow: hidden;
  }
  .todo-progress-fill {
    height: 100%;
    border-radius: 999px;
    background: linear-gradient(90deg, #534AB7, #9F99E8);
    transition: width 0.4s cubic-bezier(.4,0,.2,1);
  }

  /* ── Input row ── */
  .todo-input-row {
    display: flex;
    flex-direction: row-reverse;
    gap: 10px;
    width: 100%;
    max-width: 460px;
  }
  .todo-input {
    font-family: 'Tajawal', sans-serif;
    font-size: 15px;
    flex: 1;
    padding: 12px 14px;
    border: 0.5px solid #d3d1c7;
    border-radius: 12px;
    background: #ffffff;
    color: #2c2c2a;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
  }
  .todo-input::placeholder { color: #b4b2a9; }
  .todo-input:focus {
    border-color: #534AB7;
    box-shadow: 0 0 0 3px #EEEDFE;
  }
  .todo-add-btn {
    font-family: 'Tajawal', sans-serif;
    font-size: 15px;
    font-weight: 700;
    background: #534AB7;
    color: #fff;
    border: none;
    border-radius: 12px;
    padding: 12px 20px;
    cursor: pointer;
    white-space: nowrap;
    transition: filter 0.12s, transform 0.1s;
  }
  .todo-add-btn:hover  { filter: brightness(1.1); }
  .todo-add-btn:active { transform: scale(0.96); }

  /* ── List ── */
  .todo-list {
    list-style: none;
    padding: 0;
    margin: 0;
    width: 100%;
    max-width: 460px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  /* ── Todo item ── */
  .todo-item {
    background: #ffffff;
    border: 0.5px solid #d3d1c7;
    border-radius: 12px;
    padding: 12px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    flex-direction: row-reverse;
    transition: opacity 0.2s;
  }
  .todo-item.done {
    background: #f1efe8;
    border-color: #e0ddd5;
    opacity: 0.75;
  }

  /* checkbox */
  .todo-check {
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid #d3d1c7;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.15s, border-color 0.15s;
    color: #fff;
    font-size: 13px;
    font-weight: 700;
    background: transparent;
  }
  .todo-item.done .todo-check {
    background: #1D9E75;
    border-color: #1D9E75;
  }

  /* text */
  .todo-text {
    flex: 1;
    font-size: 15px;
    font-weight: 500;
    color: #2c2c2a;
    cursor: pointer;
    word-break: break-word;
    text-align: right;
    transition: color 0.15s;
  }
  .todo-item.done .todo-text {
    text-decoration: line-through;
    color: #b4b2a9;
  }

  /* delete */
  .todo-del-btn {
    font-family: 'Tajawal', sans-serif;
    font-size: 12px;
    font-weight: 700;
    background: #FAECE7;
    color: #D85A30;
    border: none;
    border-radius: 8px;
    padding: 5px 10px;
    cursor: pointer;
    flex-shrink: 0;
    transition: background 0.12s, transform 0.1s;
  }
  .todo-del-btn:hover  { background: #F5C4B3; }
  .todo-del-btn:active { transform: scale(0.94); }

  /* ── Empty state ── */
  .todo-empty {
    text-align: center;
    color: #b4b2a9;
    font-size: 15px;
    padding: 1.5rem 0;
  }
  .todo-empty-icon {
    font-size: 36px;
    display: block;
    margin-bottom: 8px;
  }

  /* ── Clear done ── */
  .todo-clear-btn {
    font-family: 'Tajawal', sans-serif;
    font-size: 13px;
    font-weight: 500;
    color: #b4b2a9;
    background: none;
    border: none;
    cursor: pointer;
    text-decoration: underline;
    text-decoration-style: dotted;
    padding: 0;
  }
  .todo-clear-btn:hover { color: #D85A30; }
`;

const TodoItem = ({ todo, onToggle, onDelete }) => (
  <li className={`todo-item${todo.done ? " done" : ""}`}>
    <div
      className="todo-check"
      onClick={() => onToggle(todo.id)}
      role="checkbox"
      aria-checked={todo.done}
      tabIndex={0}
      onKeyDown={(e) => e.key === " " && onToggle(todo.id)}
    >
      {todo.done && "✓"}
    </div>
    <span className="todo-text" onClick={() => onToggle(todo.id)}>
      {todo.text}
    </span>
    <button className="todo-del-btn" onClick={() => onDelete(todo.id)}>
      حذف
    </button>
  </li>
);

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim() === "") return;
    setTodos(todos.concat({ id: Date.now(), text: newTodo.trim(), done: false }));
    setNewTodo("");
  };

  const toggleTodo = (id) =>
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const deleteTodo = (id) =>
    setTodos(todos.filter((t) => t.id !== id));

  const clearDone = () =>
    setTodos(todos.filter((t) => !t.done));

  const completedCount = todos.filter((t) => t.done).length;
  const total = todos.length;
  const progressPct = total === 0 ? 0 : (completedCount / total) * 100;

  return (
    <>
      <style>{styles}</style>
      <div className="todo-wrap">

        <div className="todo-header">
          <h1>📋 قائمة المهام</h1>
          <p className="todo-subtitle">نظّم يومك بكل سهولة</p>
        </div>

        {total > 0 && (
          <div className="todo-progress-card">
            <div className="todo-progress-meta">
              <span className="todo-progress-label">تقدّم الإنجاز</span>
              <span className="todo-progress-count">{completedCount} / {total}</span>
            </div>
            <div className="todo-progress-track">
              <div className="todo-progress-fill" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        )}

        <div className="todo-input-row">
          <input
            className="todo-input"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="أضف مهمة جديدة..."
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
          />
          <button className="todo-add-btn" onClick={addTodo}>إضافة</button>
        </div>

        {total === 0 ? (
          <div className="todo-empty">
            <span className="todo-empty-icon">🌿</span>
            لا توجد مهام بعد، أضف مهمتك الأولى!
          </div>
        ) : (
          <ul className="todo-list">
            {todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))}
          </ul>
        )}

        {completedCount > 0 && (
          <button className="todo-clear-btn" onClick={clearDone}>
            مسح المهام المكتملة ({completedCount})
          </button>
        )}

      </div>
    </>
  );
};

export default TodoList;