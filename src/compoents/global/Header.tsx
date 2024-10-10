import { ReactNode } from "react"
import GlobalContainer from "./Container"
import "./Header.css"

export default function GlobalHeader({children}:{children: ReactNode}):React.ReactElement {
    return <>
    <GlobalContainer>
        <header>
            {children}
        </header>
    </GlobalContainer>
    </>
}
