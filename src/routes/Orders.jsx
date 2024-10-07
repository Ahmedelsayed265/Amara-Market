import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";
import useGetOrders from "../hooks/useGetOrders";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";

function Orders() {
  const { data: orders, isLoading } = useGetOrders();
  const calculateDate = (createdAt) => {
    const createdDate = new Date(createdAt);
    const dd = String(createdDate.getDate()).padStart(2, "0");
    const mm = String(createdDate.getMonth() + 1).padStart(2, "0");
    const yyyy = createdDate.getFullYear();
    return `${dd} / ${mm} / ${yyyy}`;
  };

  return (
    <>
      <PageHeader title="الطلبات" />
      <section className="page_content">
        <div className="container">
          <div className="row m-0">
            {isLoading ? (
              <DataLoader />
            ) : (
              <>
                <div className="col-lg-2 col-md-2 col-12 p-2 pt-3">
                  <div className="filter">
                    <h6>تصفية</h6>

                    <div className="form-checks">
                      <Form.Check type="radio" name="status" id="all" label="كل الطلبات" />
                      <Form.Check type="radio" name="status" id="new" label="جديد" />
                      <Form.Check type="radio" name="status" id="progress" label="الحالى" />
                      <Form.Check type="radio" name="status" id="complete" label="مكتمل" />
                      <Form.Check type="radio" name="status" id="cancel" label="ملغى" />
                    </div>

                    <div className="form gap-2">
                      <div className="input-field">
                        <label htmlFor="start_date">من</label>
                        <Form.Control type="date" />
                      </div>
                      <div className="input-field">
                        <label htmlFor="start_date">الى</label>
                        <Form.Control type="date" />
                      </div>
                    </div>

                    <button>تأكيد</button>
                  </div>
                </div>
                <div className="col-lg-10 col-md-10 col-12 p-2">
                  <div className="row">
                    {orders?.map((order) => (
                      <div
                        className="col-lg-4 col-md-6 col-12 p-2"
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
                              <p>حالة الطلب : {order?.status}</p>
                              <p>رقم الاوردر : {order?.id}#</p>
                            </div>
                          </div>
                          <div className="price_time">
                            <span>{calculateDate(order?.created_at)}</span>
                            <h6>{order?.total} ر.س</h6>
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
