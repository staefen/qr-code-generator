import { useState } from "react";
import InputField from "./components/InputField";
import FileNameInput from "./components/FileNameInput";
import FormatDropdown from "./components/FormatDropdown";
import ColorPicker from "./components/ColorPicker";
import QRCodePreview from "./components/QRCodePreview";

function App() {
  const [url, setUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  const [format, setFormat] = useState<string>("PNG");
  const [color, setColor] = useState<string>("#161515");

return (
  <div className="page">
    <h1 className="app-title">QR Code Generator</h1>
    <div className="container">
      <div className="left-panel">
        <InputField url={url} setUrl={setUrl} />
          <FileNameInput fileName={fileName} setFileName={setFileName} />
        <FormatDropdown format={format} setFormat={setFormat} />
        <ColorPicker color={color} setColor={setColor} />
      </div>

      <QRCodePreview url={url} color={color} format={format} fileName={fileName}/>
    </div>
  </div>
);


}

export default App;
