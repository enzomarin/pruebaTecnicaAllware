import styled from "styled-components";
import VehicleForm from "../components/VehicleForm";


// página del formulario de vehículo
export default function VehicleFormPage (){
  const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; 
  
  `
  return(
    <Div>
      <h2>
        Agrega un nuevo Vehículo
      </h2>
      <VehicleForm onVehicleAdded={()=>{}}/> {/* Renderización del componente del formulario de ingreso */}
    </Div>
  )
}