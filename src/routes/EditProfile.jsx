import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { setUser } from "../redux/slices/authedUser";
import { useTranslation } from "react-i18next";
import { convertTo12Hour, convertTo24Hour } from "../utils/helper";
import InputField from "../ui/form-elements/InputField";
import LocationField from "../ui/form-elements/LocationField";
import SelectField from "../ui/form-elements/SelectField";
import SubmitButton from "../ui/form-elements/SubmitButton";
import PageHeader from "../ui/Layout/PageHeader";
import MapModal from "../ui/modals/MapModal";
import PhoneField from "../ui/form-elements/PhoneField";
import useGetCities from "../hooks/settings/useGetCities";
import useGetCategories from "../hooks/settings/useGetCategories";
import PasswordField from "../ui/form-elements/PasswordField";
import axiosInstance from "../utils/axiosInstance";

function EditProfile() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [wantChangePassword, setWantChangePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authedUser.user);
  const { t } = useTranslation();
  const { data: cities, isLoading: citiesLoading } = useGetCities();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        city_id: user.city_id,
        lat: user.lat,
        lng: user.lng,
        description: user.description,
        delivery_price: user.delivery_price,
        categories: user.categories?.map((category) => category.id),
        image: user?.image,
        logo: user?.logo,
        password: "",
        from_time: convertTo24Hour(user?.work_hours?.split(" - ")?.[0]),
        to_time: convertTo24Hour(user?.work_hours?.split(" - ")?.[1]),
      });
    }
  }, [user]);

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

    const reqBody = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city_id: formData.city_id,
      lat: formData.lat,
      lng: formData.lng,
      description: formData.description,
      delivery_price: formData.delivery_price,
      categories: formData.categories,
      work_hours:
        convertTo12Hour(formData.from_time) +
        " - " +
        convertTo12Hour(formData.to_time),
    };

    if (typeof formData.image === "object") {
      reqBody.image = formData.image;
    }

    if (typeof formData.logo === "object") {
      reqBody.logo = formData.logo;
    }

    if (formData.password) {
      reqBody.password = formData.password;
    }

    try {
      const res = await axiosInstance.post("/market/update_profile", reqBody, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res.data.code === 200) {
        toast.success("تم تحديث الملف الشخصي بنجاح");
        dispatch(setUser(res.data.data));
        navigate("/");
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
    <>
      <PageHeader title={t("editProfile")} />
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center m-0">
            <div className="col-lg-8 col-12">
              <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="image" className="image_wrapper">
                  <img
                    src={
                      typeof formData.image === "object"
                        ? URL.createObjectURL(formData.image)
                        : formData.image
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
                        typeof formData.logo === "object"
                          ? URL.createObjectURL(formData.logo)
                          : formData.logo
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

                {user?.market_code === 1 && (
                  <InputField
                    label={t("marketCode")}
                    name="market_code"
                    id="market_code"
                    icon={<i className="fa-light fa-store"></i>}
                    placeholder={t("marketCode")}
                    value={formData}
                    onChange={(e) => handleChange(e)}
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
                  icon={<i className="fa-solid fa-dumpster-fire"></i>}
                  placeholder={t("marketDescription")}
                  value={formData.description}
                  onChange={handleChange}
                />

                <div className="question p-0 pt-2">
                  <label htmlFor="wantChangePassword" className="quest">
                    {t("wantChangePassword")}
                  </label>
                  <Form.Switch
                    id="wantChangePassword"
                    name="wantChangePassword"
                    checked={wantChangePassword}
                    onChange={() => setWantChangePassword(!wantChangePassword)}
                  />
                </div>
                {wantChangePassword && (
                  <div className="d-flex gap-2 flex-lg-row flex-column w-100">
                    <PasswordField
                      placeholder={t("enterNewPassword")}
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <SubmitButton name={t("editProfile")} loading={loading} />

                <MapModal
                  showModal={showModal}
                  setShowModal={setShowModal}
                  formData={formData}
                  setFormData={setFormData}
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
