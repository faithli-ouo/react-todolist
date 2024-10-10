import { ReactNode } from "react";
import "./Container.css"

export default function GlobalContainer({ children }: { children: ReactNode }): React.ReactElement {
    return (
        <>
            <div id='global-container'>
                {children}
            </div>
        </>
    );
}
