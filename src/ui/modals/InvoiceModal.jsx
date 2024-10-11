import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import InvoiceTemplate from "../Layout/InvoiceTemplate";
import { useReactToPrint } from "react-to-print";

function InvoiceModal({ showModal, setShowModal, order }) {
  const { t } = useTranslation();
  const invoiceRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    documentTitle: "Invoice",
    onAfterPrint: () => setShowModal(false),
  });

  return (
    <Modal
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      centered
    >
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("invoice")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="form">
        <InvoiceTemplate order={order} ref={invoiceRef} />
        <button onClick={() => handlePrint()}>{t("print")}</button>
      </Modal.Body>
    </Modal>
  );
}

export default InvoiceModal;
