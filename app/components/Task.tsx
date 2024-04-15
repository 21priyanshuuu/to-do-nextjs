"use client"
import React, { useState } from 'react';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import Modal from './Modal';
import { ITask } from '@/types/tasks';
import {editTodo,deleteTodo } from "../../api"

interface TaskProps {
  task: ITask;
  onEdit: (id: string, newTask: string) => void;
  onDelete: (id: string) => void; // Function to handle task deletion
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  const [modalOpenEdit, setModalOpenEdit] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.task);

  const handleEditChangeSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onEdit(task.id, taskToEdit);
    setModalOpenEdit(false);
  };

  const handleDelete = () => {
    // console.log(id);
    deleteTodo(task.id); // Call onDelete function when delete icon is clicked
  };

  return (
    <tr key={task.id}>
      <td>{task.task}</td>
      <td className="flex gap-5">
        <FiEdit onClick={() => setModalOpenEdit(true)} cursor="pointer" size={20} className="text-blue-500" />
        <FiTrash2 onClick={handleDelete} cursor="pointer" size={20} className="text-red-500" /> {/* Call handleDelete function when delete icon is clicked */}
        <Modal modalOpen={modalOpenEdit} setModalOpen={setModalOpenEdit}>
          <form onSubmit={handleEditChangeSubmit} className="flex flex-row">
            <input
              type="text"
              value={taskToEdit}
              onChange={(e) => setTaskToEdit(e.target.value)}
              placeholder="Type here"
              className="input input-bordered input-primary w-full max-w-xs"
            />
            <button type="submit" className="btn btn-active btn-accent mx-4">
              Submit
            </button>
          </form>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
