import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import { GlobalContext } from "../context/Globalcontext";
import { Table, Button } from "react-bootstrap";
import { CiBarcode } from "react-icons/ci";
import { FaRegTrashCan } from "react-icons/fa6";


const Container = styled.div`
    background-image: url("/background.svg");
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    width: 100%;
    height: 100%;
    padding: 10px;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    hr{
        width: 100%;
    }

    & #tabela{
        width: 80%;
        max-height: 70%;
        margin: 0;
    }
    & p{
        font-size: 1.5em;
        text-align: center;
    }



`;

const Lista = () => {
    const { lista, removerPatrimonio } = useContext(GlobalContext);
    const navigate = useNavigate();
    
    return (
        <Container>



            
            {
                lista.patrimonios.length > 0 ? 
                <Table id="tabela" striped="columns">
                    <thead>
                        <tr>
                        
                        <th style={{textAlign: "center"}} colSpan={2}>Patrimônios</th>
     
                        </tr>
                    </thead>
                    <tbody>
                {
                    lista.patrimonios.map((item, index) => <tr key={index}><td style={{textAlign: "center"}}>{item}</td> <td onClick={() => removerPatrimonio(item) }  style={{ textAlign: "center" }}><FaRegTrashCan style={{ cursor: "pointer" }} /></td></tr>)
                }
                    </tbody>
            </Table> : <p>Lista vazia...</p>
            }
                
            
 
            
            <Button variant="primary" onClick={() => navigate("/scanner")} >
                Obter patrimônio <br /> <CiBarcode size={30} />
            </Button>
        </Container>
    )
}

export default Lista