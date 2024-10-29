// import React, { useContext, useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import { Button } from "@windmill/react-ui";
// import { SidebarContext } from "@/context/SidebarContext";
// import { notifyError, notifySuccess } from "@/utils/toast";
// import { useDispatch } from "react-redux";
// import { removeSetting } from "@/reduxStore/slice/settingSlice";
// import axios from "axios";
// import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

// import Error from "@/components/form/others/Error";
// import PageTitle from "@/components/Typography/PageTitle";
// import InputAreaTwo from "@/components/form/input/InputAreaTwo";
// import AnimatedContent from "@/components/common/AnimatedContent";
// import spinnerLoadingImage from "@/assets/img/spinner.gif";
// import DeleteModal from "@/components/modal/DeleteModal";

// const useSettingSubmit = (isEditForm = false) => {
//   const dispatch = useDispatch();
//   const { setIsUpdate } = useContext(SidebarContext);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [existingSettings, setExistingSettings] = useState(null);
//   const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [settingId, setSettingId] = useState(null);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//   } = useForm();

//   useEffect(() => {
//     if (isEditForm) {
//       const fetchExistingSettings = async () => {
//         try {
//           const response = await axios.get(
//             "https://suft-90bec7a20f24.herokuapp.com/setting/admin/get-setting"
//           );
//           const fetchedSettings = response.data.data;
//           setExistingSettings(fetchedSettings);

//           Object.entries(fetchedSettings).forEach(([key, value]) => {
//             setValue(key, value);
//           });
//         } catch (error) {
//           console.error("Error fetching existing settings:", error);
//           notifyError("Failed to fetch existing settings");
//         }
//       };

//       fetchExistingSettings();
//     }
//   }, [isEditForm, setValue]);

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);

//       const settingData = {
//         currency: data.currency,
//         taxRate: parseFloat(data.taxRate),
//         shippingRate: parseFloat(data.shippingRate),
//         banner: data.banner,
//         email: data.email,
//         website: data.website,
//       };

//       console.log("Prepared setting data:", settingData);

//       const endpoint = isEditForm
//         ? "https://suft-90bec7a20f24.herokuapp.com/setting/admin/update-setting"
//         : "https://suft-90bec7a20f24.herokuapp.com/setting/admin/add-setting";

//       const method = isEditForm ? "put" : "post";

//       const response = await axios[method](endpoint, settingData, {
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       console.log("Response from API:", response.data);

//       setIsSubmitting(false);
//       setIsUpdate(true);
//       dispatch(removeSetting());
//       notifySuccess(
//         response.data.message ||
//           `Settings ${isEditForm ? "updated" : "added"} successfully`
//       );
//     } catch (err) {
//       console.error("Error occurred:", err);
//       notifyError(err?.response?.data?.message || err.message);
//       setIsSubmitting(false);
//     }
//   };

//   const handleDeleteSetting = async () => {
//     try {
//       const response = await axios.delete(
//         "https://suft-90bec7a20f24.herokuapp.com/setting/admin/delete-setting",
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );
//       notifySuccess(response.data.message || "Settings deleted successfully");
//       setIsUpdate(true);
//       setDeleteModalOpen(false);
//     } catch (error) {
//       console.error("Error deleting settings:", error);
//       notifyError(
//         error?.response?.data?.message || "Failed to delete settings"
//       );
//       setDeleteModalOpen(false);
//     }
//   };

//   return {
//     errors,
//     register,
//     isSubmitting,
//     onSubmit,
//     handleSubmit,
//     existingSettings,
//   };
// };

// const SettingForm = ({ isEditForm }) => {
//   const {
//     errors,
//     register,
//     isSubmitting,
//     onSubmit,
//     handleSubmit,
//     existingSettings,
//   } = useSettingSubmit(isEditForm);
//   const { t } = useTranslation();

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <div className="grid grid-cols-12 font-sans">
//         <div className="md:col-span-12 lg:col-span-12 col-span-12 mr-3">
//           <div className="lg:px-6 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 scrollbar-hide flex-grow w-full max-h-full pt-4 pb-0">
//             {[
//               "currency",
//               "taxRate",
//               "shippingRate",
//               "banner",
//               "email",
//               "website",
//             ].map((field) => (
//               <div
//                 key={field}
//                 className="md:grid-cols-5 sm:grid-cols-10 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6"
//               >
//                 <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
//                   {t(field.charAt(0).toUpperCase() + field.slice(1))}
//                 </label>
//                 <div className="sm:col-span-3">
//                   <InputAreaTwo
//                     register={register}
//                     defaultValue={
//                       existingSettings ? existingSettings[field] : ""
//                     }
//                     label={t(field.charAt(0).toUpperCase() + field.slice(1))}
//                     name={field}
//                     type="text"
//                     placeholder={t(
//                       field.charAt(0).toUpperCase() + field.slice(1)
//                     )}
//                   />
//                   <Error errorName={errors[field]} />
//                 </div>
//               </div>
//             ))}

//             <div className="flex flex-row-reverse pb-6">
//               <Button
//                 disabled={isSubmitting}
//                 type="submit"
//                 className="h-12 px-8"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <img
//                       src={spinnerLoadingImage}
//                       alt="Loading"
//                       width={20}
//                       height={10}
//                     />
//                     <span className="ml-2 font-serif font-light">
//                       Processing
//                     </span>
//                   </>
//                 ) : isEditForm ? (
//                   "Update"
//                 ) : (
//                   "Save"
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// const PasswordChangeForm = () => {
//   const { t } = useTranslation();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//     watch,
//   } = useForm();

//   const password = watch("password");

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   const onSubmit = async (data) => {
//     try {
//       setIsSubmitting(true);
//       const response = await axios.post(
//         "https://suft-90bec7a20f24.herokuapp.com/admin/admin-change-password",
//         {
//           password: data.password,
//         }
//       );

//       notifySuccess("Password changed successfully!");
//       reset();
//     } catch (error) {
//       notifyError(
//         error?.response?.data?.message || "Failed to change password"
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
//       <div className="grid grid-cols-12 font-sans">
//         <div className="md:col-span-12 lg:col-span-12 col-span-12 mr-3">
//           <div className="lg:px-6 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 scrollbar-hide flex-grow w-full max-h-full pt-4 pb-0">
//             <div className="md:grid-cols-5 sm:grid-cols-10 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
//               <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
//                 {t("New Password")}
//               </label>
//               <div className="sm:col-span-3 relative">
//                 <InputAreaTwo
//                   register={register}
//                   label="Password"
//                   name="password"
//                   type={showPassword ? "text" : "password"}
//                   placeholder="Enter new password"
//                   className="pr-10" // Add padding to the right
//                   validation={{
//                     required: "Password is required",
//                     minLength: {
//                       value: 8,
//                       message: "Password must be at least 8 characters",
//                     },
//                     pattern: {
//                       value:
//                         /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                       message:
//                         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
//                     },
//                   }}
//                 />
//                 <button
//                   type="button"
//                   onClick={togglePasswordVisibility}
//                   className="right-1 absolute inset-y-0 flex items-center text-gray-500"
//                 >
//                   {showPassword ? (
//                     <AiFillEyeInvisible className="w-5 h-5" />
//                   ) : (
//                     <AiFillEye className="w-5 h-5" />
//                   )}
//                 </button>
//                 <Error errorName={errors.password} />
//               </div>
//             </div>

//             {/* Confirm Password Field */}
//             <div className="md:grid-cols-5 sm:grid-cols-10 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
//               <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
//                 {t("Confirm Password")}
//               </label>
//               <div className="sm:col-span-3 relative">
//                 <InputAreaTwo
//                   register={register}
//                   label="Confirm Password"
//                   name="confirmPassword"
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="Confirm new password"
//                   validation={{
//                     required: "Please confirm your password",
//                     validate: (value) =>
//                       value === password || "Passwords do not match",
//                   }}
//                 />
//                 <button
//                   type="button"
//                   onClick={toggleConfirmPasswordVisibility}
//                   className="right-1 absolute inset-y-0 flex items-center text-gray-500"
//                 >
//                   {showConfirmPassword ? (
//                     <AiFillEyeInvisible className="w-5 h-5" />
//                   ) : (
//                     <AiFillEye className="w-5 h-5" />
//                   )}
//                 </button>
//                 <Error errorName={errors.confirmPassword} />
//               </div>
//             </div>

//             <div className="flex flex-row-reverse pb-6">
//               <Button
//                 disabled={isSubmitting}
//                 type="submit"
//                 className="bg-emerald-500 hover:bg-emerald-600 h-12 px-8 text-white"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <img
//                       src={spinnerLoadingImage}
//                       alt="Loading"
//                       width={20}
//                       height={10}
//                     />
//                     <span className="ml-2 font-serif font-light">
//                       Processing
//                     </span>
//                   </>
//                 ) : (
//                   "Change Password"
//                 )}
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </form>
//   );
// };

// const Setting = () => {
//   const { t } = useTranslation();

//   return (
//     <>
//       <PageTitle>{t("Setting")}</PageTitle>
//       <AnimatedContent>
//         <div className="sm:container md:p-6 dark:bg-gray-800 dark:text-gray-200 w-full p-4 mx-auto bg-white rounded-lg">
//           <h2 className="mb-4 text-2xl font-semibold">
//             {t("Add New Settings")}
//           </h2>
//           <SettingForm isEditForm={false} />

//           <h2 className="my-8 text-2xl font-semibold">
//             {t("Edit Existing Settings")}
//           </h2>
//           <SettingForm isEditForm={true} />

//           <h2 className="my-8 text-2xl font-semibold">
//             {t("Change Password")}
//           </h2>
//           <PasswordChangeForm />
//         </div>
//       </AnimatedContent>
//     </>
//   );
// };

// export default Setting;
import { useTranslation } from "react-i18next";
import { Button, Select } from "@windmill/react-ui";

//internal import

import Error from "@/components/form/others/Error";
import PageTitle from "@/components/Typography/PageTitle";
import useSettingSubmit from "@/hooks/useSettingSubmit";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SelectTimeZone from "@/components/form/selectOption/SelectTimeZone";
import SelectCurrency from "@/components/form/selectOption/SelectCurrency";
import SelectReceiptSize from "@/components/form/selectOption/SelectPrintSize";
import AnimatedContent from "@/components/common/AnimatedContent";

const Setting = () => {
  const { errors, register, isSave, isSubmitting, onSubmit, handleSubmit } =
    useSettingSubmit();

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("Setting")}</PageTitle>
      <AnimatedContent>
        <div className="sm:container md:p-6 dark:bg-gray-800 dark:text-gray-200 w-full p-4 mx-auto bg-white rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 font-sans">
              <div className="md:col-span-12 lg:col-span-12 col-span-12 mr-3">
                <div className="lg:px-6 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 scrollbar-hide flex-grow w-full max-h-full pt-4 pb-0">
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("NumberOfImagesPerProduct")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("NumberOfImagesPerProduct")}
                        name="number_of_image_per_product"
                        type="number"
                        placeholder={t("NumberOfImagesPerProduct")}
                      />
                      <Error errorName={errors.number_of_image_per_product} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("DefaultCurrency")}
                    </label>

                    <div className="sm:col-span-3">
                      <div className="sm:col-span-4 col-span-8">
                        <SelectCurrency
                          register={register}
                          label="Currency"
                          name="default_currency"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("TimeZone")}
                    </label>

                    <div className="sm:col-span-3">
                      <SelectTimeZone
                        register={register}
                        name="default_time_zone"
                        label="Time Zone"
                      />
                      <Error errorName={errors.default_time_zone} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("DefaultDateFormat")}
                    </label>

                    <div className="sm:col-span-3">
                      <Select
                        {...register(`default_date_format`, {
                          required: "Default date formate is required",
                        })}
                      >
                        <option value="" defaultValue hidden>
                          {t("DefaultDateFormat")}
                        </option>
                        <option value="MMM D, YYYY">MM/DD/YYYY</option>
                        <option value="D MMM, YYYY">DD/MM/YYYY</option>
                        <option value="YYYY,MMM D">YYYY/MM/DD</option>
                      </Select>
                      <Error errorName={errors.default_date_format} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 relative grid gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("ReceiptSize")}
                    </label>
                    <div className="sm:col-span-3">
                      <SelectReceiptSize
                        label="Role"
                        register={register}
                        name="receipt_size"
                        required={true}
                      />
                      <Error errorName={errors.receipt_size} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("ShopName")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("ShopName")}
                        name="shop_name"
                        type="text"
                        placeholder={t("ShopName")}
                      />
                      <Error errorName={errors.shop_name} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("InvoiceCompanyName")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("InvoiceCompanyName")}
                        name="company_name"
                        type="text"
                        placeholder={t("InvoiceCompanyName")}
                      />
                      <Error errorName={errors.company_name} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {/* {t("FooterAddress")} */}
                      {t("VatNumber")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        register={register}
                        label="Address"
                        name="vat_number"
                        type="text"
                        placeholder="Vat Number"
                      />
                      <Error errorName={errors.vat_number} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("AddressLine")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Address"
                      />
                      <Error errorName={errors.address} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("PostCode")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        register={register}
                        label="Address"
                        name="post_code"
                        type="text"
                        placeholder="Post Code"
                      />
                      <Error errorName={errors.post_code} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("GlobalContactNumber")}
                    </label>
                    <div className=" sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label="Phone"
                        name="contact"
                        type="text"
                        placeholder="Contact Number"
                      />
                      <Error errorName={errors.contact} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("FooterEmail")}
                    </label>
                    <div className=" sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="Email"
                      />
                      <Error errorName={errors.email} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("WebSite")}
                    </label>
                    <div className=" sm:col-span-3">
                      <InputAreaTwo
                        register={register}
                        label="Email"
                        name="website"
                        type="text"
                        placeholder="Web Site"
                      />
                      <Error errorName={errors.website} />
                    </div>
                  </div>
                  <div className="flex flex-row-reverse pb-6">
                    {isSubmitting ? (
                      <Button disabled={true} type="button" className="h-12">
                        <img
                          src={spinnerLoadingImage}
                          alt="Loading"
                          width={20}
                          height={10}
                        />{" "}
                        <span className="ml-2 font-serif font-light">
                          Processing
                        </span>
                      </Button>
                    ) : (
                      <Button type="submit" className="h-12 px-8">
                        {" "}
                        {isSave ? "Save" : "Update"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </AnimatedContent>
    </>
  );
};
export default Setting;
