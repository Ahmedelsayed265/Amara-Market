import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";
import useGetOrderById from "../hooks/useGetOrderById";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { useTranslation } from "react-i18next";

function OrderDetails() {
  const { id } = useParams();
  const { t } = useTranslation();
  const { data: order, isLoading } = useGetOrderById(id);
  const [now, setNow] = useState(100 / 3);
  const [status, setStatus] = useState(t("new"));

  dayjs.extend(customParseFormat);
  dayjs.extend(localizedFormat);

  const originalDate = order?.created_at;
  const formattedDate = dayjs(originalDate).format("YYYY-MM-DD hh:mm A");

  useEffect(() => {
    if (order?.status === "complete") {
      setNow(100);
      setStatus(t("complete"));
    }
    if (order?.status === "progress") {
      setNow((100 / 3) * 2);
      setStatus(t("progress"));
    }
    if (order?.status === "canceled") {
      setNow(100);
      setStatus(t("canceled"));
    }
  }, [order, t]);

  return (
    <>
      <PageHeader title={t("orderDetails")} />
      <section className="page_content">
        <div className="container">
          {isLoading ? (
            <DataLoader />
          ) : (
            <div className="row m-0">
              <div className="col-12 p-2">
                <div className="order_status">
                  <div className="progress_state">
                    <div className="icon">
                      <i className="fa-sharp fa-solid fa-bag-shopping"></i>
                    </div>
                    <h6>{status}</h6>
                  </div>

                  <ProgressBar now={now} className={order?.status} />
                </div>
              </div>

              <div className="col-lg-6 col-12 p-2 ">
                <div className="d-flex flex-column gap-3">
                  <div className="products_list">
                    {order?.products?.map((c) => (
                      <div className="product" key={c.id}>
                        <div className="pro_img">
                          <img src={c?.product?.image} alt="product" />
                        </div>
                        <div className="info">
                          <h6>{c?.product?.title}</h6>
                          <div className="count_price">
                            <p>
                              {t("quantity")} : <span>X{c?.quantity}</span>
                            </p>
                            <p>
                              {t("total")} :{" "}
                              <span>{c?.product?.price * c?.quantity}</span>{" "}
                              {t("sar")}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-details">
                    <ul>
                      <li>
                        <div className="title">{t("subtotal")}</div>
                        <div className="value">
                          {order?.sub_total.toFixed(2)} {t("sar")}
                        </div>
                      </li>
                      <li>
                        <div className="title">{t("deliveryPrice")}</div>
                        <div className="value ">
                          {order?.delivery_price.toFixed(2)} {t("sar")}
                        </div>
                      </li>
                      <li className="discount">
                        <div className="title">{t("taxes")}</div>
                        <div className="value ">
                          {order?.taxes.toFixed(2)} {t("sar")}
                        </div>
                      </li>
                      <li className="discount">
                        <div className="title">{t("total")}</div>
                        <div className="value ">
                          {order?.total.toFixed(2)} {t("sar")}
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-lg-6 col-12 p-2">
                <div className="reciept">
                  <ul>
                    <li>
                      <div className="icon">
                        <i className="fa-sharp fa-light fa-cube"></i>
                      </div>
                      <div className="text">
                        <span>{t("orderNumber")}</span>
                        <h6>#{order?.id}</h6>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fa-light fa-map-pin"></i>
                      </div>
                      <div className="text">
                        <span>{t("deliveryAddress")}</span>
                        <span>{order?.address?.address}</span>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fa-solid fa-wallet"></i>
                      </div>
                      <div className="text">
                        <span>{t("paymentMethod")} </span>
                        <span>{order?.payment_method}</span>
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fa-light fa-circle-exclamation"></i>
                      </div>
                      <div className="text">
                        <span>{t("notes")}</span>
                        {order?.note ? (
                          <span>{order?.note}</span>
                        ) : (
                          <span>{t("noNotes")}</span>
                        )}
                      </div>
                    </li>
                    <li>
                      <div className="icon">
                        <i className="fa-light fa-calendar-days"></i>
                      </div>
                      <div className="text">
                        <span>{t("orderDate")}</span>
                        <p>
                          <span>{formattedDate}</span>
                        </p>
                      </div>
                    </li>
                  </ul>
                  <div className="products"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default OrderDetails;
