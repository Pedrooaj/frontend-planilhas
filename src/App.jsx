import { useEffect, useState } from "react";
import "./App.css";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styled from "styled-components";

const Container = styled.div`

`;

function App() {
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    const formats = [
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.ITF
    ]

    const onScanSuccess = (decodedText, decodedResult) => {
      try {
        if(formats.includes(decodedResult.result.format.format)){
          setBarcode(decodedText);
        }else{
          console.log("Formato do código de barras não suportado");
        }
      } catch (error) {
        throw error;
      } finally {
        scanner.stop().then(() => {
          console.log("Scanner parado com sucesso");
        }).catch((err) => {
          console.error("Erro ao parar Scanner: ", err);
        });
      };
      }


      
      


 

    const onScanFailure = (error) => {
      console.log(`Erro ao realizar Scan: ${error}`);
    };





    scanner.start(
      { facingMode: "environment", deviceId: undefined}, // Corrigido para passar a string 'environment'
      {
        fps: 60, // Frames per second
        qrbox: { height: 250, width: 250 }, // QR code scanning box size
        disableFlip: false,
        videoConstraints: {
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }

      },
      onScanSuccess,
      onScanFailure
    );

  }, []);

  return (
    <Container>
      <div id="reader" ></div>
      <h1>{barcode ? `Código de barras detectado: ${barcode}` : "Scaneie o codigo de barras"}</h1>
    </Container>
  );
}

export default App;
