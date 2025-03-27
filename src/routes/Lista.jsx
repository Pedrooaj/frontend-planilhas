import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { GlobalContext } from "../context/Globalcontext";
import { Table, Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";


const Container = styled.div`
    background-image: url("/background.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
    const { lista, removerPatrimonio } = useContext(GlobalContext);
    const navigate = useNavigate();
    
    return (
        <Container>


            <h1>Lista de patrimônios</h1>
            
            {
                lista.patrimonios.length > 0 ? 
                <Table responsive striped="columns">
                    <thead>
                        <tr>
                        
                        <th colSpan={2}>Patrimônio</th>
     
                        </tr>
                    </thead>
                    <tbody>
                {
                    lista.patrimonios.map((item, index) => <tr key={index}><td style={{textAlign: "center"}}>{item}</td> <td style={{ textAlign: "center" }}><FaRegTrashCan onClick={() => removerPatrimonio(item) } style={{ cursor: "pointer" }} /></td></tr>)
                }
                    </tbody>
            </Table> : <h1>Lista vazia...</h1>
            }
                
            
 
            
            <Button variant="primary" onClick={() => navigate("/scanner")} >
                Obter patrimônio <FaArrowRight />
            </Button>
        </Container>
    )
}

export default Lista