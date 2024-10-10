import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
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
import { setUser } from "../redux/slices/authedUser";

function EditProfile() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const [wantChangePassword, setWantChangePassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authedUser.user);
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
        categories: user.categories?.map((category) => category.id),
        image: user?.image,
        logo: user?.logo,
        password: "",
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
      categories: formData.categories,
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
      <PageHeader title="تعديل الملف الشخصي" />
      <section className="auth">
        <div className="container">
          <div className="row justify-content-center m-0">
            <div className="col-lg-8 col-12">
              <form className="form" onSubmit={handleSubmit}>
                <div className="image_wrapper">
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
                  <div className="logo_wrap">
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

                <div className="form_group">
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
                  <InputField
                    label="سعر التوصيل"
                    name="delivery_price"
                    id="delivery_price"
                    required
                    icon={<i className="fa-regular fa-person-carry-box"></i>}
                    placeholder="00"
                    value={formData.delivery_price}
                    onChange={handleChange}
                  />
                </div>

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

                {user?.market_code === 1 && (
                  <InputField
                    label="كود المتجر"
                    name="market_code"
                    id="market_code"
                    icon={<i className="fa-light fa-store"></i>}
                    placeholder="كود المتجر"
                    value={formData}
                    onChange={(e) => handleChange(e)}
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

                <div className="question p-0 pt-2">
                  <label htmlFor="wantChangePassword" className="quest">
                    تغيير كلمة المرور
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
                      placeholder="ادخل كلمة المرور"
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                    />
                  </div>
                )}

                <SubmitButton name="تعديل الحساب" loading={loading} />

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
