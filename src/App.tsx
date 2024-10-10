import { useEffect, useRef, useState } from 'react';
import './App.css'
import GlobalFooter from './compoents/global/Footer'
import  GlobalHeader  from './compoents/global/Header'
import List, { todolist } from './compoents/global/List/List'

const tasks: todolist[]  = [
  {
    id: "1",
    title: "Learn TypeScript",
    status: "processing",
    creatAt: "2024-10-10T09:00:00Z"
  },
  {
    id: "2",
    title: "Build a React App",
    status: "undo",
    creatAt: "2024-10-08T14:30:00Z"
  },
  {
    id: "3",
    title: "Fix CSS Layout",
    status: "finish",
    creatAt: "2024-10-07T16:45:00Z"
  },
  {
    id: "4",
    title: "Write Documentation",
    status: "processing",
    creatAt: "2024-10-09T12:15:00Z"
  },
  {
    id: "5",
    title: "Refactor Codebase",
    status: "undo",
    creatAt: "2024-10-10T08:20:00Z"
  }
];



function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const handleSubmitForm = (formData: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(formData.target as HTMLFormElement)
    const form = Object.fromEntries(data)
  }

  const handleDeleteItem = (formData: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(formData.target as HTMLFormElement)
    const form = Object.fromEntries(data)
  }

  const handleEditItem = (formData: React.FormEvent<HTMLFormElement>) => {
    const data = new FormData(formData.target as HTMLFormElement)
    const form = Object.fromEntries(data)
  }

  
  return (
    <>
      <div id='App'>
        <GlobalHeader>
          <h1>React Todolist</h1>
          <button onClick={() => openDialog()}> + </button>
        </GlobalHeader>
        <List items={tasks}></List>
        <GlobalFooter>
          <h3>Footer@{new Date().getFullYear()}</h3>
        </GlobalFooter>
      </div>
      {isDialogOpen &&
        <div id='submit-form' ref={dialogRef}>
          <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmitForm(e)
            }}>
            <button id='close' onClick={() => closeDialog()}>x</button>
            <div>
              <label>Title</label>
              <input id="title" name="title"/>
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
