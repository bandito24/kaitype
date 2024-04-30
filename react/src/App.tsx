import './App.css'
import AccountHeader from '@/components/auth/AccountHeader.tsx'
import {Outlet} from 'react-router-dom'

function App() {
  return (
    <>
      <div className="m-auto w-5/6 pt-20">
        <AccountHeader />
        <Outlet />
      </div>
    </>
  )
}

export default App
