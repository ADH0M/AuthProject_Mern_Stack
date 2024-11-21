import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
// https://github.com/Boghdady/udemy-build-ecommerce-api-using-nodejs/tree/section-5-categories-CRUD-operations/services