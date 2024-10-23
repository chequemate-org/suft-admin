// // import React, { useState } from "react";
// // import {
// //   Button,
// //   Input,
// //   product,
// //   TableCell,
// //   TableContainer,
// //   TableHeader,
// //   Textarea,
// //   Table,
// // } from "@windmill/react-ui";
// // import { Scrollbars } from "react-custom-scrollbars-2";
// // import useAsync from "@/hooks/useAsync";
// // import SettingServices from "@/services/SettingServices";
// // import { notifyError, notifySuccess } from "@/utils/toast";
// // import Container from "@/components/image-uploader/Container";
// // import { useDropzone } from "react-dropzone";
// // import { FiUploadCloud, FiXCircle } from "react-icons/fi";
// // import { DndProvider } from "react-dnd";
// // import { HTML5Backend } from "react-dnd-html5-backend";
// // import { MultiSelect } from "react-multi-select-component";
// // import { Modal } from "react-responsive-modal";
// // import "react-responsive-modal/styles.css";
// // import { Link } from "react-router-dom";
// // import { useTranslation } from "react-i18next";
// // import { FiX } from "react-icons/fi";
// // import ReactTagInput from "@pathofdev/react-tag-input";
// // import { useForm } from "react-hook-form";
// // import { toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // // internal imports
// // import Title from "@/components/form/others/Title";
// // import Error from "@/components/form/others/Error";
// // import InputArea from "@/components/form/input/InputArea";
// // import useUtilsFunction from "@/hooks/useUtilsFunction";
// // import LabelArea from "@/components/form/selectOption/LabelArea";
// // import DrawerButton from "@/components/form/button/DrawerButton";
// // import InputValue from "@/components/form/input/InputValue";
// // import useProductSubmit from "@/hooks/useProductSubmit";
// // import ActiveButton from "@/components/form/button/ActiveButton";
// // import InputValueFive from "@/components/form/input/InputValueFive";
// // import Uploader from "@/components/image-uploader/Uploader";
// // import UploaderThree from "../image-uploader/UploaderThree";
// // import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";

// // const ProductDrawer = ({ id }) => {
// //   const { t } = useTranslation();
// //   const { tapValue, isCombination } = useProductSubmit(id);
// //   const {
// //     openModal,
// //     handleIsCombination,
// //     handleProductTap,
// //     onCloseModal,
// //     handleGenerateCombination,
// //     handleSelectImage,
// //     handleSelectLanguage,
// //     register,
// //     handleSubmit,
// //     formState: { errors }
// //   } = useForm(); // react-hook-form

// //   // State for main images and extra images
// //   const [imageUrl, setImageUrl] = useState([]);
// //   const [extraImages, setExtraImages] = useState([]);
// //   const [loading, setLoading] = useState(false);

// //   // Form input states
// //   const [name, setName] = useState("");
// //   const [description, setDescription] = useState("");
// //   const [price, setPrice] = useState("");
// //   const [sku, setSku] = useState("");
// //   const [stockLevel, setStockLevel] = useState("");
// //   const [slug, setSlug] = useState("");
// //   const [details, setDetails] = useState("");
// //   // const [color, setColors] = useState([]);
// //   const [size, setSize] = useState([]);
// //   const [tags, setTags] = useState([]);
// //   const [color, setColor] = useState([]);
// //   const [processOption, setProcessOption] = useState(false);
// //   const [isSubmitting, setIsSubmitting] = useState(false);

// // const handleButton = () => {
// //   setIsSubmitting(true);
// // };

// //   const handleProcess = (checked) => {
// //     setProcessOption(checked);
// //   };

// //   const colorHexMapping = {
// //     red: "#FF0000",
// //     black: "#000000",
// //     yellow: "#FFFF00",
// //     blue: "#0000FF",
// //   };

// //   const handleImageUpload = (acceptedFiles) => {
// //     setImageUrl((prevImages) => [
// //       ...prevImages,
// //       ...acceptedFiles.map((file) =>
// //         Object.assign(file, { preview: URL.createObjectURL(file) })
// //       ),
// //     ]);
// //   };

// //   const handleExtraImageUpload = (acceptedFiles) => {
// //     setExtraImages((prevImages) => [
// //       ...prevImages,
// //       ...acceptedFiles.map((file) =>
// //         Object.assign(file, { preview: URL.createObjectURL(file) })
// //       ),
// //     ]);
// //   };
// //   // console.log("result");

// //   const handleProductSubmit = async (data) => {
// //     const formData = new FormData();
// //     formData.append("name", data.name);
// //     formData.append("description", data.description);
// //     formData.append("sku", data.sku);
// //     formData.append("slug", data.slug);
// //     formData.append("price", data.price);
// //     formData.append("stockLevel", data.stockLevel);
// //     formData.append("details", data.details);

// //     // Append selected sizes and colors (arrays) to FormData
// //     formData.append("size", JSON.stringify(size));
// //     formData.append("color", JSON.stringify(color));

// //     // Append tags
// //     formData.append("tags", JSON.stringify(tags));

// //     // Append images
// //     imageUrl.forEach((file, idx) => {
// //       formData.append(`images[${idx}]`, file);
// //     });

// //     extraImages.forEach((file, idx) => {
// //       formData.append(`extraImages[${idx}]`, file);
// //     });

// //     // Handle image validations
// //     if (imageUrl.length === 0) {
// //       toast.warn("Please upload at least one main image.");
// //       return;
// //     }

// //     try {
// //       setLoading(true);
// //       const response = await fetch("https://suft-90bec7a20f24.herokuapp.com/product/admin/create", {
// //         method: "POST",
// //         body: formData,
// //       });

// //       const responseData = await response.json();
// //       setLoading(false);

// //       if (response.ok) {
// //         toast.success("Product and images uploaded successfully!");
// //       } else {
// //         toast.error("Error uploading product: " + responseData.message);
// //       }
// //     } catch (error) {
// //       setLoading(false);
// //       toast.error("Error uploading product: " + error.message);
// //     }
// //   };

// //   const { getRootProps: getRootPropsMain, getInputProps: getInputPropsMain } =
// //     useDropzone({
// //       accept: {
// //         "image/*": [".jpeg", ".jpg", ".png", ".webp"],
// //       },
// //       multiple: true,
// //       maxSize: 5000000,
// //       onDrop: handleImageUpload,
// //     });

// //   const { getRootProps: getRootPropsExtra, getInputProps: getInputPropsExtra } =
// //     useDropzone({
// //       accept: {
// //         "image/*": [".jpeg", ".jpg", ".png", ".webp"],
// //       },
// //       multiple: true,
// //       maxSize: 5000000,
// //       onDrop: handleExtraImageUpload,
// //     });

// //   const mainImageThumbs = imageUrl.map((file) => (
// //     <div key={file.name} className="relative">
// //       <img
// //         className="max-h-24 inline-flex w-24 border-2 border-gray-100"
// //         src={file.preview}
// //         alt={file.name}
// //       />
// //       <button
// //         type="button"
// //         className="absolute top-0 right-0 text-red-500"
// //         onClick={() => handleRemoveImage(file, setImageUrl)}
// //       >
// //         <FiXCircle />
// //       </button>
// //     </div>
// //   ));

// //   const extraImageThumbs = extraImages.map((file) => (
// //     <div key={file.name} className="relative">
// //       <img
// //         className="max-h-24 inline-flex w-24 border-2 border-gray-100"
// //         src={file.preview}
// //         alt={file.name}
// //       />
// //       <button
// //         type="button"
// //         className="absolute top-0 right-0 text-red-500"
// //         onClick={() => handleRemoveImage(file, setExtraImages)}
// //       >
// //         <FiXCircle />
// //       </button>
// //     </div>
// //   ));
// //   const handleRemoveImage = (file, setImages) => {
// //     setImages((prevImages) => prevImages.filter((image) => image !== file));
// //   };

// //   const handleSizeSelection = (e) => {
// //     const selectedSize = e.target.value;
// //     if (selectedSize && !size.includes(selectedSize)) {
// //       setSize([...size, selectedSize]);
// //     }
// //   };

// //   const handleColorSelection = (e) => {
// //     const colorName = e.target.value;
// //     const hexCode = colorHexMapping[colorName];

// //     if (!color.find((color) => color.name === colorName)) {
// //       setColor([...color, { name: colorName, hex: hexCode }]);
// //     }
// //   };
// //   const removeColor = (colorToRemove) => {
// //     setColor(
// //       color.filter((color) => color.name !== colorToRemove)
// //     );
// //   };

// //   // const removeSize = (size) => {
// //   //   setSize(size.filter((s) => s !== size));
// //   // };

// // const removeSize = (sizeToRemove) => {
// //   setSize((prevSizes) => prevSizes.filter((size) => size !== sizeToRemove));
// // };
// //   return (
// //     <>
// //       <Modal
// //         open={openModal}
// //         onClose={onCloseModal}
// //         center
// //         closeIcon={
// //           <div className="active:outline-none absolute top-0 right-0 text-xl text-red-500 border-0">
// //             <FiX className="text-3xl" />
// //           </div>
// //         }
// //       >
// //         <div className="cursor-pointer">
// //           <UploaderThree
// //             imageUrl={imageUrl}
// //             setImageUrl={setImageUrl}
// //             handleSelectImage={handleSelectImage}
// //           />
// //         </div>
// //       </Modal>

// //       <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
// //         {id ? (
// //           <Title
// //             register={register}
// //             handleSelectLanguage={handleSelectLanguage}
// //             title={t("UpdateProduct")}
// //             description={t("UpdateProductDescription")}
// //           />
// //         ) : (
// //           <Title
// //             register={register}
// //             handleSelectLanguage={handleSelectLanguage}
// //             title={t("DrawerAddProduct")}
// //             description={t("AddProductDescription")}
// //           />
// //         )}
// //       </div>

// //       <div className="dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
// //         <SwitchToggleForCombination
// //          title="Product Variants"
// //          product={true}
// //          handleProcess={handleProcess}
// //          processOption={processOption}

// //         />

// //         <ul className="flex flex-wrap -mb-px">
// //           <li className="mr-2">
// //             <ActiveButton
// //               tapValue={tapValue}
// //               activeValue="Basic Info"
// //               handleProductTap={handleProductTap}
// //             />
// //           </li>

// //           {isCombination && (
// //             <li className="mr-2">
// //               <ActiveButton
// //                 tapValue={tapValue}
// //                 activeValue="Combination"
// //                 handleProductTap={handleProductTap}
// //               />
// //             </li>
// //           )}
// //         </ul>
// //       </div>
// //       <Scrollbars className="w-full">
// //         <form onSubmit={handleSubmit(handleProductSubmit)} className="block">
// //           {tapValue === "Basic Info" && (
// //             <div className="w-full px-6 pt-8 pb-40">
// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label={t("ProductTitleName")} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <Input
// //                     {...register("name", { required: true })}
// //                     type="text"
// //                     value={name}
// //                     onChange={(e) => setName(e.target.value)}
// //                     placeholder={t("ProductTitleName")}
// //                   />
// //                   {errors.name && (
// //                     <Error errorName="Product title is required." />
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label={t("ProductDescription")} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <Textarea
// //                     {...register("description", { required: true })}
// //                     value={description}
// //                     onChange={(e) => setDescription(e.target.value)}
// //                     placeholder={t("ProductDescription")}
// //                     rows="4"
// //                   />
// //                   {errors.description && (
// //                     <Error errorName="Product description is required." />
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label="Product Price" />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <InputValue
// //                     label="Original Price"
// //                     {...register("price", { required: true })}
// //                     value={price}
// //                     onChange={(e) => setPrice(e.target.value)}
// //                     placeholder="Product Price"
// //                   />
// //                   {errors.price && <Error errorName="Price is required." />}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label={"Product Slug"} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <InputArea
// //                     label="Slug"
// //                     {...register("slug", { required: true })}
// //                     value={slug}
// //                     onChange={(e) => setSlug(e.target.value)}
// //                     placeholder={t("ProductSlug")}
// //                   />
// //                   {errors.slug && <Error errorName="Slug is required." />}
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label={"Product Sku"} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <InputArea
// //                     label="Sku"
// //                     {...register("sku", { required: true })}
// //                     value={sku}
// //                     onChange={(e) => setSku(e.target.value)}
// //                     placeholder={("ProductSku")}
// //                   />
// //                   {errors.slug && <Error errorName="Sku is required." />}
// //                 </div>
// //               </div>

// //               {/* Image upload for main images */}
// //               <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
// //               <LabelArea label={"Product Image"} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <div
// //                     {...getRootPropsMain()}
// //                     className="p-6 text-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
// //                   >
// //                     <input {...getInputPropsMain()} />
// //                     <span className="flex justify-center mx-auto">
// //                       <FiUploadCloud className="text-emerald-500 text-3xl" />
// //                     </span>
// //                     <p className="mt-2 text-sm">Drag your image here</p>
// //                     <em className="text-xs text-gray-400">
// //                       (Only *.jpeg,*.png, and *.webp images will be accepted (Max: 5MB))
// //                     </em>
// //                   </div>
// //                   <div className="flex flex-wrap mt-4">{mainImageThumbs}</div>
// //                 </div>
// //               </div>

// //               <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
// //               <LabelArea label={"Extra Images"} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <div
// //                     {...getRootPropsExtra()}
// //                     className="p-6 text-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
// //                   >
// //                     <input {...getInputPropsExtra()} />
// //                     <span className="flex justify-center mx-auto">
// //                       <FiUploadCloud className="text-emerald-500 text-3xl" />
// //                     </span>
// //                     <p className="mt-2 text-sm">Drag your image here</p>
// //                     <em className="text-xs text-gray-400">
// //                       (Only *.jpeg,*.png, and *.webp images will be accepted (Max: 5MB))
// //                     </em>
// //                   </div>
// //                   <div className="flex flex-wrap mt-4">{extraImageThumbs}</div>
// //                 </div>
// //               </div>
// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label="Colors" />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <select
// //                     name="color"
// //                     onChange={handleColorSelection}
// //                     className="w-full border border-gray-200 bg-gray-100 p-2 rounded outline-none h-[48px]"
// //                   >
// //                     <option value="" disabled selected hidden>
// //                       Select a Color
// //                     </option>
// //                     <option value="red">Red</option>
// //                     <option value="black">Black</option>
// //                     <option value="yellow">Yellow</option>
// //                     <option value="blue">Blue</option>
// //                   </select>

// //                   {/* Display selected colors */}
// //                   <div className="flex flex-wrap mt-3">
// //                     {color.map((color, index) => (
// //                       <div
// //                         key={index}
// //                         className="flex items-center px-3 py-1 m-1 text-white bg-blue-500 rounded-full"
// //                       >
// //                         {/* Display color name and its hex code */}
// //                         {color.name} ({color.hex})
// //                         <FiX
// //                           className="ml-2 cursor-pointer"
// //                           onClick={() => removeColor(color.name)}
// //                         />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label="Sizes" />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <select
// //                     name="size"
// //                     onChange={handleSizeSelection}
// //                     className="w-full border border-gray-200 bg-gray-100 p-2 rounded outline-none h-[48px]"
// //                   >
// //                     <option value="" disabled selected hidden>
// //                       Select a Size
// //                     </option>
// //                     <option value="S">S</option>
// //                     <option value="M">M</option>
// //                     <option value="L">L</option>
// //                     <option value="XL">XL</option>
// //                   </select>

// //                   {/* Display selected sizes */}
// //                   <div className="flex flex-wrap mt-3">
// //                     {size.map((sizeValue, index) => (
// //                       <div
// //                         key={index}
// //                         className="flex items-center px-3 py-1 m-1 text-white bg-blue-500 rounded-full"
// //                       >
// //                         {sizeValue}
// //                         <FiX
// //                           className="ml-2 cursor-pointer"
// //                           onClick={() => removeSize(sizeValue)}
// //                         />
// //                       </div>
// //                     ))}
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label={"Details"} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <Textarea
// //                     {...register("details", { required: true })}
// //                     value={details}
// //                     onChange={(e) => setDetails(e.target.value)}
// //                     placeholder={"ProductDetails"}
// //                     rows="4"
// //                   />
// //                   {errors.details && (
// //                     <Error errorName="Product details is required." />
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label={"StockLevel"} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <InputValueFive
// //                     label={"StockLevel"}
// //                     {...register("stockLevel", { required: true })}
// //                     value={stockLevel}
// //                     onChange={(e) => setStockLevel(e.target.value)}
// //                     placeholder={"StockLevel"}
// //                   />
// //                   {errors.stockLevel && (
// //                     <Error errorName="Stock level is required." />
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-6 gap-3 mb-6">
// //                 <LabelArea label={"ProductTags"} />
// //                 <div className="sm:col-span-4 col-span-8">
// //                   <ReactTagInput
// //                     tags={tags}
// //                     placeholder={"AddTag"}
// //                     onChange={(newTags) => setTags(newTags)}
// //                   />
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {tapValue === "Combination" && (
// //             <div className="w-full px-6 pt-8 pb-40">
// //               <div className="w-full mb-6">
// //                 <Button onClick={handleGenerateCombination}>
// //                   Generate Combination
// //                 </Button>
// //               </div>
// //               <AttributeListTable />
// //             </div>
// //           )}
// //           {isCombination ? (
// //             <DrawerButton
// //               id={id}
// //               save
// //               title="Product"
// //               handleButton={handleButton}
// //               isSubmitting={isSubmitting}
// //               handleProductTap={handleProductTap}
// //             />
// //           ) : (
// //             <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
// //           )}

// //           {tapValue === "Combination" && (
// //             <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
// //           )}
// //           {/* <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} /> */}
// //         </form>
// //       </Scrollbars>
// //     </>
// //   );
// // };

// // export default ProductDrawer;
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import axios from "axios";
import LabelArea from "../form/selectOption/LabelArea";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import useProductSubmit from "@/hooks/useProductSubmit";
import DrawerButton from "@/components/form/button/DrawerButton";
import ActiveButton from "@/components/form/button/ActiveButton";
import { Modal } from "react-responsive-modal";
import UploaderThree from "@/components/image-uploader/UploaderThree";
import Title from "@/components/form/others/Title";
import { useTranslation } from "react-i18next";
import Switch from "react-switch";
import Error from "@/components/form/others/Error";
// import Title from "@/components/form/others/Title";
import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";

const ProductDrawer = ({ id, title, product}) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const {
    isCombination,
    onCloseModal,
    isSubmitting,
    tapValue,
    handleProductTap,
    handleSelectLanguage,
    handleIsCombination,
    openModal,
    handleSelectImage,
    handleGenerateCombination,
  } = useProductSubmit(id);

  // const { currency, showingTranslateValue } = useUtilsFunction();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [details, setDetails] = useState("");
  const [imageUrl, setImageUrl] = useState([]);
  const [extraImages, setExtraImages] = useState([]);
  const [stockLevel, setStockLevel] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [sku, setSku] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [processOption, setProcessOption] = useState(false);
  const [uuid, setUuid] = useState(null); //
  const [mode, setMode] = useState("add");
  const [errors, setErrors] = useState({});

  const colorOptions = [
    { name: "Mandy", hex: "#C2405C" },
    { name: "Magenta", hex: "#FF00FF" },
    { name: "Grey", hex: "#808080" },
  ];
  
 
  const handleProcess = (checked) => {
    setProcessOption(checked);
  };

  const handleImageUpload = (acceptedFiles, setImages) => {
    const oversizedFiles = acceptedFiles.filter((file) => file.size > 5000000);
    if (oversizedFiles.length > 0) {
      toast.error("Some files are larger than 5MB and cannot be uploaded.");
      return;
    }

    setUploadingImages(true); 
    setImages((prevImages) => [
      ...prevImages,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);

    setUploadingImages(false);
    toast.success("Image uploaded successfully!");
  };

  const { getRootProps: getRootPropsMain, getInputProps: getInputPropsMain } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      },
      multiple: true,
      maxSize: 5000000,
      onDrop: (files) => handleImageUpload(files, setImageUrl),
    });

  const { getRootProps: getRootPropsExtra, getInputProps: getInputPropsExtra } =
    useDropzone({
      accept: {
        "image/*": [".jpeg", ".jpg", ".png", ".webp"],
      },
      multiple: true,
      maxSize: 5000000,
      onDrop: (files) => handleImageUpload(files, setExtraImages),
    });

  const handleRemoveImage = (file, setImages) => {
    setImages((prevImages) => prevImages.filter((image) => image !== file));
    toast.success("Image removed successfully!");
  };

  const mainImageThumbs = imageUrl.map((file, index) => (
    <div key={index} className="relative">
      <img className="w-24 h-24" src={file.preview} alt={file.name} />
      <button
        type="button"
        className="absolute top-0 right-0 text-red-500"
        onClick={() => handleRemoveImage(file, setImageUrl)}
      >
        <FiXCircle />
      </button>
    </div>
  ));

  const extraImageThumbs = extraImages.map((file, index) => (
    <div key={index} className="relative">
      <img className="w-24 h-24" src={file.preview} alt={file.name} />
      <button
        type="button"
        className="absolute top-0 right-0 text-red-500"
        onClick={() => handleRemoveImage(file, setExtraImages)}
      >
        <FiXCircle />
      </button>
    </div>
  ));

  const handleColorSelection = (e) => {
    const selectedColorName = e.target.value;
    const selectedColor = colorOptions.find(
      (c) => c.name === selectedColorName
    );

    if (selectedColor && !color.find((c) => c.name === selectedColor.name)) {
      setColor([...color, selectedColor]);
    }
  };

  const handleSizeSelection = (e) => {
    const selectedSize = e.target.value;
    if (selectedSize && !size.includes(selectedSize)) {
      setSize([...size, selectedSize]);
    }
  };

  const removeColor = (colorToRemove) => {
    setColor(color.filter((c) => c.name !== colorToRemove));
  };

  const removeSize = (sizeToRemove) => {
    setSize(size.filter((s) => s !== sizeToRemove));
  };
  
  // useEffect(() => {
  //   if (uuid) {
  //     setMode("update"); // Switch to update mode
  //     fetchProduct(); // Fetch product details for update
  //   } else {
  //     setMode("add"); // Switch to add mode
  //     resetForm(); // Reset form fields for adding new product
  //   }
  // }, [uuid]);

  useEffect(() => {
    if (product) {
      // Populate form fields with product data only in update mode
      setName(product.data.name || "");
      setDescription(product.data.description || "");
      setPrice(product.data.price || "");
      setSize(product.data.size || []);
      setColor(product.data.color || []);
      setDetails(product.data.details || "");
      setStockLevel(product.data.stockLevel || "");
      setIsAvailable(product.data.isAvailable || false);
      setSku(product.data.sku || "");
      setImageUrl(product.data.imageUrl || []);
      setExtraImages(product.data.extraImages || []);
    }
  }, [product]);

  // const fetchProduct = async () => {
  //   try {
  //     const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/product/single/cac2b592-f264-4651-8a4b-1b37a82511f3${uuid}`);
  //     // Assuming your response structure
  //     // You can set the product in state or directly use it in the form
  //   } catch (error) {
  //     toast.error("Failed to fetch product data.");
  //   }
  // };

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = "Product name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!stockLevel) newErrors.stockLevel = "Stock Level is required.";
    if (!sku) newErrors.sku = "SKU is required.";
    if (!details) newErrors.details = "Details are required."; 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
    // return Object.keys(newErrors).length === 0;// Updated error key
  };

  const onSubmit = async (e) => {
    const isValid = validateForm(); // Now returns a boolean
  if (!isValid) {
    toast.error("Please fill in all required fields.");
    return;
  }
    // const validationErrors = validateForm();
    // if (Object.keys(validationErrors).length > 0) {
    //   setErrors(validationErrors);
    //   toast.error("Please fill in all required fields.");
    //   return;
    // }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stockLevel", stockLevel);
    formData.append("details", details);
    formData.append("sku", sku);
    formData.append("isAvailable", isAvailable);
    formData.append("size", JSON.stringify(size));
    formData.append("color", JSON.stringify(color));

    // Append images (assumed logic to include images)
    imageUrl.forEach((file) => {
      if (file instanceof File) {
        formData.append("imageUrl", file);
      }
    });
    extraImages.forEach((file) => {
      if (file instanceof File) {
        formData.append("extraImages", file);
      }
    });

    try {
      setLoading(true);
      let response;
      if (uuid) {
        response = await axios.put(`https://suft-90bec7a20f24.herokuapp.com/product/admin/update/${uuid}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        response = await axios.post("https://suft-90bec7a20f24.herokuapp.com/product/admin/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      if (response.status === 200 || response.status === 201) {
        toast.success(uuid ? "Product updated successfully!" : "Product added successfully!");
        resetForm();
        // Optionally fetch products or perform other actions
      } else {
        toast.error(`Error: ${response.data.message}`);
      }
    } catch (error) {
      toast.error("Failed to submit the product!");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setPrice("");
    setSize([]);
    setColor([]);
    setDetails("");
    setStockLevel("");
    setIsAvailable(false);
    setSku("");
    setImageUrl([]);
    setExtraImages([]);
  };

  
  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="active:outline-none absolute top-0 right-0 text-xl text-red-500 border-0">
            <FiXCircle className="text-3xl" />
          </div>
        }
      >
        <div className="cursor-pointer">
          <UploaderThree
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            handleSelectImage={handleSelectImage}
          />
        </div>
      </Modal>
      
      <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
        {mode === "update" ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateProduct")}
            description={t("UpdateProductDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("DrawerAddProduct")}
            description={t("AddProductDescription")}
          />
        )}
      </div>

      <div className="dark:text-gray-400 dark:border-gray-600 dark:bg-gray-700 text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <SwitchToggleForCombination
          product
          handleProcess={handleIsCombination}
          processOption={isCombination}
        />

        <ul className="flex flex-wrap -mb-px">
          <li className="mr-2">
            <ActiveButton
              tapValue={tapValue}
              activeValue="Basic Info"
              handleProductTap={handleProductTap}
            />
          </li>

          {isCombination && (
            <li className="mr-2">
              <ActiveButton
                tapValue={tapValue}
                activeValue="Combination"
                handleProductTap={handleProductTap}
              />
            </li>
          )}
        </ul>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-6 bg-gray-100 rounded-lg"
      >
        <div className=" grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product Name"} />
          <div className="sm:col-span-4 col-span-8">
            <input
              type="text"
              {...register("name", {required: "Product name is required." })}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={"product name"}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            />
             {errors.name && <Error errorName={errors.name.message} />}
            {/* <Error errorName={errors.name} /> */}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Description"} />
          <div className="sm:col-span-4 col-span-8">
            <textarea
              {...register("description", { required: true })}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"product description"}
              className="focus:bg-white w-full p-2 mt-1 bg-gray-100 border rounded outline-none"
              rows="4"
            />
            {/* {errors.description && (
              <span className="text-red-600">Description is required.</span>
            )} */}
          </div>
        </div>

        <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product Image"} />
          <div className="sm:col-span-4 col-span-8">
            <div
              {...getRootPropsMain()}
              className="p-6 text-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
            >
              <input {...getInputPropsMain()} />
              <span className="flex justify-center mx-auto">
                <FiUploadCloud className="text-emerald-500 text-3xl" />
              </span>
              <p className="mt-2 text-sm">Drag your image here</p>
              <em className="text-xs text-gray-400">
                (Only *.jpeg,*.png, and *.webp images will be accepted (Max:
                5MB))
              </em>
            </div>
            <div className="flex flex-wrap mt-4">{mainImageThumbs}</div>
          </div>
        </div>

        <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Extra Images"} />
          <div className="sm:col-span-4 col-span-8">
            <div
              {...getRootPropsExtra()}
              className="p-6 text-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
            >
              <input {...getInputPropsExtra()} />
              <span className="flex justify-center mx-auto">
                <FiUploadCloud className="text-emerald-500 text-3xl" />
              </span>
              <p className="mt-2 text-sm">Drag your image here</p>
              <em className="text-xs text-gray-400">
                (Only *.jpeg,*.png, and *.webp images will be accepted (Max:
                5MB))
              </em>
            </div>
            <div className="flex flex-wrap mt-4">{extraImageThumbs}</div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product Price"} />
          <div className="sm:col-span-4 col-span-8">
            <input
              type="number"
              {...register("price", { required: true })}
              value={price}
              placeholder={"product price"}
              onChange={(e) => setPrice(e.target.value)}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            />
            {/* {errors.price && (
              <span className="text-red-600">Price is required.</span>
            )} */}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product Size"} />
          <div className="sm:col-span-4 col-span-8">
            <select
              onChange={handleSizeSelection}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            >
              <option value="" hidden>
                Select a Size
              </option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
            <div className="flex mt-2">
              {size.map((s, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-2 mr-2 text-white bg-[#059669] text-white rounded-full"
                >
                  {s}
                  <FiXCircle
                    onClick={() => removeSize(s)}
                    className="ml-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product Color"} />
          <div className="sm:col-span-4 col-span-8">
            <select
              onChange={handleColorSelection}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            >
              <option value="" hidden>
                Select a Color
              </option>
              {colorOptions.map((c, idx) => (
                <option key={idx} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <div className="flex mt-2">
              {color.map((c, idx) => (
                <div
                  key={idx}
                  className="flex items-center p-2 mr-4 text-white bg-[#059669] text-white rounded-full"
                >
                  {c.name} ({c.hex})
                  <FiXCircle
                    onClick={() => removeColor(c.name)}
                    className="ml-2 cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product StockLevel"} />
          <div className="sm:col-span-4 col-span-8">
            <input
              type="number"
              {...register("stockLevel", { required: true })}
              value={stockLevel}
              onChange={(e) => setStockLevel(e.target.value)}
              placeholder={"product stocklevel"}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            />
            {/* {errors.stockLevel && (
              <span className="text-red-600">Stock Level is required.</span>
            )} */}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product Details"} />
          <div className="sm:col-span-4 col-span-8">
            <textarea
              {...register("details", { required: true })}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={"product details"}
              className=" focus:bg-white w-full p-2 mt-1 bg-gray-100 border rounded outline-none"
              rows="4"
            />
            {/* {errors.details && (
              <span className="text-red-600">Details are required.</span>
            )} */}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label={"Product Sku"} />
          <div className="sm:col-span-4 col-span-8">
            <input
              type="text"
              {...register("sku", { required: true })}
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              placeholder={"product sku"}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            />
            {/* {errors.sku && (
              <span className="text-red-600">SKU is required.</span>
            )} */}
          </div>
        </div>
        <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-[10rem]">
          <LabelArea label={"Published"} />
          <div className="sm:col-span-4 col-span-8">
            <div className={`${"mb-3"}`}>
              <div className="flex flex-wrap items-center">
                <label className="dark:text-gray-300 block mb-1 text-sm font-semibold text-gray-700">
                  {title}
                </label>

                <Switch
                  id={id || title || ""}
                  onChange={handleProcess}
                  checked={processOption}
                  className="react-switch md:ml-0 ml-3"
                  uncheckedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 14,
                        color: "white",
                        paddingRight: 5,
                        paddingTop: 1,
                      }}
                    >
                      No
                    </div>
                  }
                  width={80}
                  height={30}
                  handleDiameter={28}
                  offColor="#E53E3E"
                  onColor="#2F855A"
                  checkedIcon={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        fontSize: 14,
                        color: "white",
                        paddingLeft: 8,
                        paddingTop: 1,
                      }}
                    >
                      Yes
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {tapValue === "Combination" && (
          <div className="w-full px-6 pt-8 pb-40">
            <div className="w-full mb-6">
              <Button onClick={handleGenerateCombination}>
                Generate Combination
              </Button>
            </div>
            <AttributeListTable />
          </div>
        )}
        <DrawerButton id={id} title="Product" />
        {/* {isCombination ? (
          <DrawerButton
            id={id}
            save
            title="Product"
            loading={loading}
            text={uuid ? t("UpdateProduct") : t("AddProduct")}
            // handleButton={handleButton}
            isSubmitting={isSubmitting}
            handleProductTap={handleProductTap}
          />
        ) : (
          <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
        )}

        {tapValue === "Combination" && (
          <DrawerButton id={id} title="Product" isSubmitting={isSubmitting} />
        )} */}
      </form>
    </>
  );
};

export default ProductDrawer;
