import dayjs from "dayjs";
import Cookies from "js-cookie";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";

//internal import
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import AdminServices from "@/services/AdminServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const useStaffSubmit = (uuid) => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state || {};
  const { isDrawerOpen, closeDrawer, setIsUpdate, lang } = useContext(SidebarContext);

  const [imageUrl, setImageUrl] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [language, setLanguage] = useState(lang || "en");
  const [resData, setResData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, setValue, clearErrors, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setLoading(true);
    try {
      const staffData = {
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phoneNumber,
        role: data.role,
        joiningDate: selectedDate || dayjs().format("YYYY-MM-DD"),
        image: imageUrl,
        lang: language,
      };

      const res = uuid ? await AdminServices.updateStaff(uuid, staffData) : await AdminServices.addStaff(staffData);
      setIsUpdate(true);
      notifySuccess(res.message);
      closeDrawer();
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      setIsSubmitting(false);
      setLoading(false);
    }
  };

  const getStaffData = async () => {
    if (!uuid || !adminInfo?.email) return;
    setLoading(true);
    try {
      const res = await AdminServices.getStaffById(uuid, { email: adminInfo.email });
      if (res) {
        setResData(res);
        setValue("name", res.name[language || "en"]);
        setValue("email", res.email);
        setValue("password", "");
        setValue("phoneNumber", res.phoneNumber);
        setValue("role", res.role);
        setSelectedDate(dayjs(res.joiningDate).format("YYYY-MM-DD"));
        setImageUrl(res.image);
      }
    } catch (err) {
      notifyError(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      // Reset form values when drawer is closed
      setResData({});
      setValue("name", "");
      setValue("email", "");
      setValue("password", "");
      setValue("phoneNumber", "");
      setValue("role", "");
      setValue("joiningDate", "");
      setImageUrl("");
      clearErrors();
      setLanguage(lang);
      return;
    }
  
    // Fetch staff data when drawer is opened and a UUID is provided
    if (uuid) getStaffData();
  }, [uuid, isDrawerOpen, adminInfo?.email, lang]); // Ensure dependencies include UUID and drawer state
  

  return {
    register,
    handleSubmit,
    onSubmit,
    language,
    errors,
    setImageUrl,
    imageUrl,
    selectedDate,
    setSelectedDate,
    isSubmitting,
    loading,
    setValue, 
  };
};

export default useStaffSubmit;
