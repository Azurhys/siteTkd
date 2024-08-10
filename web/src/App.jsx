import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import Navbar from './components/Navbar'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App m-0 p-0">
      <Navbar />
      <div className="container-fluid m-0 p-0 justify-content-center">
          <Outlet />
      </div>
      <ToastContainer />
    </div>
  )
}

export default App