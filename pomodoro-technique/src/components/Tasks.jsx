import { useState } from 'react';

const Tasks = () => {
    const [intention, setIntention] = useState("");
    const [taskInput, setTaskInput] = useState("");
    const [tasks, setTasks] = useState([]);

    const addTask = () => {
        if(!taskInput.trim()) return;

        setTasks((prev) => [...prev, {text: taskInput, completed: false}]);
        setTaskInput("");
    }

    const toggleTask = (index) => {
        setTasks((prev) => 
            prev.map((task, i) => 
                i === index ? { ...task, completed: !task.completed} : task
            )
        );
    };

    const clearTasks = () => {
        setTasks([]);
    }
    return (
        <div className="w-full md:w-1/2 flex flex-col items-center">
            <div>
                <div className="my-5">
                    <h1 className="font-medium text-lg">What is your intention today?</h1>
                    <input 
                        type="text"
                        value={intention}
                        onChange={(e) => setIntention(e.target.value)}
                        placeholder='Stay focused, finish report, be calm...'
                        className="px-3 pt-2 border-b bg-transparent text-center text-lg outline-none"
                    />
                </div>
            <div>
                <h2 className="text-lg font-medium mt-10">Tasks</h2>
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={taskInput}
                        onChange={(e) => setTaskInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && addTask()}
                        placeholder="Add a task..."
                        className="px-2 border-b bg-transparent outline-none"
                    />
                    <button
                        onClick={addTask}
                        className="px-4 py-2 bg-black text-white"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* TASK LIST */}
            <ul className="flex flex-col gap-2 my-5">
                {tasks.map((task, index) => (
                <li
                    key={index}
                    className=""
                >
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(index)}
                        className="w-4 h-4 mr-3"
                    />

                    <span
                        className={`flex-1 ${
                        task.completed
                            ? "line-through"
                            : ""
                        }`}
                    >
                        {task.text}
                    </span>
                </li>
                ))}
            </ul>
            {tasks.length > 0 && (
                <button onClick={() => clearTasks()}>
                    Clear
                </button>
            )}
            </div>
        </div>
    )
}

export default Tasks;