import GlobalContainer from "../Container"
import "./List.css"

export type todolist = {
    id: string,
    title: string,
    status: "undo" | "processing" | "finish",
    creatAt: string,
}

export type ListItems = {
    items?: todolist[]
}

export default function List({items}: ListItems) {
    return (
        <>
        <GlobalContainer>
        <ul>
           {items?.length? items.map((items, index) => (
            <li key={items.id}>{index + 1}. {items.title}</li>
           )) : <h6>No Data Found</h6>
           } 
        </ul>
        </GlobalContainer>
        </>
    )
}