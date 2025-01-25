import { Outlet } from "react-router-dom"

export default function Authentication() {
    return <>
        <div className="AuthenticationForm">
            <Outlet/>
        </div>
        <div className="Background">
        </div>
    </>
}