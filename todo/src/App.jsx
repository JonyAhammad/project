import React, { useState } from "react";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedTask, setEditedTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  const toggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditedTask(tasks[index].text);
  };

  const saveEditedTask = (index) => {
    if (editedTask.trim() === "") return;
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, text: editedTask } : task
    );
    setTasks(updatedTasks);
    setEditingIndex(null);
    setEditedTask("");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800">Todo App</h1>
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Add a new task"
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-2xl hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <ul>
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex items-center justify-between mb-2 bg-gray-50 p-3 rounded-xl"
            >
              {editingIndex === index ? (
                <input
                  type="text"
                  value={editedTask}
                  onChange={(e) => setEditedTask(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && saveEditedTask(index)}
                  className="flex-1 mr-2 px-2 py-1 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ) : (
                <span
                  onClick={() => toggleTask(index)}
                  className={`flex-1 cursor-pointer ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                >
                  {task.text}
                </span>
              )}
              <div className="flex items-center gap-2 ml-2">
                {editingIndex === index ? (
                  <button
                    onClick={() => saveEditedTask(index)}
                    className="text-green-500 hover:text-green-700"
                  >
                    ✔
                  </button>
                ) : (
                  <button
                    onClick={() => startEditing(index)}
                    className="text-yellow-500 hover:text-yellow-600"
                  >
                    ✎
                  </button>
                )}
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
