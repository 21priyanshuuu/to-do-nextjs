import { cache } from "react";
import { ITask } from "./types/tasks";
import {task} from "./data/todo";

let nextId=4;

const baseUrl="http://localhost:3002";
export const getAllTodos =async (newTodo:ITask):Promise<ITask[]> =>{
    const todoWithId = { ...newTodo, id: nextId.toString() };
 const res=await fetch(`${baseUrl}/task`,{cache:'no-store'});
 const todos=await res.json();


return todos;
}
export const addTodo = async (newTodo: ITask): Promise<ITask> => {
    try {
      const res = await fetch(`${baseUrl}/task`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
         
        },
        body: JSON.stringify(newTodo),
      });
      if (!res.ok) {
        throw new Error(`Failed to add todo: ${res.status} ${res.statusText}`);
      }
      const addedTodo = await res.json();
      nextId++;
      return addedTodo;
    } catch (error) {
      console.error('Error adding todo:', error);
      throw error; // rethrow the error to be handled by the caller
    }
  };
  export const editTodo = async (todo: ITask): Promise<ITask> => {
    const res = await fetch(`${baseUrl}/task/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    })
    const updatedTodo = await res.json();
    return updatedTodo;
  }
  
  export const deleteTodo = async (id: string): Promise<void> => {
    await fetch(`${baseUrl}/task/${id}`, {
      method: 'DELETE',
    })
  }
  