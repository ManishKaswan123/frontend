// TaskDetails.js
import React, { useState } from 'react';
import axios from 'axios';
import { useTaskContext } from '../context/TaskContext';

const TaskDetails = ({ task, onDelete, onClose }) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description);

  const { dispatch } = useTaskContext();

  const handleUpdate = async () => {
    try {
      const updatedTask = { ...task, title: editedTitle, description: editedDescription };
      await axios.put(`http://localhost:3001/api/tasks/${task._id}`, updatedTask);
      dispatch({ type: 'UPDATE_TASK', payload: updatedTask });
    } catch (err) {
      console.log("Let's figure out");
    }
    onClose();
  };

  return (
    <div className='task-details'>
      <h2>Edit Task</h2>
      <label>Title:</label>
      <input
        type='text'
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <label>Description:</label>
      <textarea
        value={editedDescription}
        onChange={(e) => setEditedDescription(e.target.value)}
      />
      <div className='buttons'>
        <button onClick={handleUpdate}>Update</button>
        <button onClick={onDelete}>Delete</button>
        <button onClick={onClose}>cancel</button>
      </div>
    </div>
  );
};

export default TaskDetails;


