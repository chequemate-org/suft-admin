import Cookies from "js-cookie";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

// internal import
import { AdminContext } from "@/context/AdminContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { removeSetting } from "@/reduxStore/slice/settingSlice";

const useLoginSubmit = () => {
  const reduxDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { dispatch } = useContext(AdminContext);
  const history = useHistory();
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const cookieTimeOut = 0.5;
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("joiningDate", data.joiningDate);
    formData.append("role", data.role);

    if (data.image && data.image instanceof File) {
      formData.append("file", data.image);
    }

    try {
      const res = await AdminServices.registerAdmin(formData);
      console.log("Response:", res);
      notifySuccess("Register Success!");
      dispatch({ type: "USER_LOGIN", payload: res });
      Cookies.set("adminInfo", JSON.stringify(res), {
        expires: cookieTimeOut,
        sameSite: "None",
        secure: true,
      });
      history.replace("/");
    } catch (err) {
      console.error("Error:", err);
      notifyError(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    onSubmit,
    register,
    handleSubmit,
    errors,
    loading,
  };
};

export default useLoginSubmit;
