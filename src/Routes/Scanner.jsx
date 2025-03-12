import { useState } from "react";
import Html5QrcodePlugin from "../services/Html5QrcodePlugin";
import styled from "styled-components";



const Container = styled.div`
  width: 100%;
  height: 100%;

  margin: 0;         /* Remover margens */
  padding: 0;        /* Remover padding */
  display: flex;     /* Usar flexbox para organizar os filhos */
  justify-content: center;
  align-items: center; /* Centralizar o conteúdo */
  box-sizing: border-box;  /* Inclui padding e border dentro da largura */
`;


const Scanner = () => {
    const [decodedResults, setDecodedResults] = useState([]);

    const onNewScanResult = (decodedText, decodedResult) => {
        console.log("App [Result]", decodedResult);
        setDecodedResults([...decodedResults, decodedResult]);        
    }
    return (
        <Container>
            <section>
                <div>
                    Html5-qrcode React
                </div>
                <Html5QrcodePlugin fps={10} qrbox={250} disableFlip={false} qrCodeSucessCallback={onNewScanResult} />
                <p>{decodedResults}</p>
                
            </section>
        </Container>
    )
}

export default Scanner