'use client'
import Image from 'next/image';
import {useState} from "react";

const task = {id: 1, text: "Todo Test", completed: false}

export default function Home(Tasks) {
  const  [tasks, setTasks] = useState([]) // rewrite using states
  const filter = 'all'; // rewrite using states

  const [task, setTask] = useState('');
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if(newTask.trim() !== ''){}
    setTasks([...tasks, {text: newTask, completed: false}]);
  };

  const handleToggleTask = (index) => {
      // Implement toggle completed/uncompleted task logic here
    const newTasks = tasks.map((task, i) =>
      i === index ? {...task, completed: !task.completed}: task
    );
    setTasks(newTasks)
  };

  const handleDeleteTask = (index) => {
      // Implement delete task logic here
    const newTask = tasks.filter((_, i) => i !== index);
    setTasks(newTask);
  };

  const clearDoneTasks = () => {
      const Tasks = tasks.filter(task => !task.completed);
      setTasks(Tasks);
  }


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold">TODO</h1>

      </div>
      <div className="mb-4 flex items-center">
        <input
          type="text"
          className="bg-gray-800 text-white border-none rounded p-4 flex-grow"
          placeholder="What to do ?"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          onClick={handleAddTask}
          className="bg-blue-500 text-white p-4 rounded ml-4"
        >
          Add Task
        </button>
      </div>
      <div className="bg-gray-800 rounded p-4">
        {/* Medium level: extract todo's listing to TaskList component */}
        {/* Basic level: map through tasks state by using this code: */}

        <ul>
          {tasks.map((task, index) => (

          <li className="flex justify-between items-center p-2 bg-gray-900 rounded mb-2">
            <div className="flex items-center">
              <button
              className="w-6 h-6 my-auto mr-6"
              onClick={() => handleToggleTask(index)}
              >
                <Image
                      src={task.completed ? "/images/checked.jpg" : "/images/circle.svg"}
                      alt="Task status"
                      width={30}
                      height={30}
                />
              </button>
              <span className={`ml-2 ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>{task.text}</span>
            </div>
            <button onClick={() => handleDeleteTask(index)} className="text-gray-400 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </li>))}
        </ul>
        <div className="mt-4 flex justify-between items-center text-sm text-gray-400">
          <span> {tasks.filter(task => !task.completed).length} items left</span>  {/* show how many uncompleted items left */}
          <div>
            <button onClick={() => alert("Show all")} className={`mr-2 ${filter === 'all' ? 'text-white' : ''}`}>All</button>
         </div>
          <button
            onClick={() => clearDoneTasks()}
            className="text-gray-400 hover:text-white"
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}
