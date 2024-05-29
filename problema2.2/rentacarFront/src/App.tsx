import './App.css'
import { Route, Routes } from 'react-router-dom'
import VehiclePage from './pages/vehicle'
import VehicleFormPage from './pages/vehicleForm'
import NotFaundPage from './pages/NotFound'
import { NavBar } from './components/NavBar'
function App() {

  return (
    <>
    <NavBar/>
     <Routes>
        <Route path='/' element={<VehicleFormPage/>}/>
        <Route path='/vehicles' element={<VehiclePage/>}/>
        <Route path='*' element={<NotFaundPage/>}/>
     </Routes>
    </>
  )
}

export default App
