export default function InputField({ className = "", name, type, value, label, required, errorMsg }) {
  // add the required label if needed
  className += required ? ' required-label' : '';

  return (
    <div className="text-start">
      <label className={`form-label ${className}`} htmlFor={name}>{label}</label>
      <input className="form-control"
        type={type}
        id={name}
        value={value}
        required={required}
        name={name}
      />
      <div className="invalid-feedback">{errorMsg}</div>
    </div>
  )
}