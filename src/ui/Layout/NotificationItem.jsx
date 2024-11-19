import { Link } from "react-router-dom";
import { calculateDate } from "../../utils/helper";

function NotificationItem({ notification }) {
  return (
    <Link to="notifications">
      <div className="text-wrap w-100">
        <div className="header">
          <h6 className="title mb-0">{notification?.title}</h6>
          <span className="time w-100 d-flex justify-content-end">
            {calculateDate(notification?.created_at)}
          </span>
        </div>
        <p className="one-line-wrap">{notification?.description}</p>
      </div>
    </Link>
  );
}

export default NotificationItem;
