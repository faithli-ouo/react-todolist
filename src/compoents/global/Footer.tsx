import { ReactElement, ReactNode } from "react"
import GlobalContainer from "./Container"
import "./Footer.css"


export default function GlobalFooter({children}: {children: ReactNode}):ReactElement {
    return <>
    <GlobalContainer>
        <footer>
            {children}
        </footer>
    </GlobalContainer>
    </>
}
