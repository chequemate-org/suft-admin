import { Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Uploader from "@/components/image-uploader/Uploader";
import Title from "@/components/form/others/Title";
import DrawerButton from "../form/button/DrawerButton";
import axios from "axios";
import useCategorySubmit from "@/hooks/useCategorySubmit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LabelArea from "@/components/form/selectOption/LabelArea";

const CategoryDrawer = ({ id }) => {
  const { t } = useTranslation();
  const { register, handleSelectLanguage } = useCategorySubmit(id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategoryById = async (uuid) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/category/admin-get/${uuid}`,
        );
        const category = response.data.data;

        if (category) {
          setName(category.name || "");
          setDescription(category.description || "");
          setImageUrl(category.iconUrl || "");
          setIsPublished(category.isPublished || true);
        } else {
          console.error("Category not found");
          setError("Category not found");
        }
      } catch (err) {
        console.error("Error fetching category:", err);
        setError("Failed to fetch the category. Please try again.");
      }
    };

    if (id) {
      fetchCategoryById(id);
    } else {
      resetForm();
    }
  }, [id]);

  // Handle form submission for updating/creating a category
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      description,
      iconUrl: imageUrl,
      isPublished,
    };

    try {
      let response;
      if (id) {
        // Update category if id (uuid) exists
        response = await axios.put(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/category/admin-update/${id}`,
          categoryData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          toast.success("Category updated successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        // Create a new category if no id
        response = await axios.post(
          `${
            import.meta.env.VITE_APP_API_BASE_URL
          }/category/admin-add`,
          categoryData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 201) {
          toast.success("Category created successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
      resetForm();
    } catch (err) {
      console.error("Error saving category:", err);
      setError(
        id
          ? "Failed to update the category. Please try again."
          : "Failed to create the category. Please try again."
      );
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setName("");
    setDescription("");
    setImageUrl("");
    setIsPublished(true);
    setError("");
  };

  return (
    <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-2 border-b border-gray-100">
      <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-2 border-b border-gray-100">
        {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCategory")}
            description={t("UpdateCategoryDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCategoryTitle")}
            description={t("AddCategoryDescription")}
          />
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="scrollbar-hide flex-grow w-full max-h-full p-6 pb-40">
          {/* Name Field */}
          <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
            <LabelArea label={t("Name")} />
            <div className="col-span-4">
              <Input
                required={true}
                register={register}
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category title"
                className="w-full"
              />
            </div>
          </div>

          {/* Description Field */}
          <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
            <LabelArea label={t("Description")} />
            <div className="col-span-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Category Description"
                className="focus:border-gray-300 focus:bg-white block w-full p-2 text-sm bg-gray-100 border border-gray-200 rounded outline-none"
                rows="4"
              />
            </div>
          </div>

          {/* Image Upload Field */}
          <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
            <LabelArea label={t("ParentCategory")} />
            <div className="col-span-4">
              <Uploader
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                folder="category"
              />
            </div>
          </div>

          {/* Published Switch */}
          <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
            <LabelArea label={t("Published")} />
            <div className="col-span-4">
              <SwitchToggle
                handleProcess={setIsPublished}
                processOption={isPublished}
              />
            </div>
          </div>

          {/* Error message display */}
          {error && <p className="text-red-500">{error}</p>}

          {/* Submit Button */}
          <DrawerButton id={id} title="Category" isSubmitting={false} />
        </div>
      </form>
    </div>
  );
};

export default CategoryDrawer;
