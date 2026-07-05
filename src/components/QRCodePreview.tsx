import { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  url: string;
  color: string;
  format: string;
  fileName: string;
};

const QRPlaceholder = () => (
  <svg
    width="200"
    height="200"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    style={{ opacity: 0.20 }}
  >
    <defs>
      {/* Soft diagonal band, repeated seamlessly */}
      <linearGradient
        id="shimmer"
        gradientUnits="userSpaceOnUse"
        x1="0"
        y1="0"
        x2="160"
        y2="50"
        spreadMethod="repeat"
      >
        <stop offset="0%" stopColor="#cec9c962" />
        <stop offset="40%" stopColor="#e1dbdb8d" />
        <stop offset="50%" stopColor="#f3ececa3" />
        <stop offset="60%" stopColor="#adaaaa" />
        <stop offset="100%" stopColor="#fffffd58" />
      </linearGradient>

      <mask id="qr-mask">
        {/* Finder patterns (outer ring + inner square) */}
        <rect x="16" y="16" width="56" height="56" fill="black" />
        <rect x="16" y="16" width="56" height="8" rx="2" fill="white" />
        <rect x="16" y="64" width="56" height="8" rx="2" fill="white" />
        <rect x="16" y="16" width="8" height="56" rx="2" fill="white" />
        <rect x="64" y="16" width="8" height="56" rx="2" fill="white" />
        <rect x="32" y="32" width="24" height="24" rx="3" fill="white" />

        <rect x="128" y="16" width="56" height="56" fill="black" />
        <rect x="128" y="16" width="56" height="8" rx="2" fill="white" />
        <rect x="128" y="64" width="56" height="8" rx="2" fill="white" />
        <rect x="128" y="16" width="8" height="56" rx="2" fill="white" />
        <rect x="176" y="16" width="8" height="56" rx="2" fill="white" />
        <rect x="144" y="32" width="24" height="24" rx="3" fill="white" />

        <rect x="16" y="128" width="56" height="56" fill="black" />
        <rect x="16" y="128" width="56" height="8" rx="2" fill="white" />
        <rect x="16" y="176" width="56" height="8" rx="2" fill="white" />
        <rect x="16" y="128" width="8" height="56" rx="2" fill="white" />
        <rect x="64" y="128" width="8" height="56" rx="2" fill="white" />
        <rect x="32" y="144" width="24" height="24" rx="3" fill="white" />

        {/* Data modules */}
        <rect x="80" y="16" width="8" height="8" rx="1.5" fill="white" />
        <rect x="104" y="16" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="24" width="8" height="8" rx="1.5" fill="white" />
        <rect x="64" y="24" width="8" height="8" rx="1.5" fill="white" />
        <rect x="88" y="24" width="8" height="8" rx="1.5" fill="white" />
        <rect x="128" y="24" width="8" height="8" rx="1.5" fill="white" />
        <rect x="176" y="24" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="32" width="8" height="8" rx="1.5" fill="white" />
        <rect x="32" y="32" width="24" height="8" rx="2" fill="white" />
        <rect x="64" y="32" width="8" height="8" rx="1.5" fill="white" />
        <rect x="80" y="32" width="24" height="8" rx="2" fill="white" />
        <rect x="128" y="32" width="8" height="8" rx="1.5" fill="white" />
        <rect x="144" y="32" width="24" height="8" rx="2" fill="white" />
        <rect x="176" y="32" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="40" width="8" height="8" rx="1.5" fill="white" />
        <rect x="32" y="40" width="24" height="8" rx="2" fill="white" />
        <rect x="64" y="40" width="8" height="8" rx="1.5" fill="white" />
        <rect x="80" y="40" width="8" height="8" rx="1.5" fill="white" />
        <rect x="128" y="40" width="8" height="8" rx="1.5" fill="white" />
        <rect x="144" y="40" width="24" height="8" rx="2" fill="white" />
        <rect x="176" y="40" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="48" width="8" height="8" rx="1.5" fill="white" />
        <rect x="32" y="48" width="24" height="8" rx="2" fill="white" />
        <rect x="64" y="48" width="8" height="8" rx="1.5" fill="white" />
        <rect x="80" y="48" width="16" height="8" rx="2" fill="white" />
        <rect x="104" y="48" width="16" height="8" rx="2" fill="white" />
        <rect x="128" y="48" width="8" height="8" rx="1.5" fill="white" />
        <rect x="144" y="48" width="24" height="8" rx="2" fill="white" />
        <rect x="176" y="48" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="56" width="8" height="8" rx="1.5" fill="white" />
        <rect x="64" y="56" width="8" height="8" rx="1.5" fill="white" />
        <rect x="80" y="56" width="32" height="8" rx="2" fill="white" />
        <rect x="128" y="56" width="8" height="8" rx="1.5" fill="white" />
        <rect x="176" y="56" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="64" width="56" height="8" rx="2" fill="white" />
        <rect x="80" y="64" width="8" height="8" rx="1.5" fill="white" />
        <rect x="96" y="64" width="8" height="8" rx="1.5" fill="white" />
        <rect x="112" y="64" width="8" height="8" rx="1.5" fill="white" />
        <rect x="128" y="64" width="56" height="8" rx="2" fill="white" />
        <rect x="96" y="72" width="8" height="8" rx="1.5" fill="white" />
        <rect x="112" y="72" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="80" width="8" height="8" rx="1.5" fill="white" />
        <rect x="56" y="80" width="40" height="8" rx="2" fill="white" />
        <rect x="104" y="80" width="8" height="8" rx="1.5" fill="white" />
        <rect x="120" y="80" width="8" height="8" rx="1.5" fill="white" />
        <rect x="144" y="80" width="16" height="8" rx="2" fill="white" />
        <rect x="168" y="80" width="8" height="8" rx="1.5" fill="white" />
        <rect x="16" y="88" width="16" height="8" rx="2" fill="white" />
        <rect x="48" y="88" width="16" height="8" rx="2" fill="white" />
        <rect x="72" y="88" width="8" height="8" rx="1.5" fill="white" />
        <rect x="96" y="88" width="32" height="8" rx="2" fill="white" />
        <rect x="136" y="88" width="8" height="8" rx="1.5" fill="white" />
        <rect x="152" y="88" width="16" height="8" rx="2" fill="white" />
        <rect x="176" y="88" width="8" height="8" rx="1.5" fill="white" />
        <rect x="24" y="96" width="32" height="8" rx="2" fill="white" />
        <rect x="64" y="96" width="8" height="8" rx="1.5" fill="white" />
        <rect x="80" y="96" width="8" height="8" rx="1.5" fill="white" />
        <rect x="96" y="96" width="16" height="8" rx="2" fill="white" />
        <rect x="128" y="96" width="8" height="8" rx="1.5" fill="white" />
        <rect x="144" y="96" width="16" height="8" rx="2" fill="white" />
        <rect x="168" y="96" width="16" height="8" rx="2" fill="white" />
        <rect x="16" y="104" width="16" height="8" rx="2" fill="white" />
        <rect x="40" y="104" width="8" height="8" rx="1.5" fill="white" />
        <rect x="56" y="104" width="8" height="8" rx="1.5" fill="white" />
        <rect x="72" y="104" width="8" height="8" rx="1.5" fill="white" />
        <rect x="88" y="104" width="8" height="8" rx="1.5" fill="white" />
        <rect x="112" y="104" width="16" height="8" rx="2" fill="white" />
        <rect x="144" y="104" width="16" height="8" rx="2" fill="white" />
        <rect x="176" y="104" width="8" height="8" rx="1.5" fill="white" />
        <rect x="40" y="112" width="32" height="8" rx="2" fill="white" />
        <rect x="80" y="112" width="8" height="8" rx="1.5" fill="white" />
        <rect x="96" y="112" width="8" height="8" rx="1.5" fill="white" />
        <rect x="120" y="112" width="16" height="8" rx="2" fill="white" />
        <rect x="144" y="112" width="16" height="8" rx="2" fill="white" />
        <rect x="80" y="120" width="16" height="8" rx="2" fill="white" />
        <rect x="104" y="120" width="80" height="8" rx="2" fill="white" />
        <rect x="80" y="128" width="16" height="8" rx="2" fill="white" />
        <rect x="104" y="128" width="24" height="8" rx="2" fill="white" />
        <rect x="152" y="128" width="8" height="8" rx="1.5" fill="white" />
        <rect x="96" y="136" width="32" height="8" rx="2" fill="white" />
        <rect x="136" y="136" width="8" height="8" rx="1.5" fill="white" />
        <rect x="152" y="136" width="8" height="8" rx="1.5" fill="white" />
        <rect x="80" y="144" width="8" height="8" rx="1.5" fill="white" />
        <rect x="96" y="144" width="8" height="8" rx="1.5" fill="white" />
        <rect x="112" y="144" width="16" height="8" rx="2" fill="white" />
        <rect x="152" y="144" width="8" height="8" rx="1.5" fill="white" />
        <rect x="168" y="144" width="8" height="8" rx="1.5" fill="white" />
        <rect x="120" y="152" width="40" height="8" rx="2" fill="white" />
        <rect x="168" y="152" width="8" height="8" rx="1.5" fill="white" />
        <rect x="136" y="160" width="8" height="8" rx="1.5" fill="white" />
        <rect x="160" y="160" width="8" height="8" rx="1.5" fill="white" />
        <rect x="96" y="168" width="8" height="8" rx="1.5" fill="white" />
        <rect x="120" y="168" width="8" height="8" rx="1.5" fill="white" />
        <rect x="136" y="168" width="8" height="8" rx="1.5" fill="white" />
        <rect x="152" y="168" width="8" height="8" rx="1.5" fill="white" />
        <rect x="168" y="168" width="16" height="8" rx="2" fill="white" />
        <rect x="88" y="176" width="8" height="8" rx="1.5" fill="white" />
        <rect x="112" y="176" width="24" height="8" rx="2" fill="white" />
        <rect x="144" y="176" width="16" height="8" rx="2" fill="white" />
        <rect x="176" y="176" width="8" height="8" rx="1.5" fill="white" />
      </mask>
    </defs>

    <style>{`
      @keyframes shine-qr {
        from { transform: translate(0px, 0px); }
        to   { transform: translate(160px, 50px); }
      }
      .shine-rect {
        animation: shine-qr 3.2s linear infinite;
        will-change: transform;
      }
    `}</style>

    {/* Base fill — always fully visible, only the highlight glides over it */}
    <rect x="0" y="0" width="200" height="200" rx="12" fill="#ddd" mask="url(#qr-mask)" />

    <g mask="url(#qr-mask)">
      <rect
        className="shine-rect"
        x="-100"
        y="-100"
        width="400"
        height="400"
        fill="url(#shimmer)"
      />
    </g>
  </svg>
);

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
          <QRPlaceholder />
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
