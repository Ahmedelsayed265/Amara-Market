import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
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
        <div className="image_wrapper">
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
          <div className="logo_wrap">
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
          </div>
        </div>

        <div className="form_group">
          <InputField
            label="إسم المتجر"
            name="name"
            id="name"
            required
            icon={<i className="fa-regular fa-user"></i>}
            placeholder="اسم المتجر"
            value={formData.name}
            onChange={handleChange}
          />

          {/* market type  */}
          <div className="input-field">
            <label>
              <i className="fa-sharp fa-solid fa-store"></i> نوع المتجر
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
                <span>متاجر عامة</span>
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
                <span>متاجر عمارة</span>
              </label>
            </div>
          </div>
        </div>

        <div className="form_group">
          <InputField
            label="البريد الالكتروني"
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
            label="رقم الهاتف"
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

        <PasswordField
          label={"كلمة المرور"}
          placeholder="ادخل كلمة المرور"
          id="password"
          name="password"
          required
          icon={<i className="fa-regular fa-lock"></i>}
          value={formData.password}
          onChange={handleChange}
        />

        <SelectField
          id="city_id"
          label="المدينة"
          placeholder="إختر المدينة"
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

        <SelectField
          id="categories"
          label="القسم"
          placeholder="إختر القسم"
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
            label="كود المتجر"
            name="market_code"
            id="market_code"
            icon={<i className="fa-light fa-store"></i>}
            placeholder="كود المتجر"
            value={marketCode}
            onChange={(e) => setMarketCode(e.target.value)}
          />
        )}

        <LocationField
          label="موقع المتجر"
          placeholder="موقع المتجر"
          icon={<i className="fa-light fa-location-dot"></i>}
          setShowModal={setShowModal}
          id="address"
          name="address"
          required
          value={formData.address}
          onChange={handleChange}
        />

        <InputField
          label="وصف المتجر"
          name="description"
          id="description"
          as={"textarea"}
          icon={<i className="fa-solid fa-dumpster-fire"></i>}
          placeholder="وصف المتجر"
          value={formData.description}
          onChange={handleChange}
        />

        <p className="noAccount">
          بمواصلتك، فإنك توافق على <Link to="/terms">الشروط والاحكام</Link> و{" "}
          <Link to="/privacy">سياسة الخصوصية</Link>
        </p>

        <SubmitButton name="انشاء حساب" loading={loading} />

        <p className="noAccount">
          لدي حساب بالفعل
          <Link to="/login"> تسجيل الدخول </Link>
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
