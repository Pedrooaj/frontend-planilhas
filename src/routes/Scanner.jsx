import { useContext, useEffect, useState } from "react";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import styled from "styled-components";
import { GlobalContext } from "../context/Globalcontext";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  #reader {
    width: 100%;
    height: 100%;
  }

  video {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
  }
`;

function Scanner() {
  const { adicionarPatrimonio } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const scanner = new Html5Qrcode("reader");

    const formats = [
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.ITF,
    ];

    const onScanSuccess = async (decodedText, decodedResult) => {
      try {
        if (formats.includes(decodedResult.result.format.format)) {
          adicionarPatrimonio(decodedText);
          await scanner
            .stop()
            .then(() => console.log("Scanner fechado com sucesso"))
            .catch((error) => console.log("Erro ao chegar scanner ", error));
          navigate("/");
        } else {
          console.log("Formato do código de barras não suportado");
        }
      } catch (error) {
        throw error;
      }
    };


    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const cameras = devices.filter((device) => device.kind === "videoinput");
    
      // Tenta encontrar uma câmera traseira pelo nome
      const backCamera = cameras.length > 1 ? cameras[1] : cameras[0]
    
      if (!backCamera) {
        console.error("Nenhuma câmera traseira encontrada!");
        return;
      }



    scanner
      .start(
        { deviceId: backCamera.deviceId },
        {
          fps: 12, // Frames per second
          qrbox: { height: 150, width: 275 }, // QR code scanning box size
          disableFlip: false,
          videoConstraints: {
            width: { exact: 1920, min: 1280 },
            height: { exact: 1080, min: 720 },
            frameRate: { ideal: 60 },
            facingMode: { exact: "environment" },
          },
        },
        onScanSuccess
      )
    })
      .finally(() => setCarregando(false));
  }, []);

  return (
    <Container>
      <div id="reader"></div>
      {carregando && (
        <Spinner
          style={{ position: "absolute" }}
          animation="border"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}
    </Container>
  );
}

export default Scanner;
