// import React, { useEffect, useState } from "react";
// import { Scrollbars } from "react-custom-scrollbars-2";
// import { Card, CardBody, Input } from "@windmill/react-ui";
// import { useTranslation } from "react-i18next";

// //internal import
// import Error from "@/components/form/others/Error";
// import Title from "@/components/form/others/Title";
// import InputArea from "@/components/form/input/InputArea";
// import useStaffSubmit from "@/hooks/useStaffSubmit";
// import SelectRole from "@/components/form/selectOption/SelectRole";
// import DrawerButton from "@/components/form/button/DrawerButton";
// import LabelArea from "@/components/form/selectOption/LabelArea";
// import Uploader from "@/components/image-uploader/Uploader";

// const StaffDrawer = ({ id, staff, fetchStaffs }) => {
//   const {
//     register,
//     onSubmit,
//     errors,
//     imageUrl,
//     setImageUrl,
//     isSubmitting,
//     selectedDate,
//     setSelectedDate,
//     handleSelectLanguage,
//   } = useStaffSubmit(id);

//   const { t } = useTranslation();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [joiningDate, setJoiningDate] = useState("");
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     if (id && staff) {
//       setName(staff.data.name);
//       setEmail(staff.data.email);
//       setPhoneNumber(staff.data.phoneNumber);
//       setJoiningDate(staff.data.joiningDate);
//       setIsPublished(coupon.data.isPublished);
//     } else {
//       resetForm();
//     }
//   }, [id, coupon]);

//   const validateForm = () => {
//     const newErrors = {};
//     if (!name) newErrors.name = "Coupon name is required.";
//     if (!code) newErrors.code = "Coupon code is required.";

//     if (!discount || isNaN(discount) || discount > 100)
//       newErrors.discount = "Discount must be between 1 and 100.";
//     if (!expiryDate) newErrors.expiryDate = "Expiry date is required.";
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const couponData = {
//         name,
//         code,
//         discount,
//         expiryDate,
//         isPublished,
//       };

//       try {
//         setLoading(true);
//         let response;

//         if (id) {
//           // PUT request to update the coupon by ID
//           response = await fetch(
//             `https://suft-90bec7a20f24.herokuapp.com/coupon/admin-update/coupon/${id}`,
//             {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(couponData),
//             }
//           );
//         } else {
//           // POST request to create a new coupon
//           response = await fetch(
//             "https://suft-90bec7a20f24.herokuapp.com/coupon/admin-create",
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(couponData),
//             }
//           );
//         }

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(
//             `Failed to submit coupon. Server responded with: ${errorText}`
//           );
//         }

//         resetForm();
//         toast.success(
//           id ? "Coupon updated successfully!" : "Coupon created successfully!"
//         );
//         fetchCoupons(); // Refetch coupons after submission
//       } catch (error) {
//         console.error("Error submitting coupon:", error.message);
//         setErrors({ api: error.message });
//         toast.error("Failed to submit the coupon. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const resetForm = () => {
//     setName("");
//     setCode("");
//     setDiscount("");
//     setExpiryDate("");
//     setIsPublished(true);
//     setErrors({});
//   };

//   return (
//     <>
//       <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
//         {id ? (
//           <Title
//             register={register}
//             handleSelectLanguage={handleSelectLanguage}
//             title={t("UpdateStaff")}
//             description={t("UpdateStaffdescription")}
//           />
//         ) : (
//           <Title
//             register={register}
//             handleSelectLanguage={handleSelectLanguage}
//             title={t("AddStaffTitle")}
//             description={t("AddStaffdescription")}
//           />
//         )}
//       </div>

//       <Scrollbars className="md:w-7/12 lg:w-8/12 xl:w-8/12 dark:bg-gray-700 dark:text-gray-200 relative w-full">
//         <Card className="scrollbar-hide flex-grow w-full max-h-full overflow-y-scroll">
//           <CardBody>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="scrollbar-hide flex-grow w-full max-h-full px-6 pt-8 pb-40">
//                 {/* Staff Image */}
//                 {/* <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//                   <LabelArea label="Staff Image" />
//                   <div className="sm:col-span-4 col-span-8">
//                     <Uploader
//                       imageUrl={imageUrl}
//                       setImageUrl={setImageUrl}
//                       folder="admin"
//                     />
//                   </div>
//                 </div> */}

//                 {/* Name */}
//                 <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//                   <LabelArea label="Name" />
//                   <div className="sm:col-span-4 col-span-8">
//                     <InputArea
//                       required={true}
//                       register={register}
//                       label="Name"
//                       name="name"
//                       type="text"
//                       autoComplete="username"
//                       placeholder="Staff name"
//                       value={name} // Bind the state value
//                       onChange={(e) => setName(e.target.value)} // Update state on input change
//                     />
//                     <Error errorName={errors.name} />
//                   </div>
//                 </div>

//                 {/* Email */}
//                 <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//                   <LabelArea label="Email" />
//                   <div className="sm:col-span-4 col-span-8">
//                     <InputArea
//                       required={true}
//                       register={register}
//                       label="Email"
//                       name="email"
//                       type="text"
//                       autoComplete="username"
//                       placeholder="Email"
//                       value={email} // Bind the state value
//                       onChange={(e) => setEmail(e.target.value)} // Update state on input change
//                     />
//                     <Error errorName={errors.email} />
//                   </div>
//                 </div>

//                 {/* Password */}
//                 <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//                   <LabelArea label="Password" />
//                   <div className="sm:col-span-4 col-span-8">
//                     {id ? (
//                       <InputArea
//                         register={register}
//                         label="Password"
//                         name="password"
//                         type="password"
//                         autoComplete="current-password"
//                         placeholder="Password"
//                       />
//                     ) : (
//                       <InputArea
//                         required={true}
//                         register={register}
//                         label="Password"
//                         name="password"
//                         type="password"
//                         autoComplete="current-password"
//                         placeholder="Password"
//                       />
//                     )}

//                     <Error errorName={errors.password} />
//                   </div>
//                 </div>

//                 {/* Phone Number */}
//                 <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//                   <LabelArea label="Contact Number" />
//                   <div className="sm:col-span-4 col-span-8">
//                     <InputArea
//                       required={true}
//                       register={register}
//                       label="Contact Number"
//                       name="phone"
//                       type="text"
//                       placeholder="Phone number"
//                       value={phoneNumber} // Bind the state value
//                       onChange={(e) => setPhoneNumber(e.target.value)} // Update state on input change
//                     />
//                     <Error errorName={errors.phone} />
//                   </div>
//                 </div>
//                 <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//                   <LabelArea label="Joining Date" />
//                   <div className="sm:col-span-4 col-span-8">
//                     <Input
//                       onChange={(e) => setSelectedDate(e.target.value)}
//                       label="Joining Date"
//                       name="joiningDate"
//                       value={selectedDate}
//                       type="date"
//                       placeholder={t("StaffJoiningDate")}
//                     />
//                     <Error errorName={errors.joiningDate} />
//                   </div>
//                 </div>

//                 <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//                   <LabelArea label="Staff Role" />
//                   <div className="sm:col-span-4 col-span-8">
//                     <SelectRole register={register} name="role" />
//                     <Error errorName={errors.role} />
//                   </div>
//                 </div>

//                 <DrawerButton
//                   id={id}
//                   title="Staff"
//                   isSubmitting={isSubmitting}
//                 />
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </Scrollbars>
//     </>
//   );
// };

// export default StaffDrawer;

import React, { useState, useEffect } from "react";
import { Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

// Internal imports
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import SelectRole from "@/components/form/selectOption/SelectRole";
import DrawerButton from "@/components/form/button/DrawerButton";
import LabelArea from "@/components/form/selectOption/LabelArea";
import axios from "axios";

const StaffDrawer = ({ id, staff, fetchStaffs }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [file, setFile] = useState([]);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && staff) {
      setFile(staff.data.file || []);
      setName(staff.data.name);
      setEmail(staff.data.email);
      setPhoneNumber(staff.data.phoneNumber);
      setJoiningDate(staff.data.joiningDate);
      setRole(staff.data.role);
    } else {
      resetForm();
    }
  }, [id, staff]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!name) newErrors.name = "Name is required.";
    if (!file) newErrors.file = "image is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!joiningDate) newErrors.joiningDate = "Date is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!validateForm()) return;

  //   const formData = new FormData();
  //   formData.append("name", name);
  //   formData.append("email", email);
  //   formData.append("joiningDate", joiningDate);
  //   formData.append("phoneNumber", phoneNumber);
  //   formData.append("role", role);

  //   file.forEach((file) => {
  //     if (file instanceof File) formData.append("file", file);
  //   });

  //   try {
  //     setLoading(true);
  //     let response;
  //     if (id) {
  //       response = await axios.put(
  //         `https://suft-90bec7a20f24.herokuapp.com/admin/staff-update/${id}`,
  //         formData
  //       );
  //     } else {
  //       response = await axios.post(
  //         "https://suft-90bec7a20f24.herokuapp.com/admin/create-user",
  //         formData
  //       );
  //     }

  //     if (response.status === 200 || response.status === 201) {
  //       toast.success(id ? "Staff updated successfully!" : "Staff added successfully!");
  //       resetForm();
  //       fetchStaffs();
  //     } else {
  //       toast.error("Server error: " + response.data.message);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting the form:", error.response ? error.response.data : error.message);
  //     toast.error("Failed to submit the form!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const staffData = {
        name,
        file,
        email,
        joiningDate,
        phoneNumber,
        role,
      };

      try {
        setLoading(true);
        let response;

        if (id) {
          // PUT request to update the coupon by ID
          response = await fetch(
            `https://suft-90bec7a20f24.herokuapp.com/admin/staff-update/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(staffData),
            }
          );
        } else {
          // POST request to create a new coupon
          response = await fetch(
            "https://suft-90bec7a20f24.herokuapp.com/admin/create-user",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(staffData),
            }
          );
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to submit coupon. Server responded with: ${errorText}`
          );
        }

        resetForm();
        toast.success(
          id ? "Staff updated successfully!" : "Staff created successfully!"
        );
        fetchStaffs(); // Refetch coupons after submission
      } catch (error) {
        console.error("Error submitting staff:", error.message);
        setErrors({ api: error.message });
        toast.error("Failed to submit the staff. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };


  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setJoiningDate("");
    setRole("");
    setFile([]);
    setErrors({});
  };

  const handleImageUpload = (acceptedFiles) => {
    const oversizedFiles = acceptedFiles.filter((file) => file.size > 5000000);
    if (oversizedFiles.length > 0) {
      toast.error("Some files are larger than 5MB and cannot be uploaded.");
      return;
    }

    setFile((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })),
    ]);
    toast.success("Images uploaded successfully!");
  };

  const handleRemoveImage = (file) => {
    setFile((prevFiles) => prevFiles.filter((img) => img !== file));
    toast.success("Image removed successfully!");
  };

  const mainImageThumbs = file.map((file, index) => (
    <div key={index} className="relative">
      <img className="w-24 h-24" src={file.preview || URL.createObjectURL(file)} alt={file.name} />
      <button
        type="button"
        className="absolute top-0 right-0 text-red-500"
        onClick={() => handleRemoveImage(file)}
      >
        <FiXCircle />
      </button>
    </div>
  ));

  const { getRootProps: getRootPropsMain, getInputProps: getInputPropsMain } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: true,
    maxSize: 5000000,
    onDrop: handleImageUpload,
  });

  return (
    <div>
      <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
        <Title
          title={id ? t("Update Staff") : t("Add Staff")}
          description={id ? t("Update Staff Details") : t("Add New Staff")}
        />
      </div>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg">
        {/* Image Upload */}
        <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
          <LabelArea label="Staff Image" />
          <div className="sm:col-span-4 col-span-8">
            <div {...getRootPropsMain()} className="p-6 text-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer">
              <input {...getInputPropsMain()} />
              <span className="flex justify-center mx-auto">
                <FiUploadCloud className="text-emerald-500 text-3xl" />
              </span>
              <p className="mt-2 text-sm">Drag your image here</p>
              <em className="text-xs text-gray-400">(Only *.jpeg, *.png, and *.webp images accepted, Max: 5MB)</em>
            </div>
            <div className="flex flex-wrap mt-4">{mainImageThumbs}</div>
            {errors.file && <span className="mt-2 text-sm text-red-400">{errors.file}</span>}
          </div>
        </div>

        {/* Other Fields */}
        {[ 
          // { label: "file", value: file, onChange: setFile, error: errors.file },
          { label: "Name", value: name, onChange: setName, error: errors.name },
          { label: "Email", value: email, onChange: setEmail, error: errors.email },
          { label: "Phone Number", value: phoneNumber, onChange: setPhoneNumber, error: errors.phoneNumber },
          { label: "Joining Date", type: "date", value: joiningDate, onChange: setJoiningDate, error: errors.joiningDate },
        ].map(({ label, value, onChange, error, type = "text" }) => (
          <div key={label} className="grid grid-cols-6 gap-3 mb-6">
            <LabelArea label={label} />
            <div className="sm:col-span-4 col-span-8">
              <Input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
              />
              {error && <span className="mt-2 text-sm text-red-400">{error}</span>}
            </div>
          </div>
        ))}

        {/* Role Selection */}
        <div className="grid grid-cols-6 gap-3 mb-[10rem]">
          <LabelArea label="Role" />
          <div className="sm:col-span-4 col-span-8">
            <SelectRole value={role} onChange={(e) => setRole(e.target.value)} />
            {errors.role && <span className="mt-2 text-sm text-red-400">{errors.role}</span>}
          </div>
        </div>

        <DrawerButton id={id} title="Staff" loading={loading} isSubmitting={loading} />
      </form>
    </div>
  );
};

export default StaffDrawer;
