import { Link } from "react-router-dom";
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
                {orders?.map((order) => (
                  <div className="col-lg-4 col-md-6 col-12 p-2" key={order.id}>
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
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Orders;
