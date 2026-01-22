import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Corrección: Quitamos el ".tsx" del final
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
