import { useTranslation } from "react-i18next";
import DataLoader from "../ui/Layout/DataLoader";
import PageHeader from "../ui/Layout/PageHeader";
import useGetNotifications from "./../hooks/useGetNotifications";
import { calculateDate } from "../utils/helper";
import CustomPagination from "../ui/Layout/CustomPagination";

const Notifications = () => {
  const { t } = useTranslation();
  const { isLoading, data: notifications } = useGetNotifications();

  return isLoading ? (
    <DataLoader />
  ) : (
    <>
      <PageHeader title={t("notifications")} />
      <div className="notifications_section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10 p-2 d-flex flex-column gap-2">
              {notifications?.data?.map((notification) => (
                <div className="notify" key={notification?.id}>
                  <div className="notify_info">
                    <div className="content">
                      <h6>{notification?.title}</h6>
                      <p>{notification?.description}</p>
                    </div>
                  </div>
                  <div className="date_time">
                    <span className="d-flex align-items-center gap-2">
                      <i className="fa-thin fa-calendar-days"></i>
                      {calculateDate(notification?.created_at)}{" "}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="col-12 p-2">
              {notifications?.total > 9 && (
                <CustomPagination count={notifications?.total} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
