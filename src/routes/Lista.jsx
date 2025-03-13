import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { GlobalContext } from "../context/Globalcontext";


const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    hr{
        width: 100%;
    }
`;

const Lista = () => {
    const { lista } = useContext(GlobalContext);
    const navigate = useNavigate();
    
    return (
        <Container>

            <hr />
            <p>Lista de patrimônios</p>
            <hr  />
            <ul>
                {
                    lista.patrimonios.map((item, index) => <li key={index}>{item}</li>)
                }
            </ul>
            
            <button onClick={() => navigate("/scanner")} >
                Obter patrimônio
            </button>
        </Container>
    )
}

export default Lista