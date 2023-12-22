// App.js
import React, { useEffect } from 'react';
import axios from 'axios';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useTaskContext } from './context/TaskContext';
import './App.css';

const App = () => {
  const { state, dispatch } = useTaskContext();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('https://backendpart-1zdq.onrender.com/api/tasks');
        dispatch({ type: 'SET_TASKS', payload: response.data.data });
      } catch (err) {
        console.log("Let's figure out");
      }
    };
    fetchTasks();
  }, [dispatch]);

  const handleAddTask = async (newTask) => {
    try {
      const response = await axios.post('https://backendpart-1zdq.onrender.com/api/tasks', newTask);
      dispatch({ type: 'ADD_TASK', payload: response.data });
    } catch (err) {
      console.log("Let's figure out");
    }
  };

  return (
    <div className='All-tasks'>
      <h1>Task Manager</h1>
      <div className='task'>
        <TaskList tasks={state.tasks} />
      </div>
      <TaskForm onSubmit={handleAddTask} />
    </div>
  );
};

export default App;
