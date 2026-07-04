type Props = {
  format: string;
  setFormat: (value: string) => void;
};

export default function FormatDropdown({ format, setFormat }: Props) {
  return (
<div className="dropdown">
  <label>Choose format</label>

  <select
    value={format}
    onChange={(e) => setFormat(e.target.value)}
    className="dropdown-select"
  >
    <option value="PNG">.PNG</option>
    <option value="JPEG">.JPEG</option>
    <option value="SVG">.SVG</option>
  </select>
</div>

  );
}
