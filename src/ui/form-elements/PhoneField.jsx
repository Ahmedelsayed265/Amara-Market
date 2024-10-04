import { Form } from "react-bootstrap";

const PhoneField = ({ label, icon, span, ...props }) => {
  return (
    <div className="input-field w-100 phone-field">
      <label htmlFor={props.id}>
        {icon} {label}
      </label>
      <div className="d-flex align-items-center gap-0">
        <Form.Control className="form-control" {...props} maxLength={9} />
        <span className="phone-key">
          966+
          <img src="/images/SA.svg" alt="" />
        </span>
      </div>
      {span && <span className="input-span">{span}</span>}
    </div>
  );
};

export default PhoneField;
