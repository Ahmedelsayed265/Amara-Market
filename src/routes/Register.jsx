import { useState } from "react";
import { Link } from "react-router-dom";
import InputField from "../ui/form-elements/InputField";
import PageHeader from "../ui/Layout/PageHeader";
import PhoneField from "../ui/form-elements/PhoneField";
import PasswordField from "../ui/form-elements/PasswordField";
import LocationField from "../ui/form-elements/LocationField";
import MapModal from "../ui/modals/MapModal";
import useGetCities from "../hooks/settings/useGetCities";
import SelectField from "../ui/form-elements/SelectField";
import useGetCategories from "../hooks/settings/useGetCategories";
import SubmitButton from "../ui/form-elements/SubmitButton";

export default function Register() {
  const { data: cities, isLoading: citiesLoading } = useGetCities();
  const { data: categories, isLoading: categoriesLoading } = useGetCategories();

  const [marketType, setMarketType] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    logo: "",
    image: "",
    name: "",
    phone: "",
    email: "",
    password: "",
    description: "",
    address: "",
    lat: 24.7136,
    lng: 46.6753,
    city_id: "",
    categories: [],
    token: 123,
  });

  const handleChange = (e) => {
    if (e.target.name === "image" || e.target.name === "logo") {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <PageHeader title="إنشاء حساب" />
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center m-0">
            <div className="col-lg-8 col-12">
              <form className="form">
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
                          onChange={() => setMarketType(0)}
                        />
                        <span>متاجر عامة</span>
                      </label>

                      <label htmlFor={1} className="market_type_radio">
                        <input
                          type="radio"
                          name="type"
                          id={1}
                          checked={marketType === 1}
                          onChange={() => setMarketType(1)}
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
                    value={formData?.market_code}
                    onChange={handleChange}
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
                  بمواصلتك، فإنك توافق على{" "}
                  <Link to="/terms">الشروط والاحكام</Link> و{" "}
                  <Link to="/privacy">سياسة الخصوصية</Link>
                </p>
                <SubmitButton name="انشاء حساب" />
                <p className="noAccount">
                  لدي حساب بالفعل
                  <Link to="/login"> تسجيل الدخول </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
        <MapModal
          showModal={showModal}
          setShowModal={setShowModal}
          formData={formData}
          setFormData={setFormData}
        />
      </section>
    </>
  );
}
