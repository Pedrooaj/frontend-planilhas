import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { GlobalContext } from "../context/Globalcontext";


const Container = styled.div``;

const Lista = () => {
    const { lista } = useContext(GlobalContext);
    const navigate = useNavigate();
    
    return (
        <Container>
            <button onClick={() => navigate("/scanner")} >
                Obter patrimônio
            </button>
            <ul></ul>
        </Container>
    )
}

export default Lista