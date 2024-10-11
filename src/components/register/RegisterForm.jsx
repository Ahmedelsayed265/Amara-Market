import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import SubmitButton from "../../ui/form-elements/SubmitButton";
import InputField from "../../ui/form-elements/InputField";
import PhoneField from "../../ui/form-elements/PhoneField";
import PasswordField from "../../ui/form-elements/PasswordField";
import SelectField from "../../ui/form-elements/SelectField";
import LocationField from "../../ui/form-elements/LocationField";
import useGetCities from "../../hooks/settings/useGetCities";
import useGetCategories from "../../hooks/settings/useGetCategories";
import MapModal from "../../ui/modals/MapModal";
import axiosInstance from "../../utils/axiosInstance";

export default function RegisterForm({
  formData,
  setFormData,
  setOtpData,
  setStep,
}) {
  const { data: cities, isLoading: citiesLoading } = useGetCities();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [marketType, setMarketType] = useState(1);
  const [marketCode, setMarketCode] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "image" || e.target.name === "logo") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.lat === 24.7136 && formData.lng === 46.6753) {
      toast.error(t("pleaseSelectLocation"));
      setShowModal(true);
      setLoading(false);
      return;
    }

    if (!formData.image) {
      toast.error(t("bannerRequired"));
      return;
    }

    if (!formData.logo) {
      toast.error(t("logoRequired"));
      return;
    }

    try {
      const res = await axiosInstance.post("/market/can_register", {
        email: formData.email,
        phone: formData.phone,
      });
      if (res.data.code === 200) {
        setStep(2);
        setOtpData((prev) => ({
          ...prev,
          hashed_code: res.data.data,
        }));
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error("Register error:", error);
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="col-lg-8 col-12">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="image" className="image_wrapper">
          <img
            src={
              formData.image
                ? URL.createObjectURL(formData.image)
                : "/images/profile-banner.png"
            }
            alt="banner"
          />
          <label htmlFor="image" className="upload_iamge">
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              onChange={handleChange}
            />
            <img src="/images/upload.svg" alt="upload" />
          </label>
          <label htmlFor="logo" className="logo_wrap">
            <img
              src={
                formData.logo
                  ? URL.createObjectURL(formData.logo)
                  : "/images/ava.jpg"
              }
              alt=""
            />
            <label htmlFor="logo" className="upload_iamge">
              <input
                type="file"
                name="logo"
                id="logo"
                accept="image/*"
                onChange={handleChange}
              />
              <img src="/images/upload.svg" alt="upload" />
            </label>
          </label>
        </label>

        <div className="form_group">
          <InputField
            label={t("marketName")}
            name="name"
            id="name"
            required
            icon={<i className="fa-regular fa-user"></i>}
            placeholder={t("marketName")}
            value={formData.name}
            onChange={handleChange}
          />

          {/* market type  */}
          <div className="input-field">
            <label>
              <i className="fa-sharp fa-solid fa-store"></i> {t("marketType")}
            </label>
            <div className="market_types">
              <label htmlFor={0} className="market_type_radio">
                <input
                  type="radio"
                  name="type"
                  id={0}
                  checked={marketType === 0}
                  onChange={() => {
                    setMarketType(0);
                    setMarketCode("");
                  }}
                />
                <span>{t("globalMarkets")}</span>
              </label>

              <label htmlFor={1} className="market_type_radio">
                <input
                  type="radio"
                  name="type"
                  id={1}
                  checked={marketType === 1}
                  onChange={() => {
                    setMarketType(1);
                    setMarketCode("");
                  }}
                />
                <span>{t("amaraMarkets")}</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form_group">
          <InputField
            label={t("email")}
            name="email"
            id="email"
            type="email"
            required
            icon={<i className="fa-regular fa-envelope"></i>}
            placeholder="EX: example@example.com"
            value={formData.email}
            onChange={handleChange}
          />

          <PhoneField
            label={t("phoneNumber")}
            icon={<i className="fa-light fa-phone"></i>}
            placeholder="5xxxxxxxxx"
            maxLength={9}
            id="phone"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <PasswordField
            label={t("password")}
            placeholder={t("enterPassword")}
            id="password"
            name="password"
            required
            icon={<i className="fa-regular fa-lock"></i>}
            value={formData.password}
            onChange={handleChange}
          />
          <InputField
            label={t("deliveryPrice")}
            name="delivery_price"
            id="delivery_price"
            required
            icon={<i className="fa-regular fa-person-carry-box"></i>}
            placeholder="00"
            value={formData.delivery_price}
            onChange={handleChange}
          />
        </div>

        <div className="form_group">
          <SelectField
            id="city_id"
            label={t("city")}
            placeholder={t("selectCity")}
            icon={<i className="fa-light fa-city"></i>}
            options={cities?.map(({ id, name }) => ({
              value: id,
              label: name,
            }))}
            value={formData.city_id}
            isLoading={citiesLoading}
            onChange={handleChange}
            isMulti={false}
          />

          <div className="input-field">
            <label htmlFor="work_houres">
              <i className="fa-regular fa-clock"></i> {t("workHoures")}
            </label>
            <div className="d-flex align-items-center gap-2">
              <Form.Control
                type="time"
                value={formData.from_time}
                id="from_time"
                required
                name="from_time"
                onChange={handleChange}
              />
              <Form.Control
                type="time"
                required
                value={formData.to_time}
                id="to_time"
                name="to_time"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <SelectField
          id="categories"
          label={t("categories")}
          placeholder={t("selectCategories")}
          icon={<i className="fa-light fa-grid-2"></i>}
          options={categories?.map(({ id, name }) => ({
            value: id,
            label: name,
          }))}
          value={formData.categories}
          isLoading={categoriesLoading}
          onChange={handleChange}
          isMulti={true}
        />

        {marketType === 1 && (
          <InputField
            label={t("marketCode")}
            name="market_code"
            required
            id="market_code"
            icon={<i className="fa-light fa-store"></i>}
            placeholder={t("marketCode")}
            value={marketCode}
            onChange={(e) => setMarketCode(e.target.value)}
          />
        )}

        <LocationField
          label={t("marketLocation")}
          placeholder={t("marketLocation")}
          icon={<i className="fa-light fa-location-dot"></i>}
          setShowModal={setShowModal}
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
        />

        <InputField
          label={t("marketDescription")}
          name="description"
          id="description"
          as={"textarea"}
          required
          icon={<i className="fa-solid fa-dumpster-fire"></i>}
          placeholder={t("marketDescription")}
          value={formData.description}
          onChange={handleChange}
        />

        <p className="noAccount">
          {t("agreement")} <Link to="/terms">{t("termsConditions")}</Link>{" "}
          {t("and")} <Link to="/privacy">{t("privacyPolicy")}</Link>
        </p>

        <SubmitButton name={t("register")} loading={loading} />

        <p className="noAccount">
          {t("alreadyHaveAccount")}
          <Link to="/login"> {t("login")} </Link>
        </p>

        <MapModal
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
        />
      </form>
    </div>
  );
}
