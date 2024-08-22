import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './app.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Accueil from './pages/Accueil.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        <Route index element={<Accueil />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
