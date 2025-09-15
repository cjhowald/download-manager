import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './preview.css'
import App from './Demo.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
