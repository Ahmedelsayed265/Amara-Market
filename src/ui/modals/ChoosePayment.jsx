import { useState } from "react";
import { Modal } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import SubmitButton from "../form-elements/SubmitButton";
import axiosInstance from "../../utils/axiosInstance";
import useGetSettings from "../../hooks/settings/useGetSettings";

export default function ChoosePayment({ showModal, setShowModal }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useSelector((state) => state.authedUser);
  const { data: settings } = useGetSettings();
  const [cookies] = useCookies(["token"]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.post("/market/pay_verification_wallet");
      if (res.data.code === 200) {
        setShowModal(false);
        toast.success(t("paymentSuccess"));
        queryClient.invalidateQueries({ queryKey: ["authed-user"] });
      }
    } catch (error) {
      console.log(error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)} centered>
      <Modal.Header className="pb-0" closeButton>
        <Modal.Title>{t("choosePayment")}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="form gap-0">
        <p className="priceText">
          {t("yourBalance")} : <span>{user?.wallet}</span> {t("sar")}
        </p>
        <p className="priceText">
          {t("ifYouProceedWithWalletAmountWillBeDeducted")}{" "}
          <span>{settings?.verification_cost}</span> {t("sar")}
        </p>
        <div className="d-flex gap-2 w-100 mt-4">
          <SubmitButton
            name={t("walletPay")}
            loading={loading}
            event={handlePayment}
          />
          <Link
            to={`https://amaraapp.com.sa/api/market/pay_verification_online?Authorization=${cookies.token}`}
            target="_blank"
            className="log sub_link"
          >
            {t("onlinePay")}
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
}
