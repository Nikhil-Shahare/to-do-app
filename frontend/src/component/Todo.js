import React, { useState, useEffect } from 'react';
import axios from "axios";

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editTask, setEditTask] = useState({ id: null, text: '' });
  const [update,setUpdate]=useState(false)

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("https://to-do-application-2esl.onrender.com/api/todo/get");
        if (response.data.success) {
          setTasks(response.data.alltodo);
        } else {
          console.error("API returned an error:", response.data.error);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [update]);

  const addTask = () => {
    if (task) {
      // Send a POST request to your backend to add the task
      axios.post("https://to-do-application-2esl.onrender.com/api/todo/add", { todo: task })
        .then(() => {
          setTask('');
          setUpdate(prev=>!prev)
        })
        .catch((err) => console.log(err));
    }
  };

  const updateTask = () => {
    if (editTask.text) {
      // Send a PUT request to your backend to update the task
      axios.put(`https://to-do-application-2esl.onrender.com/api/todo/update`, { todo: editTask.text,_id:editTask.id })
        .then(() => {
          const updatedTasks = tasks.map((task) => {
            if (task._id === editTask.id) {
              return { ...task, todo: editTask.text };
            }
            return task;
          });
          setTasks(updatedTasks);
          setEditTask({ id: null, text: '' });
        })
        .catch((err) => console.log(err));
    }
  };

  const removeTask = async (taskId) => {
    console.log("Deleting task with ID:", taskId);
    try {
      await axios.delete(`http://localhost:4000/api/todo/delete/${taskId}`);
      const updatedTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(updatedTasks);
    } catch (err) {
      console.log("Error deleting task:", err);
    }
  };
  

  return (
    <div>
      <h1>To-Do App</h1>
      <div>
        <input
          type="text"
          placeholder="Add a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task._id === editTask.id ? (
              <div>
                <input
                  type="text"
                  value={editTask.text}
                  onChange={(e) => setEditTask({ ...editTask, text: e.target.value })}
                />
                <button onClick={updateTask}>Update</button>
              </div>
            ) : (
              <div>
                {task.todo}
                <button onClick={() => removeTask(task._id)}>Remove</button>
                <button onClick={() => setEditTask({ id: task._id, text: task.todo })}>Edit</button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todo;
