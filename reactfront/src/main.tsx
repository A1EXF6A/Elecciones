
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import Home from './admin/HomeAdmin.tsx'

// Importacion de estilos
import './index.css'
import 'normalize.css'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Home />
  </BrowserRouter>
)
