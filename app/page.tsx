import React from 'react'
import AddTask from './components/AddTask'
import { getAllTodos } from '@/api'
import TodoList from './components/TodoList';
export default async function page() {
  const tasks=await getAllTodos();
  console.log(tasks)
  return (
    
      
      <main className='max-w-4xl mx-auto mt-4'>
        <div className='p-10 flex flex-col'>
      <h1 className='text-center font-bold text-2xl'>To-Do List App</h1>
    </div>
    <AddTask />
    
    <div className="overflow-x-auto">
  
  <TodoList tasks={tasks}/>
</div>
    </main>
  ) 
}

