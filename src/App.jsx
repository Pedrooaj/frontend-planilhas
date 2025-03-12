import { useEffect } from "react";
import "./App.css";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";
import styled from "styled-components";


const Container = styled.div`

datalist{
  display: none;
}
`

function App() {

  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      videoConstraints: {
        facingMode: { ideal: "environment" }
      }
    }, false);
  
    function onScanSuccess(decodedText, decodedResult) {
      setBarcode(decodedText);
      scanner.pause()
    }
  
    function onScanFailure(error) {
      console.warn(`Code scan error = ${error}`);
    }

    if(barcode){
      scanner.clear().catch(error => console.log("Erro ao fechar scanner"))
    }
    
    scanner.render(onScanSuccess, onScanFailure)

  }, [])
  return (
    <Container>
    <div id="reader"></div>
    <h1>{barcode}</h1>
    
    </Container>
  );
}

export default App;
