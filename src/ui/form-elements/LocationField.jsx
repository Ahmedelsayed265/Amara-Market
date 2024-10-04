import { Form } from "react-bootstrap";

function LocationField({ label, icon, setShowModal, ...props }) {
  return (
    <div className="input-field">
      <label htmlFor={props?.id}>
        {icon} {label}
      </label>
      <div className="d-flex align-items-center gap-2">
        <Form.Control className="form-control" {...props} />
        <div className="location_icon" onClick={() => setShowModal(true)}>
          <img src="/images/mapIcon.svg" alt="location" />
        </div>
      </div>
    </div>
  );
}

export default LocationField;
