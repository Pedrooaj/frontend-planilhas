import { useContext, useEffect } from "react";
import { GlobalContext } from "../Contexts/GlobalContext";
import styled from "styled-components";


const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    background-color: aqua;
    padding: 5px;
    color: black;
    border: none;
    &:hover {
        transition: 1s;
        background-color: aliceblue;

    }
`;


const Home = () => {
    const { values, setValues } = useContext(GlobalContext);
    

    useEffect(() => {
        console.log("O valor mudou para: " + values);  
    },[values])

    return (
        <Container>
            <h1>{values}</h1>
            <Button onClick={() => setValues(values + 1)}>Adicionar</Button>
        </Container>

    )
}

export default Home;