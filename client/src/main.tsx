import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Reading } from './pages/reading/index.tsx'
import { ReadingCreate } from './pages/reading/create/index.tsx'
import { ReadingId } from './pages/reading/[id]/index.tsx'
import { ReadingInvite } from './pages/reading/[id]/invite/index.tsx'
import { ReadingInviteId } from './pages/reading/[id]/invite/[id]/index.tsx'

const router = createBrowserRouter([
  { 
    path: "/",
    element: <App/>,
    children: [
      { path: "/reading", element: <Reading/>},
      { path: "/reading/create", element: <ReadingCreate/>},
      { path: "/reading/:id", element: <ReadingId/>},
      { path: "/reading/:id/invite", element: <ReadingInvite/>},
      { path: "/reading/:rid/invite/:iid", element: <ReadingInviteId/>},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
