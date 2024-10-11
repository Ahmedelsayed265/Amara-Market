import { Link, useSearchParams } from "react-router-dom";
import { Form } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import useGetOrders from "../hooks/useGetOrders";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";

function Orders() {
  const { t } = useTranslation();
  const { data: orders, isLoading } = useGetOrders();
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

  return (
    <>
      <PageHeader title={t("orders")} />
      <section className="page_content">
        <div className="container">
          <div className="row m-0">
            {isLoading ? (
              <DataLoader />
            ) : (
              <>
                <div className="col-lg-3 col-md-2 col-12 p-2 pt-3">
                  <div className="filter">
                    <h6>
                      <i className="fa-regular fa-sliders"></i> {t("filter")}
                    </h6>

                    <div className="form-checks">
                      {["all", "new", "progress", "complete", "cancel"].map(
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

                <div className="col-lg-9 col-md-10 col-12 p-2">
                  <div className="row">
                    {orders?.map((order) => (
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
                                {t("status")} : {order?.status}
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
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Orders;
