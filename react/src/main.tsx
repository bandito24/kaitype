import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {ContextProvider} from '@/contexts/contextProvider.tsx'
import {RouterProvider} from 'react-router-dom'
import router from '@/router.tsx'
import {ReactQueryDevtools} from '@tanstack/react-query-devtools'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ContextProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools />
      </ContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
