import './App.css'
import AccountHeader from "@/components/auth/AccountHeader.tsx";
import {Outlet} from "react-router-dom";




function App() {

    return (
        <>
        <div className="w-5/6 m-auto pt-20">
            <AccountHeader/>
            <Outlet/>
        </div>


        </>
    )
}

export default App
