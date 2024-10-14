import { useEffect, useRef, useState } from "react"
import GlobalContainer from "../Container"
import "./List.css"

export type TodoList = {
    id: string,
    name: string,
    status: "undo" | "processing" | "finish",
}

export type ListItems = {
    items?: TodoList[]
}

const backend_url = import.meta.env.VITE_BACKEND_HOST!

export default function List({items}: ListItems) {
    
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editTodo, setEditTodo] = useState({id:"", name:"", status:""});

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

      const openEditForm = async (formData: TodoList) => {
        setEditTodo(formData)
        setIsDialogOpen(true)
      }
    
      const submitEditForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); 
      
        const formData = new FormData(e.currentTarget); 
        const id = formData.get('id'); 
      

          await fetch(backend_url + `${id}`, {
            method: 'PUT',
            body: formData,
            });

          closeDialog(); 
          window.location.reload();
      };
      

    const deleteTodo = async (params:string) => {
        await fetch(backend_url+`${params}`,{
            method:'Delete',
        })
        .then((res)=> res.json())
        .catch((err) => console.error(err))
        alert('Delete Success')
        window.location.reload()
    }
    return (
        <>
        <GlobalContainer>
        <ul>
           {items?.length? items.map((items, index) => (
            <li key={items.id}>
                <div className="title">
                    {index + 1}. {items.name} 
                </div>
                <div>
                    <div className={
                    items.status == 'undo'? 'badgeTodo' : items.status == 'processing'? 'badgeProcessing': 'badgeFinish'
                    }>
                        {items.status}
                    </div>
                    <button className="edit" onClick={() => openEditForm({id:items.id, name:items.name, status:items.status})}>edit</button>
                    <button className="delete" onClick={() => deleteTodo(items.id)}>delete</button>

                </div>
                </li>
           )) : <h6>No Data Found</h6>
           } 
        </ul>
        </GlobalContainer>
        {isDialogOpen &&
        <div id='submit-form' ref={dialogRef} >
          <form onSubmit={submitEditForm}>
            <div className="form-header">
                <h2>Edit Form</h2>
                <button id='close' onClick={() => closeDialog()}>x</button>
            </div>
            <div>
            <input id="id" name="id" value={editTodo.id} type="hidden"/>
              <label>Title</label>
              <input id="name" name="name" value={editTodo.name} onChange={(e) => setEditTodo({...editTodo,name:e.target.value})}/>
              <label >Status</label>
              <select name="status" id="status" value={editTodo.status} onChange={(e) => setEditTodo({...editTodo,status:e.target.value})}>
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