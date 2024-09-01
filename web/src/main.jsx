import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil from './pages/Accueil.jsx'
import Adherent from './pages/Adherent.jsx'
import Inscription from './pages/Inscription.jsx'
import Dashboard from './pages/Dashboard.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Accueil />} />
        <Route path='/adherent' element={<Adherent />} />
        <Route path='/inscription' element={<Inscription />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
