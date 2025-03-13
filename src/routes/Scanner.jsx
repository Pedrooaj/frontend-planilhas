import { useContext, useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styled from "styled-components";
import { GlobalContext } from "../context/Globalcontext";
import { useNavigate } from "react-router-dom";

const Container = styled.div``;

function Scanner() {
    const { adicionarPatrimonio } = useContext(GlobalContext);
    const [carregando, setCarregando] = useState(true);
    const navigate = useNavigate();


  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    const formats = [
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.ITF,
    ];

    const onScanSuccess = (decodedText, decodedResult) => {
      try {
        if (formats.includes(decodedResult.result.format.format)) {
          adicionarPatrimonio(decodedText);
          navigate("/");
     

        } else {
          console.log("Formato do código de barras não suportado");
        }
      } catch (error) {
        throw error;
      } /* finally {
        scanner.stop().then(() => {
          console.log("Scanner parado com sucesso");
        }).catch((err) => {
          console.error("Erro ao parar Scanner: ", err);
        });
      }; */
    };

    setTimeout(() => {
        scanner.start(
            { facingMode: "environment", deviceId: undefined }, // Corrigido para passar a string 'environment'
            {
              fps: 12, // Frames per second
              qrbox: { height: 150, width: 275 }, // QR code scanning box size
              disableFlip: false,
              videoConstraints: {
                width: { ideal: 1920, min: 1280 },
                height: { ideal: 1080, min: 720 },
                frameRate: { ideal: 60 },
              },
            },
            onScanSuccess
          ).then(() => setCarregando(false)).catch((err) => console.error("Erro ao iniciar Scanner: ", err));
    }, 500)
  

    return () => {
        scanner.stop()
            .then(() => console.log("Scanner fechado com sucesso!"))
            .catch((err) => console.error("Erro ao fechar scanner!", err)
            )
    }
  }, []);

  return (
    <Container>
      {carregando ? <p>Carregando Scanner...</p> : <div id="reader"></div>}

    </Container>
  );
}

export default Scanner;
