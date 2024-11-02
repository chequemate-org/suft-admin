import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import { AdminContext } from "@/context/AdminContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import { removeSetting } from "@/reduxStore/slice/settingSlice";

const useLoginSubmit = () => {
  const reduxDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState(null);
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

    try {
      if (location.pathname === "/login") {
        reduxDispatch(removeSetting("globalSetting"));
        const res = await AdminServices.loginAdmin({
          email: data.email,
          password: data.password,
        });
        notifySuccess("Login Success!");
        dispatch({ type: "USER_LOGIN", payload: res });
        localStorage.setItem("adminToken", res.token);
        
        Cookies.set("adminInfo", JSON.stringify(res), {
          expires: cookieTimeOut,
          sameSite: "None",
          secure: true,
        });
        history.push("/dashboard");
      }

      else if (location.pathname === "/signup") {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("joiningDate", data.joiningDate);
        formData.append("role", data.role);

        if (file) {
          formData.append("image", file);
        }

        const res = await AdminServices.registerAdmin(formData);
        notifySuccess("Register Success!");
        dispatch({ type: "USER_LOGIN", payload: res });
        Cookies.set("adminInfo", JSON.stringify(res), {
          expires: cookieTimeOut,
          sameSite: "None",
          secure: true,
        });
        history.replace("/");
      }

      // Handle forgot password
      else if (location.pathname === "/forgot-password") {
        await AdminServices.forgetPassword({ email: data.email });
        notifySuccess("Password recovery email sent!");
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return {
    onSubmit: handleSubmit(onSubmit),
    handleSubmit,
    register,
    errors,
    loading,
    handleFileChange,
  };
};

export default useLoginSubmit;
