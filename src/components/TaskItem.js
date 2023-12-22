// TaskItem.js
import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import TaskDetails from './TaskDetails';
import { useTaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();
  const [showDetails, setShowDetails] = useState(false);

  const handleDetailsClick = () => {
    setShowDetails(true);
  };

  const handleDetailsClose = () => {
    setShowDetails(false);
  };
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(`https://backendpart-1zdq.onrender.com/api/tasks/${taskId}`);
      dispatch({ type: 'DELETE_TASK', payload: taskId });
    } catch (err) {
      console.log("Let's figure out");
    }
  };

  return (
    <div className='each-task'>
      <div className='title' onClick={handleDetailsClick}>{task.title}</div>
      {showDetails &&
        <TaskDetails 
            task={task} 
            onDelete={() => handleDelete(task._id)} 
            onClose={handleDetailsClose}
        />
      }
    </div>
  );
};

export default TaskItem;
