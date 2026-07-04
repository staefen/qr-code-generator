export default function InputField({ url, setUrl }: Props) {
  const isValid = url.startsWith("http");

  return (
    <div className="input-field">
          <label>Link</label>

      <input
        type="text"
        placeholder="Insert link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className={isValid ? "valid" : ""}
      />

      {isValid && <span className="checkmark">✔</span>}
    </div>
  );
}
