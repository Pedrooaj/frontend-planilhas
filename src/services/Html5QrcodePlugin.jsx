import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegioId = "html5qr-code-full-region";

const createConfig = (props) => {
    let config = {};

    if(props.fps){
        config.fps = props.fps;
    }

    if(props.qrbox){
        config.qrbox = props.qrbox;
    }

    if(props.aspectRatio){
        config.aspectRatio = props.aspectRatio;
    }

    if(props.disableFlip !== undefined){
        config.disableFlip = props.disableFlip;
    }
    return config;
}

const Html5QrcodePlugin = (props) => {
    useEffect(() => {
        const config = createConfig(props);
        const verbose = props.verbose === true;

        if(!(props.qrCodeSucessCallback)){
            throw "qrCodeSucess requer uma callback"
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegioId, config, verbose);
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);


        // função responsavel por desmontar componente

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Falha ao limpar html5QrcodeScanner. " , error);
                
            })
        }
    }, [])

    return (
        <div id={qrcodeRegioId} />
    )
}

export default Html5QrcodePlugin;