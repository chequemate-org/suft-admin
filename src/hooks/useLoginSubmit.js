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

  const onSubmit = ({ email, password, name, role }) => {
    setLoading(true);
    const cookieTimeOut = 0.5;

    // Handle login
    if (location.pathname === "/login") {
      reduxDispatch(removeSetting("globalSetting"));
      AdminServices.loginAdmin({ email, password })
        .then((res) => {
          setLoading(false);
          notifySuccess("Login Success!");
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("adminInfo", JSON.stringify(res), {
            expires: cookieTimeOut,
            sameSite: "None",
            secure: true,
          });
          history.push("/dashboard");
        })
        .catch((err) => {
          notifyError(err?.response?.data?.message || err?.message);
          setLoading(false);
        });
    }

    // Handle signup
    if (location.pathname === "/signup") {
      AdminServices.registerAdmin({ name, email, role })
        .then((res) => {
          setLoading(false);
          notifySuccess("Register Success!");
          dispatch({ type: "USER_LOGIN", payload: res });
          Cookies.set("adminInfo", JSON.stringify(res), {
            expires: cookieTimeOut,
            sameSite: "None",
            secure: true,
          });
          history.replace("/");
        })
        .catch((err) => {
          notifyError(err?.response?.data?.message || err?.message);
          setLoading(false);
        });
    }

    // Handle forgot password
    if (location.pathname === "/forgot-password") {
      AdminServices.forgetPassword({ email: verifyEmail }) // Send the email for password reset
        .then(() => {
          setLoading(false);
          notifySuccess("Password recovery email sent!");
        })
        .catch((err) => {
          setLoading(false);
          notifyError(err?.response?.data?.message || err?.message);
        });
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
