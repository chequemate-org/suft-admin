import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Button } from "@windmill/react-ui";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError, notifySuccess } from "@/utils/toast";
import { useDispatch } from "react-redux";
import { removeSetting } from "@/reduxStore/slice/settingSlice";
import axios from "axios";

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
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false); // State for the delete modal
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
            "https://suft-90bec7a20f24.herokuapp.com/setting/admin/get-setting"
          );
          const fetchedSettings = response.data.data; // Access the data object directly
          setExistingSettings(fetchedSettings);

          // Populate form with existing settings
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
        ? "https://suft-90bec7a20f24.herokuapp.com/setting/admin/update-setting"
        : "https://suft-90bec7a20f24.herokuapp.com/setting/admin/add-setting";

      const method = isEditForm ? "put" : "post";

      const response = await axios[method](endpoint, settingData, {
        headers: {
          "Content-Type": "application/json",
          // Add any additional headers here, such as authentication tokens
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
        "https://suft-90bec7a20f24.herokuapp.com/setting/admin/delete-setting",
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
        <div className="col-span-12 md:col-span-12 lg:col-span-12 mr-3">
          <div className="lg:px-6 pt-4 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 flex-grow scrollbar-hide w-full max-h-full pb-0">
            {[
              "currency",
              "taxRate",
              "shippingRate",
              "banner",
              "email",
              "website",
            ].map((field) => (
              <div
                key={field}
                className="grid md:grid-cols-5 items-center sm:grid-cols-10 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6"
              >
                <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-1 sm:col-span-2">
                  {t(field.charAt(0).toUpperCase() + field.slice(1))}
                </label>
                <div className="sm:col-span-3">
                  <InputAreaTwo
                    register={register}
                    defaultValue={
                      existingSettings ? existingSettings[field] : ""
                    } // Default value from existing settings
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
                    <span className="font-serif ml-2 font-light">
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

const Setting = () => {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("Setting")}</PageTitle>
      <AnimatedContent>
        <div className="sm:container md:p-6 p-4 w-full mx-auto bg-white dark:bg-gray-800 dark:text-gray-200 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {t("Add New Settings")}
          </h2>
          <SettingForm isEditForm={false} />

          <h2 className="text-2xl font-semibold my-8">
            {t("Edit Existing Settings")}
          </h2>
          <SettingForm isEditForm={true} />
        </div>
      </AnimatedContent>
    </>
  );
};

export default Setting;
