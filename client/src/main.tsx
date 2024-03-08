import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
import App from './App.tsx'
import { Reading } from './pages/reading/index.tsx'
import { ReadingCreate } from './pages/reading/create/index.tsx'
import { ReadingId } from './pages/reading/[id]/index.tsx'
import Home from './pages/index.tsx'

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App/>,
    children: [
      { path: "/", element: <Home/>},
      { path: "/reading", element: <Reading/>},
      { path: "/reading/create", element: <ReadingCreate/>},
      { path: "/reading/:id", element: <ReadingId/>},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={new QueryClient()}>
      <RouterProvider router={router}/>
      <ReactQueryDevtools initialIsOpen={false} position='right'/>
    </QueryClientProvider>
  </React.StrictMode>,
)
