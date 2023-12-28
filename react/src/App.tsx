import './App.css'
import AccountHeader from "@/components/auth/AccountHeader.tsx";
// import TypeWindow from "@/components/type_window/TypeWindow.tsx";
import SubmissionInput from "@/components/type_submissions/SubmissionInput.tsx";


function App() {

    return (
        <>
        <div className="w-5/6 m-auto pt-20">
            <AccountHeader/>
            {/*<TypeWindow />*/}
            <SubmissionInput />
        </div>

        </>
    )
}

export default App
