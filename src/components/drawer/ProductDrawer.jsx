import React, { useState, useEffect } from "react";
import LabelArea from "@/components/form/selectOption/LabelArea";
import useCouponSubmit from "@/hooks/useCouponSubmit";
import DrawerButton from "@/components/form/button/DrawerButton";
import Title from "@/components/form/others/Title";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import { useDropzone } from "react-dropzone";
import { Modal } from "react-responsive-modal";
import { FiX } from "react-icons/fi";
import UploaderThree from "@/components/image-uploader/UploaderThree";
import Switch from "react-switch";
import axios from "axios";
import ProductServices from "@/services/ProductServices";
import useProductSubmit from "@/hooks/useProductSubmit";
import SwitchToggleForCombination from "@/components/form/switch/SwitchToggleForCombination";
import ActiveButton from "@/components/form/button/ActiveButton";
import ReactTagInput from "@pathofdev/react-tag-input";

const ProductDrawer = ({ id, product, title, uuid }) => {
  const { t } = useTranslation();
  const {
    tag,
    setTag,
    values,
    language,
    register,
    onSubmit,
    openModal,
    setValues,
    variants,
    handleSubmit,
    isCombination,
    variantTitle,
    attributes,
    attTitle,
    handleAddAtt,
    // productId,
    onCloseModal,
    isBulkUpdate,
    globalSetting,
    isSubmitting,
    tapValue,
    setTapValue,
    resetRefTwo,
    handleSkuBarcode,
    handleProductTap,
    selectedCategory,
    setSelectedCategory,
    setDefaultCategory,
    defaultCategory,
    handleProductSlug,
    handleSelectLanguage,
    handleIsCombination,
    handleEditVariant,
    handleRemoveVariant,
    handleClearVariant,
    handleQuantityPrice,
    handleSelectImage,
    handleSelectInlineImage,
    handleGenerateCombination,
  } = useProductSubmit(id);

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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadingImages, setUploadingImages] = useState(false);
  const [processOption, setProcessOption] = useState(false);
  const [productData, setProductData] = useState(null);

  const handleProcess = (checked) => {
    setProcessOption(checked);
  };
  const handleColorTags = (newTags) => {
    const formattedColors = newTags.map((tag) => {
      // Match color name with optional hex code in format "name (#hex)"
      const match = tag.match(/^(.+?)(?:\s*\((#[A-Fa-f0-9]{6})\))?$/);
      if (match) {
        return {
          name: match[1].trim(), // Just the color name
          hex: match[2] || "#000000", // Default hex if not provided
        };
      }
      return { name: tag, hex: "#000000" }; // Default if no hex format
    });
    setColor(formattedColors);
  };

  const handleImageUpload = (acceptedFiles, setImages) => {
    const oversizedFiles = acceptedFiles.filter((file) => file.size > 5000000);
    if (oversizedFiles.length > 0) {
      toast.error("Some files are larger than 5MB and cannot be uploaded.");
      return;
    }

    setUploadingImages(true);

    setImages((prevImages) => {
      // Ensure prevImages is an array
      const validPrevImages = Array.isArray(prevImages) ? prevImages : [];

      return [
        ...validPrevImages,
        ...acceptedFiles.map((file) =>
          Object.assign(file, { preview: URL.createObjectURL(file) })
        ),
      ];
    });

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

  const extraImageThumbs = (extraImages || []).map((file, index) => (
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

  
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const data = await ProductServices.getProductById(id);
          setProductData(data); // Ensure you are setting productData correctly
          console.log("Fetched product data:", data); // Debugging
        } catch (error) {
          console.error("Failed to fetch product:", error);
          setProductData(null); // Handle the error appropriately
        }
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    if (productData) {
      setName(productData.name || "");
      setDescription(productData.description || "");
      setPrice(productData.price || "");
      setSize(productData.size || []);
      setColor(productData.color || []);
      setStockLevel(productData.stockLevel || "");
      setDetails(productData.details || "");
      setImageUrl(productData.imageUrl || []);
      setExtraImages(productData.extraImages || []);
      setProcessOption(productData.isAvailable || false);
    }
  }, [productData]);


  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Product name is required.";
    if (!description) newErrors.description = "Description is required.";
    if (!price) newErrors.price = "Price is required.";
    if (!size || size.length === 0) newErrors.size = "Size is required.";
    if (!color || color.length === 0) newErrors.color = "Color is required.";
    if (!details) newErrors.details = "Details are required.";
    if (!imageUrl || imageUrl.length === 0)
      newErrors.imageUrl = "Image is required.";
    if (!extraImages || extraImages.length === 0)
      newErrors.extraImages = "Extra images are required.";
    if (!stockLevel) newErrors.stockLevel = "Stock level is required.";
    if (!isAvailable)
      newErrors.isAvailable = "Availability status is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    if (validateForm()) {
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("stockLevel", stockLevel);
      formData.append("details", details);
      formData.append("isAvailable", isAvailable);
      formData.append("size", JSON.stringify(size));
      formData.append("color", JSON.stringify(color));

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
        if (id) {
          response = await axios.put(
            `${
              import.meta.env.VITE_APP_API_BASE_URL
            }/product/admin/update/${id}`,
            formData
          );
        } else {
          response = await axios.post(
            `${import.meta.env.VITE_APP_API_BASE_URL}/product/create`,
            formData
          );
        }

        if (response.status === 200 || response.status === 201) {
          toast.success(
            id ? "Product updated successfully!" : "Product added successfully!"
          );
          resetForm();
        } else {
          toast.error("Server error: " + response.data.message);
        }
      } catch (error) {
        console.error(
          "Error submitting the product:",
          error.response ? error.response.data : error.message
        );
        toast.error("Failed to submit the product!");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setName("");
    setDescription("");
    setDetails("");
    setPrice("");
    setSize([]);
    setColor([]);
    setImageUrl([]);
    setExtraImages([]);
    setStockLevel("");
    setErrors({});
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={onCloseModal}
        center
        closeIcon={
          <div className="active:outline-none absolute top-0 right-0 text-xl text-red-500 border-0">
            <FiX className="text-3xl" />
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
        {id ? (
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
        onSubmit={handleProductSubmit}
        className="p-6 bg-gray-100 rounded-lg"
      >
        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label="Product Name" />
          <div className="sm:col-span-4 col-span-8">
            <input
              type="text"
              value={name}
              placeholder={"product name"}
              onChange={(e) => setName(e.target.value)}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            />
            {errors.name && (
              <span className="mt-2 text-sm text-red-400">
                Name is required.
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label="Product description" />
          <div className="sm:col-span-4 col-span-8">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={"product description"}
              className=" focus:bg-white w-full p-2 mt-1 bg-gray-100 border rounded outline-none"
              rows="4"
            />
            {errors.description && (
              <span className="mt-2 text-sm text-red-400">
                Description are required.
              </span>
            )}
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
            {errors.imageUrl && (
              <span className="mt-2 text-sm text-red-400">
                image is required.
              </span>
            )}
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
            {errors.extraImages && (
              <span className="mt-2 text-sm text-red-400">
                extra image is required.
              </span>
            )}
          </div>
        </div>

        
        <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
            <LabelArea label="Discount" />
            <div className="sm:col-span-4 relative col-span-8">
              <div className="absolute left-0 flex items-center py-3 pl-3 pointer-events-none">
                <span className="text-gray-500 text-[15px]">%</span>
              </div>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="Enter discount"
                className="focus:bg-white block w-full h-12 px-10 py-2 bg-gray-100 border border-gray-200 rounded-md outline-none"
                min="1"
                max="100"
              />
              <div className="left-2 absolute inset-y-0 flex items-center h-12 border-l border-gray-300 pointer-events-none"></div>
              {errors.discount && (
                <span className="mt-2 text-sm text-red-400">
                  Discount is required.
                </span>
              )}
            </div>
          </div>


        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label="Product Size" />
          <div className="sm:col-span-4 uppercase col-span-8">
            <ReactTagInput
              tags={size}
              placeholder="Type and press enter for sizes (e.g., S, M, L, XL)"
              onChange={(newTags) => setSize(newTags)}
              className="focus:bg-white"
            />
            {errors.size && (
              <span className="mt-2 text-sm text-red-400">
                Size is required.
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label="Product Color" />
          <div className="sm:col-span-4 capitalize col-span-8">
            <ReactTagInput
              tags={color.map((c) => c.name)}
              placeholder="Type color and hex (e.g., Red (#FF0000)) and press enter"
              onChange={handleColorTags}
              className="focus:bg-white"
            />
            {errors.color && (
              <span className="mt-2 text-sm text-red-400">
                Color is required.
              </span>
            )}
          </div>
        </div>
        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label="Product StockLevel" />
          <div className="sm:col-span-4 col-span-8">
            <input
              type="number"
              value={stockLevel}
              onChange={(e) => setStockLevel(e.target.value)}
              placeholder={"product stocklevel"}
              className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
            />
            {errors.stockLevel && (
              <span className="mt-2 text-sm text-red-400">
                Stock Level is required.
              </span>
            )}
          </div>
        </div>

        <div className="grid grid-cols-6 gap-3 mb-6">
          <LabelArea label="Product Details" />
          <div className="sm:col-span-4 col-span-8">
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder={"product details"}
              className=" focus:bg-white w-full p-2 mt-1 bg-gray-100 border rounded outline-none"
              rows="4"
            />
            {errors.details && (
              <span className="mt-2 text-sm text-red-400">
                Details are required.
              </span>
            )}
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

        <DrawerButton id={id} title="Product" isSubmitting={loading} />
      </form>
    </>
  );
};

export default ProductDrawer;
