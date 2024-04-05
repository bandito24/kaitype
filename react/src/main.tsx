import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ContextProvider} from '@/contexts/contextProvider.tsx'
import {RouterProvider} from 'react-router-dom'
import router from '@/router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
)
