import { Form } from "react-bootstrap";

export default function InputField({
  label,
  icon,
  hint,
  pattern,
  as,
  ...props
}) {
  return (
    <div className="input-field">
      <label htmlFor={props?.id}>
        {icon} {label} {hint && <span className="hint">{hint}</span>}
      </label>
      <Form.Control
        as={as}
        className="form-control"
        {...props}
        pattern={pattern}
      />
    </div>
  );
}
