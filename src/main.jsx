import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "react-toastify/ReactToastify.css"
import './index.css'
import AppRoutes from './Approutes.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>,
)
