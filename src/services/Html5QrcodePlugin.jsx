import { Html5Qrcode, Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";

const createConfig = (props) => {
    let config = {};
    if (props.fps) {
        config.fps = props.fps;
    }
    if (props.qrbox) {
        config.qrbox = props.qrbox;
    }
    if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
    }
    if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
    }
    return config;
};

const Html5QrcodePlugin = (props) => {
    useEffect(() => {

        const getCameras = async () => {
            const cameras = await Html5Qrcode.getCameras();
            if(cameras && cameras.length > 0){
                const backCamera = cameras.find(camera => camera.id.includes("back") || camera.label.toLocaleLowerCase().includes("back"))
                backCamera ? backCamera.id : cameras[0].id;
            }
        }

        const config = createConfig(props);
        const verbose = props.verbose === true;
        if(!(props.qrCodeSuccessCallback)){
            throw "qrCodeSuccessCallback e requerida.";
        }
        const html5QrcodeScanner = new Html5QrcodeScanner(qrcodeRegionId, config, verbose);
        getCameras();
        html5QrcodeScanner.render(props.qrCodeSuccessCallback, props.qrCodeErrorCallback);
    

        return () => {
            html5QrcodeScanner.clear().catch(error => {
                console.error("Falha ao realizar limpeza do html5QrcodeScanner ", error);
            });
        };
    }, [])

    return (
        <div id={qrcodeRegionId} />
    )
}

export default Html5QrcodePlugin;