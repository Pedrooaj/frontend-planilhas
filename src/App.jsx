import { useEffect } from "react";
import "./App.css";
import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useState } from "react";
import styled from "styled-components";


const Container = styled.div`



`

function App() {

  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");
  
    function onScanSuccess(decodedText, decodedResult) {
      setBarcode(decodedText);
      scanner.stop().then((ignore) => {
        // Scanner parado com sucesso
      }).catch((err) => {
        // para caso ocorra um erro
      });
    }
  
    function onScanFailure(error) {
      console.warn(`Code scan error = ${error}`);
    }

    
    scanner.start({ facingMode: { exact: "environment" }}, {
      fps: 10,
      qrbox: { height: 250, width: 250 },
      disableFlip: false

    }, onScanSuccess)

  }, [])
  return (
    <Container>
    <div id="reader"></div>
    <h1>{barcode}</h1>
    

    </Container>
  );
}

export default App;
