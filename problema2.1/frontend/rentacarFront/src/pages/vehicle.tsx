import VehicleList from "../components/VehicleList";

// Página que lista los vehículos registrados
export default function VehiclePage (){

  return(
    <div>
      <h2>

        Pagina con los ultimos 10 vehiculos registrados
      </h2>
      <VehicleList/> {/* Renderizamos la tabla*/}
    </div>
  )
}