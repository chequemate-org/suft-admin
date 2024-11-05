// import React, { useState, useEffect } from "react";
// import { Input } from "@windmill/react-ui";
// import { useTranslation } from "react-i18next";
// import { toast } from "react-toastify";
// import dayjs from "dayjs";
// import { useDropzone } from "react-dropzone";
// import { FiUploadCloud, FiXCircle } from "react-icons/fi";

// // Internal imports
// import Error from "@/components/form/others/Error";
// import Title from "@/components/form/others/Title";
// import SelectRole from "@/components/form/selectOption/SelectRole";
// import DrawerButton from "@/components/form/button/DrawerButton";
// import LabelArea from "@/components/form/selectOption/LabelArea";

// const StaffDrawer = ({ id, staff, fetchStaffs }) => {
//   const { t } = useTranslation();
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [staffImage, setStaffImage] = useState([]);
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [joiningDate, setJoiningDate] = useState(dayjs().format("YYYY-MM-DD"));
//   const [role, setRole] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [isUploadingMainImage, setUploadingMainImage] = useState(false);

//   const handleImageUpload = (acceptedFiles, setImages, setUploadingStatus) => {
//     const oversizedFiles = acceptedFiles.filter((file) => file.size > 5000000);
//     if (oversizedFiles.length > 0) {
//       toast.error("Some files are larger than 5MB and cannot be uploaded.");
//       return;
//     }

//     setUploadingStatus(true);

//     setImages((prevImages) => {
//       // Ensure prevImages is an array
//       const validPrevImages = Array.isArray(prevImages) ? prevImages : [];

//       return [
//         ...validPrevImages,
//         ...acceptedFiles.map((file) =>
//           Object.assign(file, { preview: URL.createObjectURL(file) })
//         ),
//       ];
//     });
//     setTimeout(() => {
//       setUploadingStatus(false);
//       toast.success("Image uploaded successfully!");
//     }, 5000); // Simulate upload time or replace with actual API call duration

//     // setUploadingImages(false);
//     // toast.success("Image uploaded successfully!");
//   };

//   const { getRootProps: getRootPropsMain, getInputProps: getInputPropsMain } =
//     useDropzone({
//       accept: {
//         "image/*": [".jpeg", ".jpg", ".png", ".webp"],
//       },
//       multiple: true,
//       maxSize: 5000000,
//       onDrop: (files) =>
//         handleImageUpload(files, setStaffImage, setUploadingMainImage),
//     });

//   const handleRemoveImage = (file, setImages) => {
//     setImages((prevImages) => prevImages.filter((image) => image !== file));
//     toast.success("Image removed successfully!");
//   };

//   const mainImageThumbs = staffImage.map((file, index) => (
//     <div key={index} className="relative">
//       <img className="w-24 h-24" src={file.preview} alt={file.name} />
//       <button
//         type="button"
//         className="absolute top-0 right-0 text-red-500"
//         onClick={() => handleRemoveImage(file, setStaffImage)}
//       >
//         <FiXCircle />
//       </button>
//     </div>
//   ));

//   useEffect(() => {
//     if (id && staff) {
//       setStaffImage(staff.data.staffImage || []);
//       setName(staff.data.name || "");
//       setEmail(staff.data.email || "");
//       setPhoneNumber(staff.data.phoneNumber || "");
//       setJoiningDate(staff.data.joiningDate || "");
//       setRole(staff.data.role || "");
//     } else {
//       resetForm();
//     }
//   }, [id, staff]);

//   const validateForm = () => {
//     const newErrors = {};

//     if (!name) newErrors.name = "Name is required.";
//     if (!staffImage || staffImage.length === 0)
//       newErrors.staffImage = "Image is required.";
//     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
//     if (!email) {
//       newErrors.email = "Email is required.";
//     } else if (!emailRegex.test(email)) {
//       newErrors.email = "Invalid email format.";
//     }
//     if (!joiningDate) newErrors.joiningDate = "Date is required.";
//     const existingPhoneNumbers = ["1234567890", "0987654321"];
//     if (!phoneNumber) {
//       newErrors.phoneNumber = "Phone Number is required.";
//     } else if (existingPhoneNumbers.includes(phoneNumber)) {
//       newErrors.phoneNumber = "This phone number already exists.";
//     }
//     if (!role) newErrors.role = "Role is required.";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("email", email);
//       formData.append("joiningDate", joiningDate);
//       formData.append("phoneNumber", phoneNumber);
//       formData.append("role", role);
//       staffImage.forEach((fileItem) => {
//         if (fileItem instanceof File) formData.append("staffImage", fileItem);
//       });

//     }
//   }
      

//       try {
//         setLoading(true);
//         let response;

//         if (id) {
//           response = await fetch(
//             `${import.meta.env.VITE_APP_API_BASE_URL}/admin/staff-update/${id}`,
//             formData,
//             {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//             }
//           );
//         } else {
//           response = await fetch(
//             `${import.meta.env.VITE_APP_API_BASE_URL}/admin/create-user"`,
//             formData,
//             {
//               method: "POST",
//               headers: { "Content-Type": "application/json" },
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
//           id ? "Staff updated successfully!" : "Staff created successfully!"
//         );
//         fetchStaffs(); // Refetch coupons after submission
//       } catch (error) {
//         console.error("Error submitting staff:", error.message);
//         setErrors({ api: error.message });
//         toast.error("Failed to submit the staff. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const resetForm = () => {
//     setName("");
//     setEmail("");
//     setStaffImage([]);
//     setPhoneNumber("");
//     setJoiningDate("");
//     setRole("");
//     setErrors({});
//   };

//   return (
//     <div>
//       <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
//         <Title
//           title={id ? t("Update Staff") : t("Add Staff")}
//           description={id ? t("Update Staff Details") : t("Add New Staff")}
//         />
//       </div>
//       <form onSubmit={handleSubmit} className="p-6 rounded-lg">
//         <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//           <LabelArea label={"Product Image"} />
//           <div className="sm:col-span-4 col-span-8">
//             <div
//               {...getRootPropsMain()}
//               className="p-6 text-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
//             >
//               <input {...getInputPropsMain()} />
//               <span className="flex justify-center mx-auto">
//                 <FiUploadCloud className="text-emerald-500 text-3xl" />
//               </span>
//               <p className="mt-2 text-sm">Drag your image here</p>
//               <em className="text-xs text-gray-400">
//                 (Only *.jpeg,*.png, and *.webp images will be accepted (Max:
//                 5MB))
//               </em>
//             </div>
//             {isUploadingMainImage ? (
//               <div className=" text-center text-[#10B981] text-[15px]">
//                 Uploading....
//               </div>
//             ) : (
//               <div className="flex flex-wrap mt-4">{mainImageThumbs}</div>
//             )}
//             {errors.staffImage && (
//               <span className="mt-2 text-sm text-red-400">
//                 image is required.
//               </span>
//             )}
//           </div>
//         </div>
//         <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//           <LabelArea label="Name" />
//           <div className="sm:col-span-4 col-span-8">
//             <Input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               placeholder="Admin"
//               className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
//             />
//             {errors.name && (
//               <span className="mt-2 text-sm text-red-400">{errors.name}</span>
//             )}
//           </div>
//         </div>
//         <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//           <LabelArea label="Email" />
//           <div className="sm:col-span-4 col-span-8">
//             <Input
//               type="text"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="john@doe.com"
//               className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
//             />
//             {errors.email && (
//               <span className="mt-2 text-sm text-red-400">{errors.email}</span>
//             )}
//           </div>
//         </div>
//         <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//           <LabelArea label="Phone Number" />
//           <div className="sm:col-span-4 col-span-8">
//             <Input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               placeholder="080*****"
//               className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
//             />
//             {errors.phoneNumber && (
//               <span className="mt-2 text-sm text-red-400">
//                 {errors.phoneNumber}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
//           <LabelArea label="Joining Date" />
//           <div className="sm:col-span-4 col-span-8">
//             <Input
//               type="date"
//               value={joiningDate}
//               onChange={(e) => setJoiningDate(e.target.value)}
//               className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
//             />
//             {errors.joiningDate && (
//               <span className="mt-2 text-sm text-red-400">
//                 {errors.joiningDate}
//               </span>
//             )}
//           </div>
//         </div>

//         <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-[10rem]">
//           <LabelArea label="Staff Role" />
//           <div className="sm:col-span-4 col-span-8">
//             <SelectRole
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//             />
//             {errors.role && (
//               <span className="mt-2 text-sm text-red-400">{errors.role}</span>
//             )}
//           </div>
//         </div>

//         <DrawerButton
//           id={id}
//           title="Staff"
//           loading={loading}
//           isSubmitting={loading}
//         />
//       </form>
//     </div>
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
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && staff) {
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
    if (!email) newErrors.email = "Email is required.";
    if (!joiningDate) newErrors.joiningDate = "Date is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const staffData = {
        name,
        email,
        joiningDate,
        phoneNumber,
        role,
      };

      try {
        setLoading(true);
        let response;

        if (id) {
          response = await fetch(
            `${import.meta.env.VITE_APP_API_BASE_URL}/admin/staff-update/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(staffData),
            }
          );
        } else {
          response = await fetch(
            `${import.meta.env.VITE_APP_API_BASE_URL}/admin/create-user`,
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
    setErrors({});
  };

  return (
    <div>
      <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
        <Title
          title={id ? t("Update Staff") : t("Add Staff")}
          description={id ? t("Update Staff Details") : t("Add New Staff")}
        />
      </div>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg">
        {[
          // { label: "file", value: file, onChange: setFile, error: errors.file },
          { label: "Name", value: name, onChange: setName, error: errors.name },
          {
            label: "Email",
            value: email,
            onChange: setEmail,
            error: errors.email,
          },
          {
            label: "Phone Number",
            value: phoneNumber,
            onChange: setPhoneNumber,
            error: errors.phoneNumber,
          },
          {
            label: "Joining Date",
            type: "date",
            value: joiningDate,
            onChange: setJoiningDate,
            error: errors.joiningDate,
          },
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
              {error && (
                <span className="mt-2 text-sm text-red-400">{error}</span>
              )}
            </div>
          </div>
        ))}

        {/* Role Selection */}
        <div className="grid grid-cols-6 gap-3 mb-[10rem]">
          <LabelArea label="Role" />
          <div className="sm:col-span-4 col-span-8">
            <SelectRole
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            {errors.role && (
              <span className="mt-2 text-sm text-red-400">{errors.role}</span>
            )}
          </div>
        </div>

        <DrawerButton
          id={id}
          title="Staff"
          loading={loading}
          isSubmitting={loading}
        />
      </form>
    </div>
  );
};

export default StaffDrawer;