import { useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Importando os estilos do toast

const Container = styled.div`
  /* Estilos para o container */
`;

function App() {
  const [barcode, setBarcode] = useState("");
  const [isScanning, setIsScanning] = useState(false); // Flag para evitar múltiplos scans

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    const formats = [
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.ITF
    ];

    const onScanSuccess = (decodedText, decodedResult) => {
      // Verifica se o código é válido e se já não está sendo processado
      if (formats.includes(decodedResult.result.format.format) && !isScanning && decodedText !== barcode) {
        setBarcode(decodedText); // Atualiza o código de barras
        setIsScanning(true); // Desabilita novas detecções até o tempo limite
        toast.success(`Patrimônio adicionado à lista: ${decodedText}`, {
          autoClose: 3000,
          position: "bottom-center",
        });
        // Tempo para resetar a flag de scanning
        setTimeout(() => setIsScanning(false), 3000); // Espera 3 segundos
      }
    };

    const onScanFailure = (error) => {
      console.log(`Erro ao realizar Scan: ${error}`);
    };

    // Inicia o scanner uma única vez
    scanner.start(
      { facingMode: "environment", deviceId: undefined },
      {
        fps: 10, // Frames por segundo
        qrbox: { height: 150, width: 275 }, // Caixa de escaneamento
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

    // Limpa o scanner ao desmontar o componente
    return () => {
      scanner.stop().then(() => {
        console.log("Scanner parado com sucesso");
      }).catch((err) => {
        console.error("Erro ao parar Scanner: ", err);
      });
    };
  }, [barcode, isScanning]); // Não reexecutar a cada renderização, só quando o código ou estado de scan mudar

  return (
    <Container>
      <div id="reader"></div>
      <ToastContainer />
    </Container>
  );
}

export default App;
