import { Link, useSearchParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import useGetOrders from "../hooks/useGetOrders";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";
import CustomPagination from "../ui/Layout/CustomPagination";
import VerificationModal from "../ui/modals/VerificationModal";
import useGetSettings from "./../hooks/settings/useGetSettings";
import ChoosePayment from "../ui/modals/ChoosePayment";

function Orders() {
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.authedUser);
  const { data: orders, isLoading } = useGetOrders();
  const { data: settings } = useGetSettings();
  const [cookies] = useCookies(["token"]);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState({ status: "all", from: "", to: "" });

  useEffect(() => {
    if (searchParams.get("status")) {
      setFilter((prev) => ({ ...prev, status: searchParams.get("status") }));
    }

    if (searchParams.get("from")) {
      setFilter((prev) => ({ ...prev, from: searchParams.get("from") }));
    }

    if (searchParams.get("to")) {
      setFilter((prev) => ({ ...prev, to: searchParams.get("to") }));
    }
  }, [searchParams]);

  const calculateDate = (createdAt) => {
    const date = new Date(createdAt);
    return `${String(date.getDate()).padStart(2, "0")} / ${String(
      date.getMonth() + 1
    ).padStart(2, "0")} / ${date.getFullYear()}`;
  };

  const handleFilterOrders = () => {
    setSearchParams({ ...filter });
  };

  const updateFilter = (field, value) => {
    setFilter((prev) => ({ ...prev, [field]: value }));
  };

  const handlePay = () => {
    if (user?.wallet >= settings?.verification_cost) {
      setShowPaymentModal(true);
    } else {
      window.open(
        `https://amaraapp.com.sa/api/market/pay_verification_online?Authorization=${cookies.token}`,
        "_blank"
      );
    }
  };

  return (
    <>
      <PageHeader title={t("orders")} />

      {!user?.paid && (
        <section>
          <div className="container">
            <div className="row m-0">
              <div className="col-12 p-2">
                <div className="verification_card">
                  <h2>{!user?.verified ? t("verification") : t("payText")}</h2>
                  {!user?.verified ? (
                    <button onClick={() => setShowVerificationModal(true)}>
                      {t("verifyNow")}
                    </button>
                  ) : (
                    <button onClick={() => handlePay()}>
                      {t("payNow")} {settings?.verification_cost} {t("sar")}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="page_content">
        <div className="container">
          <div className="row m-0">
            <div className="col-lg-3 col-md-2 col-12 p-2 pt-3">
              <div className="filter">
                <h6>
                  <i className="fa-regular fa-sliders"></i> {t("filter")}
                </h6>

                <div className="form-checks">
                  {["all", "new", "progress", "complete", "canceled"].map(
                    (status) => (
                      <Form.Check
                        key={status}
                        type="radio"
                        name="status"
                        id={status}
                        label={t(status)}
                        checked={filter.status === status}
                        onChange={() => updateFilter("status", status)}
                      />
                    )
                  )}
                </div>

                <div className="form gap-2">
                  <div className="input-field">
                    <label htmlFor="start_date">{t("from")}</label>
                    <Form.Control
                      type="date"
                      value={filter.from}
                      onChange={(e) => updateFilter("from", e.target.value)}
                    />
                  </div>
                  <div className="input-field">
                    <label htmlFor="end_date">{t("to")}</label>
                    <Form.Control
                      type="date"
                      value={filter.to}
                      onChange={(e) => updateFilter("to", e.target.value)}
                    />
                  </div>
                </div>

                <button onClick={handleFilterOrders}>{t("confirm")}</button>
              </div>
            </div>

            <div className="col-lg-9 col-md-10 col-12 p-2 h-100">
              {isLoading ? (
                <DataLoader />
              ) : (
                <div className="row h-100">
                  {orders?.data?.map((order) => (
                    <div
                      className="col-lg-6 col-md-6 col-12 p-2"
                      key={order.id}
                    >
                      <Link to={`/order/${order.id}`} className="order_item">
                        <div className="image_info">
                          <div className="img">
                            <img
                              src={order?.user?.image}
                              alt={order?.user?.name}
                            />
                          </div>
                          <div className="info">
                            <h6>{order?.user?.name}</h6>
                            <p>
                              {t("status")} : {t(order?.status)}
                            </p>
                            <p>
                              {t("order")} : {order?.id}#
                            </p>
                          </div>
                        </div>
                        <div className="price_time">
                          <span>{calculateDate(order?.created_at)}</span>
                          <h6>
                            {order?.total} {t("sar")}
                          </h6>
                        </div>
                      </Link>
                    </div>
                  ))}
                  {orders?.data?.length === 0 && (
                    <p className="empty_text">{t("noOrdersWithThisStatus")}</p>
                  )}
                  {orders?.total > 12 && (
                    <CustomPagination count={orders?.total} />
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <VerificationModal
          showModal={showVerificationModal}
          setShowModal={setShowVerificationModal}
        />
        <ChoosePayment
          showModal={showPaymentModal}
          setShowModal={setShowPaymentModal}
        />
      </section>
    </>
  );
}

export default Orders;
