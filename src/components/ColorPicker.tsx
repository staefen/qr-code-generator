const colors = [
  "#161515", "#a09999", "#FF0000", "#cdcd5c",
  "#800080", "#00FF00", "#FFC0CB", "#FFA500",
];

type Props = {
  color: string;
  setColor: (value: string) => void;
};

export default function ColorPicker({ color, setColor }: Props) {
  return (
    <div>
      <div className="color">
        <label>Pick QR-code color</label>
      </div>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {colors.map((c) => (
          <div
            key={c}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 6,
              margin: 4,
            }}
          >
            <button
              style={{
                backgroundColor: c,
                width: 32,
                height: 32,
                border: "none",
                cursor: "pointer",
              }}
              onClick={() => setColor(c)}
            />

            <div
              style={{
                width: 32,
                height: 3,
                backgroundColor: color === c ? "#464646" : "transparent",
                borderRadius: 2,
                transition: "background-color 0.2s ease",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
