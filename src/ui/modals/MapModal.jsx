import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import MapWithMarker from "./MapWithMarker";

export default function MapModal({
  showModal,
  setShowModal,
  formData,
  setFormData,
}) {
  const [mapLoaded, setMapLoaded] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyD_N1k4WKCdiZqCIjjgO0aaKz1Y19JqYqw&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => setMapLoaded(true);
        document.head.appendChild(script);
      } else {
        setMapLoaded(true);
      }
    };

    loadGoogleMapsScript();

    return () => {
      if (window.google) {
        document.head.removeChild(
          document.querySelector(`script[src*="googleapis"]`)
        );
      }
    };
  }, []);

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("marketOnMap")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="form">
        {mapLoaded && (
          <MapWithMarker formData={formData} setFormData={setFormData} />
        )}
        <button onClick={() => setShowModal(false)}>{t("confirm")}</button>
      </Modal.Body>
    </Modal>
  );
}
