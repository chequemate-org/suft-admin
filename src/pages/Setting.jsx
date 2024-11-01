import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@windmill/react-ui";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { removeSetting } from "@/reduxStore/slice/settingSlice";
import axios from "axios";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Error from "@/components/form/others/Error";
import PageTitle from "@/components/Typography/PageTitle";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import AnimatedContent from "@/components/common/AnimatedContent";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import DeleteModal from "@/components/modal/DeleteModal";

const useSettingSubmit = (isEditForm = false) => {
  const dispatch = useDispatch();
  const { setIsUpdate } = useContext(SidebarContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [existingSettings, setExistingSettings] = useState(null);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [settingId, setSettingId] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (isEditForm) {
      const fetchExistingSettings = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/setting/admin/get-setting`
          );
          const fetchedSettings = response.data.data;
          setExistingSettings(fetchedSettings);

          Object.entries(fetchedSettings).forEach(([key, value]) => {
            setValue(key, value);
          });
        } catch (error) {
          console.error("Error fetching existing settings:", error);
          notifyError("Failed to fetch existing settings");
        }
      };

      fetchExistingSettings();
    }
  }, [isEditForm, setValue]);

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      const settingData = {
        currency: data.currency,
        taxRate: parseFloat(data.taxRate),
        shippingRate: parseFloat(data.shippingRate),
        banner: data.banner,
        email: data.email,
        website: data.website,
      };

      console.log("Prepared setting data:", settingData);

      const endpoint = isEditForm
        ? `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/setting/admin/update-setting`
        : `${import.meta.env.VITE_APP_API_BASE_URL}/setting/admin/add-setting`;

      const method = isEditForm ? "put" : "post";

      const response = await axios[method](endpoint, settingData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response from API:", response.data);

      setIsSubmitting(false);
      setIsUpdate(true);
      dispatch(removeSetting());
      notifySuccess(
        response.data.message ||
          `Settings ${isEditForm ? "updated" : "added"} successfully`
      );
    } catch (err) {
      console.error("Error occurred:", err);
      notifyError(err?.response?.data?.message || err.message);
      setIsSubmitting(false);
    }
  };

  const handleDeleteSetting = async () => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_API_BASE_URL}/setting/admin/delete-setting`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      notifySuccess(response.data.message || "Settings deleted successfully");
      setIsUpdate(true);
      setDeleteModalOpen(false);
    } catch (error) {
      console.error("Error deleting settings:", error);
      notifyError(
        error?.response?.data?.message || "Failed to delete settings"
      );
      setDeleteModalOpen(false);
    }
  };

  return {
    errors,
    register,
    isSubmitting,
    onSubmit,
    handleSubmit,
    existingSettings,
  };
};

const SettingForm = ({ isEditForm }) => {
  const {
    errors,
    register,
    isSubmitting,
    onSubmit,
    handleSubmit,
    existingSettings,
  } = useSettingSubmit(isEditForm);
  const { t } = useTranslation();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-12 font-sans">
        <div className="md:col-span-12 lg:col-span-12 col-span-12 mr-3">
          <div className="lg:px-6 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 scrollbar-hide flex-grow w-full max-h-full pt-4 pb-0">
            {[
              "currency",
              "vatRate",
              "shippingRate",
              "banner",
              "email",
              "website",
            ].map((field) => (
              <div
                key={field}
                className="md:grid-cols-5 sm:grid-cols-10 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6"
              >
                <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                  {t(field.charAt(0).toUpperCase() + field.slice(1))}
                </label>
                <div className="sm:col-span-3">
                  <InputAreaTwo
                    register={register}
                    defaultValue={
                      existingSettings ? existingSettings[field] : ""
                    }
                    label={t(field.charAt(0).toUpperCase() + field.slice(1))}
                    name={field}
                    type="text"
                    placeholder={t(
                      field.charAt(0).toUpperCase() + field.slice(1)
                    )}
                  />
                  <Error errorName={errors[field]} />
                </div>
              </div>
            ))}

            <div className="flex flex-row-reverse pb-6">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="h-12 px-8"
              >
                {isSubmitting ? (
                  <>
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />
                    <span className="ml-2 font-serif font-light">
                      Processing
                    </span>
                  </>
                ) : isEditForm ? (
                  "Update"
                ) : (
                  "Save"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const PasswordChangeForm = () => {
  const { t } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const password = watch("password");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const response = await axios.post(
        `${import.meta.env.VITE_APP_API_BASE_URL}/admin/admin-change-password`,
        {
          password: data.password,
        }
      );

      notifySuccess("Password changed successfully!");
      reset();
    } catch (error) {
      notifyError(
        error?.response?.data?.message || "Failed to change password"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="grid grid-cols-12 font-sans">
        <div className="md:col-span-12 lg:col-span-12 col-span-12 mr-3">
          <div className="lg:px-6 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 scrollbar-hide flex-grow w-full max-h-full pt-4 pb-0">
            <div className="md:grid-cols-5 sm:grid-cols-10 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
              <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                {t("New Password")}
              </label>
              <div className="sm:col-span-3 relative">
                <InputAreaTwo
                  register={register}
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter new password"
                  className="pr-10" // Add padding to the right
                  validation={{
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                    pattern: {
                      value:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                      message:
                        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                    },
                  }}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="right-1 absolute inset-y-0 flex items-center text-gray-500"
                >
                  {showPassword ? (
                    <AiFillEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiFillEye className="w-5 h-5" />
                  )}
                </button>
                <Error errorName={errors.password} />
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="md:grid-cols-5 sm:grid-cols-10 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
              <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                {t("Confirm Password")}
              </label>
              <div className="sm:col-span-3 relative">
                <InputAreaTwo
                  register={register}
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm new password"
                  validation={{
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  }}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="right-1 absolute inset-y-0 flex items-center text-gray-500"
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible className="w-5 h-5" />
                  ) : (
                    <AiFillEye className="w-5 h-5" />
                  )}
                </button>
                <Error errorName={errors.confirmPassword} />
              </div>
            </div>

            <div className="flex flex-row-reverse pb-6">
              <Button
                disabled={isSubmitting}
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 h-12 px-8 text-white"
              >
                {isSubmitting ? (
                  <>
                    <img
                      src={spinnerLoadingImage}
                      alt="Loading"
                      width={20}
                      height={10}
                    />
                    <span className="ml-2 font-serif font-light">
                      Processing
                    </span>
                  </>
                ) : (
                  "Change Password"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

const Setting = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("Setting")}</PageTitle>
      <AnimatedContent>
        <div className="sm:container md:p-6 dark:bg-gray-800 dark:text-gray-200 w-full p-4 mx-auto bg-white rounded-lg">
          <h2 className="mb-4 text-2xl font-semibold">
            {t("Add New Settings")}
          </h2>
          <SettingForm isEditForm={false} />

          <h2 className="my-8 text-2xl font-semibold">
            {t("Edit Existing Settings")}
          </h2>
          <SettingForm isEditForm={true} />

          <h2 className="my-8 text-2xl font-semibold">
            {t("Change Password")}
          </h2>
          <PasswordChangeForm />
        </div>
      </AnimatedContent>
    </>
  );
};

export default Setting;
