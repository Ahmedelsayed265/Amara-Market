import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { calculateDate } from "./../../utils/helper";

function InvoiceModal({ showModal, setShowModal, order }) {
  const { t } = useTranslation();
  const invoiceRef = useRef();
  const user = useSelector((state) => state.authedUser.user);

  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
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
                <h6>
                  {t("customerName")}: {order?.user?.name}
                </h6>
                <p>
                  {t("customerPhone")} {order?.user?.phone}
                </p>
              </div>
              <div className="block">
                <h6>
                  {t("invoiceNumber")} - <b>{order?.id}</b>
                </h6>
                <p>{calculateDate(order?.created_at)}</p>
              </div>
            </div>
          </div>

          <span className="line"></span>

          <table className="exampleTable">
            <thead>
              <th>#</th>
              <th>{t("productName")}</th>
              <th>{t("quantity")}</th>
              <th>{t("price")}</th>
              <th>{t("total")}</th>
            </thead>

            <tbody>
              {order?.products?.map((order) => (
                <tr key={order?.product?.id}>
                  <td>#{order?.product?.id}</td>
                  <td>{order?.product?.title}</td>
                  <td>X{order?.quantity}</td>
                  <td>
                    {order?.product?.price} {t("sar")}{" "}
                  </td>
                  <td>
                    {order?.product?.price * order?.quantity} {t("sar")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice_subTotal">
            <ul>
              <li>
                <h6>{t("subtotal")}</h6>
                <p>
                  {order?.sub_total} {t("sar")}
                </p>
              </li>
              <li>
                <h6>{t("taxes")}</h6>
                <p>
                  {order?.taxes} {t("sar")}
                </p>
              </li>
              <li>
                <h6>{t("deliveryPrice")}</h6>
                <p>
                  {order?.delivery_price} {t("sar")}
                </p>
              </li>
              <li>
                <h6>{t("total")}</h6>

                <b>
                  {order?.total} {t("sar")}
                </b>
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
