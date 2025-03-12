import "./App.css";
import Html5QrcodePlugin from "./services/Html5QrcodePlugin";
import { useState } from "react";

function App() {
  const [decodedResults, setDecodedResults] = useState([]);
  const onNewScanResult = (decodedText, decodedResult) => {
    console.log("App [result]", decodedResult);
    setDecodedResults((prev) => [...prev, decodedResult]);
  };

  return (
    <>
     <div className="App-section-title"> Html5-qrcode React demo</div>
      <Html5QrcodePlugin
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
      <p>{decodedResults}</p>
    </>
  );
}

export default App;
