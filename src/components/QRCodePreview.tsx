import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  url: string;
  color: string;
  format: string;
  fileName: string;
};

export default function QRCodePreview({ url, color, format, fileName }: Props) {
  const [dataUrl, setDataUrl] = useState<string>("");

useEffect(() => {
  if (!url) {
    setDataUrl("");
    return;
  }

  const generate = async () => {
    try {
      if (format === "SVG") {
        // ⭐ SVG generator
        const svgString = await QRCode.toString(url, {
          type: "svg",
          color: { dark: color, light: "#FFFFFF" },
        });

        const encoded = encodeURIComponent(svgString);
        setDataUrl(`data:image/svg+xml;charset=utf-8,${encoded}`);
      } else {
        // ⭐ PNG or JPEG generator
        const mimeType =
          format === "JPEG" ? "image/jpeg" : "image/png";

        const rasterDataUrl = await QRCode.toDataURL(url, {
          type: mimeType,
          color: { dark: color, light: "#FFFFFF" },
        });

        setDataUrl(rasterDataUrl);
      }
    } catch (err) {
      console.error("QR generation failed", err);
      setDataUrl("");
    }
  };

  generate();
}, [url, color, format]);


  function handleDownload() {
    if (!dataUrl) return;

    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = `${fileName || "qr-code"}.${format.toLowerCase()}`;
    link.click();
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {dataUrl ? (
        <img
          src={dataUrl}
          alt="QR code"
          style={{ width: 200, height: 200 }}
        />
      ) : (
        <div
          style={{
            width: 200,
            height: 200,
            background: "#eee",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          QR code appears here
        </div>
      )}

      <button
        onClick={handleDownload}
        disabled={!fileName || !dataUrl}
        className={`download-btn ${!fileName || !dataUrl ? "disabled" : ""}`}

      >
        Download
      </button>
    </div>
  );
}
