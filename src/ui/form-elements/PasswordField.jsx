import { useState } from "react";
import { Form } from "react-bootstrap";

export default function PasswordField({ label, icon, ...props }) {
  const [showPass, setShowPass] = useState(false);
  const handleInputType = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };
  return (
    <div className="input-field">
      <label htmlFor={props?.id}>
        {icon} {label}
      </label>
      <div className="pass-group">
        <Form.Control
          minLength={6}
          {...props}
          type={showPass ? "text" : "password"}
        />
        <div className="show-pass" onClick={handleInputType}>
          <i
            className={`fa-regular ${!showPass ? "fa-eye-slash" : "fa-eye"}`}
          />
        </div>
      </div>
    </div>
  );
}
