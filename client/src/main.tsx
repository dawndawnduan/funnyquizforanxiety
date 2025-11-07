import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App-final.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
