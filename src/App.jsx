import { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  

  #reader {
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
}

#reader video {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Garante que o vídeo cubra toda a tela */
}
  

  



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
        fps: 10, // Frames per second
        qrbox: { height: 200, width: 200 }, // QR code scanning box size
        disableFlip: false,
        videoConstraints: {
          width: { ideal: 1080 },
          height: { ideal: 1920 },
          frameRate: { ideal: 60 }
        },
        aspectRatio: 9 / 16
        

      },
      onScanSuccess,
      onScanFailure
    );

  }, []);

  return (
    <Container>
      <div id="reader" ></div>
    </Container>
  );
}

export default App;
