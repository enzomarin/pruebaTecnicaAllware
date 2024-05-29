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
        <Route path='/' element={<VehicleFormPage/>}/> {/* Ruta para el formulario de vehículos */}
        <Route path='/vehicles' element={<VehiclePage/>}/> {/* Ruta para mostrar la lista de vehículos */}
        <Route path='*' element={<NotFaundPage/>}/> {/* Ruta para manejar URLs no encontradas */}
     </Routes>
    </>
  )
}

export default App
