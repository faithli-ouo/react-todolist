import { useEffect, useRef, useState } from 'react';
import './App.css'
import GlobalFooter from './compoents/global/Footer'
import  GlobalHeader  from './compoents/global/Header'
import List from './compoents/global/List/List'

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [todos, setTodos] = useState();

  const fetchTodo = async () => {
    try {
      const res = await fetch('http://localhost:3000/');
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {


    fetchTodo()

    const handleClickOutside = (event: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
        closeDialog();
      }
    };

    if (isDialogOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDialogOpen]);

  const submitForm = async (formData: FormData) => {
    "use server";
    await fetch('http://localhost:3000',{
      method:'POST',
      body: formData

    })
    .then((res)=> res.json())
    .catch((error) => console.error("Error:", error))
    closeDialog()
  };

  
  return (
    <>
      <div id='App'>
        <GlobalHeader>
          <h1>React Todolist</h1>
          <button onClick={() => openDialog()}> + </button>
        </GlobalHeader>
        <List items={todos}></List>
        <GlobalFooter>
          <h3>Footer@{new Date().getFullYear()}</h3>
        </GlobalFooter>
      </div>
      {isDialogOpen &&
        <div id='submit-form' ref={dialogRef} >
          <form action={submitForm}>
            <button id='close' onClick={() => closeDialog()}>x</button>
            <div>
              <label>Title</label>
              <input id="name" name="name"/>
              <label >Status</label>
              <select name="status" id="status">
                  <option value="" disabled selected>Select your option</option>
                  <option value="undo">undo</option>
                  <option value="processing">processing</option>
                  <option value="finish">finish</option>
              </select>
              <button type='submit'>Submit</button>
            </div>
          </form>
        </div>
      }
    </>
  )
}

export default App
