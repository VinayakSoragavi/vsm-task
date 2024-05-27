"use client";
import { useState } from "react";

// AddTask Component
function AddTask({ addtask, setAddtask, setMenuupdate }) {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");

  const handleAddTask = () => {
    if (name.trim() === "" || task.trim() === "") return;
    setMenuupdate((prev) => [
      ...prev,
      {
        name: name,
        status: task,
      },
    ]);
    setName("");
    setTask("");
    setAddtask(false);
  };

  return (
    <div
      className={`${addtask ? "block" : "hidden"
        } absolute z-50 w-full top-0 left-0 flex justify-center bg-gray-800 bg-opacity-75 h-screen items-center`}
    >
      <div className="w-96 bg-white p-5 rounded shadow-lg">
        <div>
          <input
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-full h-10 p-2 mb-4 border border-gray-300 rounded text-black"
            type="text"
            placeholder="Task Name"
          />
        </div>
        <div>
          <select
            onChange={(e) => setTask(e.target.value)}
            value={task}
            className="w-full h-10 p-2 mb-4 border border-gray-300 rounded text-black"
          >
            <option value="" disabled>
              Select Status
            </option>
            <option className="text-black" value="completed">Completed</option>
            <option className="text-black" value="uncompleted">Uncompleted</option>
          </select>
        </div>
        <div className="flex justify-between">
          <button
            onClick={() => setAddtask(false)}
            className="bg-red-500 text-white p-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

// Home Component
export default function Home() {
  const initialTasks = [
    {
      name: "abc",
      status: "completed",
    },
  ];
  const [menuupdate, setMenuupdate] = useState(initialTasks);
  const [addtask, setAddtask] = useState(false);

  const deleteTask = (index) => {
    setMenuupdate(menuupdate.filter((_, i) => i !== index));
  };

  const toggleTaskStatus = (index) => {
    const updatedTasks = menuupdate.map((task, i) =>
      i === index
        ? { ...task, status: task.status === "completed" ? "uncompleted" : "completed" }
        : task
    );
    setMenuupdate(updatedTasks);
  };

  return (
    <>
      <div className="w-full pt-10">
        <div className="flex justify-around">
          <div>
            <button
              onClick={() => setAddtask(true)}
              className="bg-blue-800 text-white p-4 rounded"
            >
              Add Task
            </button>
          </div>
          <div className="w-96 space-y-3">
            {menuupdate.map((elem, index) => (
              <div
                key={index}
                className={`${elem.status === "completed" ? "bg-blue-500" : "bg-red-600"
                  } flex justify-between items-center p-3 rounded`}
              >
                <div className="flex items-center">
                  <input
                    checked={elem.status === "completed"}
                    onChange={() => toggleTaskStatus(index)}
                    className="w-4 h-4"
                    type="checkbox"
                  />
                  <p className="ml-5 text-white">{elem.name}</p>
                </div>
                <button
                  onClick={() => deleteTask(index)}
                  className="bg-red-700 text-white p-2 rounded"
                >
                  Delete Task
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      <AddTask
        addtask={addtask}
        setAddtask={setAddtask}
        setMenuupdate={setMenuupdate}
      />
    </>
  );
}
