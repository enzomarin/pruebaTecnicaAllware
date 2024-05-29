import { Link } from "react-router-dom";
import styled from "styled-components";

const Div = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50px;
  margin: 0 auto;
  margin-bottom: 25px;
  justify-content: space-between;
  align-items: center;
  background-color: #037bff;
  color: white;
  padding: 1em;
`;
const StyledLink = styled(Link)`
  outline: none;
  text-decoration: none;
  padding: 10px;
  &:visited {
    color:white;
  }

  &:hover {
    padding: 10px;
    border-bottom: 1px solid;
    color: black;
    background: white;
    border-radius: 5px;
  }
`
const Ul = styled.ul`
  display: flex;
  flex-direction: row;
  gap: 3em;
  margin-right: 1em;
  color:white;
  list-style: none;
  padding: 0;
  `

const Li = styled.li`
  list-style: none;
  padding: 0;
  color: white;

  `

  // Componente que se encarga de renderizar la bara de navegación
export function NavBar(){
  return(
    <Div>
      <h1>React + MYSQL app</h1>
      <Ul>
        <Li>
          <StyledLink to="/">Agregar Vehículos</StyledLink>
        </Li>
        <Li>
          <StyledLink to="/vehicles">Vehículos</StyledLink>
 
        </Li>
      </Ul>
    </Div>
  )
}