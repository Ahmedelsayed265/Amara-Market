import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";

function InvoiceModal({ showModal, setShowModal, order }) {
  const { t } = useTranslation();
  const invoiceRef = useRef();
  const user = useSelector((state) => state.authedUser.user);

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
          <div className="header">
            <div className="logo">
              <div className="img">
                <img src="/images/logo.png" alt="logo" />
              </div>
              <div className="company">
                <h6>شركة عمارة المحدودة - Amara LLC</h6>
              </div>
            </div>
            <div className="invoice_data">
              <p>{user?.address}</p>
              <p>{user?.email}</p>
              <p>966{user?.phone}+</p>
            </div>
          </div>

          <span className="line"></span>

          <div className="total_price_wrap">
            <div className="info">
              <div className="block">
                <h6>Zayn Ahmed</h6>
                <p>+9960123456789</p>
              </div>
              <div className="block">
                <h6>Invoice - 9874</h6>
                <p>24 May 2023</p>
              </div>
            </div>
            <div className="total">
              <h6>Total</h6>
              <p>$8602.08</p>
            </div>
          </div>

          <span className="line"></span>

          <table className="exampleTable">
            <thead>
              <th>#</th>
              <th>Product Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Discount</th>
              <th>After Discount</th>
            </thead>
            <tbody>
              {order?.products?.map((order) => (
                <tr key={order?.product?.id}>
                  <td>#{order?.product?.id}</td>
                  <td>{order?.product?.title}</td>
                  <td>X{order?.quantity}</td>
                  <td>200 </td>
                  <td>400</td>
                  <td>10%</td>
                  <td>360</td>
                </tr>
              ))}
            </tbody>
          </table>
          <span className="line"></span>
          <div className="invoice_subTotal">
            <ul>
              <li>
                <h6>SUB TOTAL</h6>
                <p>$8500.00</p>
              </li>
              <li>
                <h6>TAX</h6>
                <p>$102.08</p>
              </li>
              <li>
                <h6>GRAND TOTAL</h6>
                <p>$8602.08</p>
              </li>
            </ul>
          </div>
        </div>

        <button onClick={handlePrint}>{t("print")}</button>
      </Modal.Body>
    </Modal>
  );
}

export default InvoiceModal;
