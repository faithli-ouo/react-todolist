import GlobalContainer from "../Container"
import "./List.css"

export type todolist = {
    id: string,
    name: string,
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
            <li key={items.id}>
                <div className="title">
                    {index + 1}. {items.name} 
                </div>
                <div className={
                    items.status == 'undo'? 'badgeTodo' : items.status == 'processing'? 'badgeProcessing': 'badgeFinish'
                }>
                    {items.status}
                </div>
                </li>
           )) : <h6>No Data Found</h6>
           } 
        </ul>
        </GlobalContainer>
        </>
    )
}