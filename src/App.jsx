import { useEffect, useState } from "react";
import "./App.css";
import { Html5Qrcode } from "html5-qrcode";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
`;

function App() {
  const [barcode, setBarcode] = useState("");
  const [scannerRunning, setScannerRunning] = useState(false); // Novo estado para monitorar o scanner

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    const onScanSuccess = (decodedText, decodedResult) => {
      setBarcode(decodedText);
      if (scannerRunning) {
        scanner.stop().then(() => {
          setScannerRunning(false); // Atualiza o estado quando o scanner é parado
          console.log("Scanner stopped successfully");
        }).catch((err) => {
          console.error("Error stopping scanner: ", err);
        });
      }
    };

    const onScanFailure = (error) => {
      console.warn(`Code scan error: ${error}`);
    };

    // Inicia o scanner e atualiza o estado para "running"
    scanner.start(
      { facingMode: "environment" },
      {
        fps: 10,
        qrbox: { height: 250, width: 250 },
        disableFlip: false,
      },
      onScanSuccess,
      onScanFailure
    ).then(() => {
      setScannerRunning(true); // Marca como "running" quando o scanner começar
    }).catch((err) => {
      console.error("Error starting scanner: ", err);
    });

    // Cleanup function to stop the scanner when the component unmounts
    return () => {
      if (scannerRunning) {
        scanner.stop().then(() => {
          console.log("Scanner stopped on unmount");
        }).catch((err) => {
          console.error("Error stopping scanner on unmount: ", err);
        });
      }
    };
  }, [scannerRunning]); // Adiciona scannerRunning ao array de dependências para garantir que o stop() seja chamado corretamente

  return (
    <Container>
      <div id="reader" style={{ width: "100%" }}></div>
      <h1>{barcode ? `Scanned Barcode: ${barcode}` : "Scan a QR code"}</h1>
    </Container>
  );
}

export default App;
