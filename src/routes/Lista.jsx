import { useNavigate } from "react-router-dom";
import styled from "styled-components"


const Container = styled.div``;

const Lista = () => {
    const navigate = useNavigate()
    return (
        <Container>
            <button onClick={() => navigate("/scanner")} >
                Obter patrimônio
            </button>
        </Container>
    )
}

export default Lista