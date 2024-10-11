import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
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
        <div className="invoice_template" ref={invoiceRef}>
          <h2>{t("invoice")}</h2>
          <p>Order ID: #{order?.id}</p>
          <p>Customer Name: {order?.customer?.name}</p>
          <p>
            Total Amount: {order?.total} {order?.currency}
          </p>
        </div>

        <button onClick={handlePrint}>{t("print")}</button>
      </Modal.Body>
    </Modal>
  );
}

export default InvoiceModal;
