import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App'
import '@fontsource-variable/space-grotesk'
import './index.css'
import './brand.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="*" element={<main style={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center' }}><div><h1>Esta página todavía no existe.</h1><p>La demo de UBUNTU está comenzando por la home.</p><a href="/" style={{ textDecoration: 'underline', fontWeight: 700 }}>Volver al inicio</a></div></main>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
