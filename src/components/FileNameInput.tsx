type Props = {
  fileName: string;
  setFileName: (value: string) => void;
};

export default function FileNameInput({ fileName, setFileName }: Props) {
  return (
    <div className="input-field">
        <label>File name</label>

      <input
        type="text"
        placeholder="Name the file"
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
    </div>
  );
}
