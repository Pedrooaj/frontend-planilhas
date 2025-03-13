import { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Certifique-se de importar os estilos do toast

const Container = styled.div`
  /* Estilos para o container */
`;

function App() {
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false); // Estado para controlar se já foi detectado um código

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    const formats = [
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.ITF
    ];

    const onScanSuccess = (decodedText, decodedResult) => {
      try {
        // Verificar se o formato está na lista de formatos permitidos
        if (formats.includes(decodedResult.result.format.format)) {
          // Verificar se o código de barras é diferente e não houve código recente sendo processado
          if (!isScanning && decodedText !== barcode) {
            setBarcode(decodedText);  // Atualiza o código de barras
            setIsScanning(true);  // Desativa a flag para evitar múltiplos toasts
            toast.success(`Patrimônio adicionado à lista: ${decodedText}`, {
              autoClose: 3000,
              position: "bottom-center",
            });
            // Tempo para resetar o controle de scanning
            setTimeout(() => setIsScanning(false), 3000); // Aguardar 3 segundos para permitir novo scan
          }
        } else {
          console.log("Formato do código de barras não suportado");
        }
      } catch (error) {
        console.error("Erro ao processar o código:", error);
      }
    };

    const onScanFailure = (error) => {
      console.log(`Erro ao realizar Scan: ${error}`);
    };

    // Inicia o scanner
    scanner.start(
      { facingMode: "environment", deviceId: undefined },
      {
        fps: 10, // Frames per second
        qrbox: { height: 150, width: 275 }, // Tamanho da caixa de escaneamento
        disableFlip: false,
        videoConstraints: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 60 },
        },
      },
      onScanSuccess,
      onScanFailure
    );


  }, [barcode, isScanning]); // Dependência no `barcode` e `isScanning`

  return (
    <Container>
      <div id="reader"></div>
      <ToastContainer />
    </Container>
  );
}

export default App;
