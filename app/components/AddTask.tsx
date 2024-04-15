"use client";
import React, { FormEventHandler, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Modal from './Modal';
import { addTodo } from '@/api';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';

function AddTask() {
  const router =useRouter();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  // const [taskId, setTaskId] = useState<number>(() => {
  //   // Initialize taskId from local storage, or default to 1
  //   const savedTaskId = localStorage.getItem('taskId');
  //   return savedTaskId ? parseInt(savedTaskId) : 11;
  // });

  const addNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    console.log(newTaskValue);
    try {
      const addedTodo = await addTodo({
        task: newTaskValue,
        id: uuidv4(),
      });
      console.log('New task added:', addedTodo);
      setNewTaskValue("");
      setModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskValue(e.target.value);
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)} className='btn btn-primary w-full  bg-purple-900 text-white font-bold items-center'>
        Add Task <FaPlus />
      </button>
      {modalOpen && (
        <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
          <form onSubmit={addNewTodo} className='flex flex-row'>
            <input type="text" value={newTaskValue} onChange={handleInputChange} placeholder="Type here" className="input input-bordered input-primary w-full max-w-xs" />
            <button type="submit" className="btn btn-active btn-accent mx-4">Submit</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default AddTask;
