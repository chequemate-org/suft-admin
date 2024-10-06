import { Input } from "@windmill/react-ui";
import { useState } from "react";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Uploader from "@/components/image-uploader/Uploader";
import useCouponSubmit from "@/hooks/useCouponSubmit";
import Title from "@/components/form/others/Title";
import { t } from "i18next";
import DrawerButton from "../form/button/DrawerButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";

const CategoryDrawer = ({ id }) => {
  const {
    register,
    onSubmit,
    published,
    setPublished,
    isSubmitting,
    handleSelectLanguage,
  } = useCouponSubmit(id);

  // Initialize form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoryData = {
      name,
      description,
      iconUrl: imageUrl,
      isPublished,
    };

    try {
      const response = await axios.post("https://suft-90bec7a20f24.herokuapp.com/category/admin-add", categoryData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 201) {
        toast.success("Category created successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        resetForm();
        console.log("Category created successfully", response.data);
      }
    } catch (err) {
      console.error("Error creating category:", err);
      setError("Failed to create the category. Please try again.");
    }
  };
  const resetForm = () => {
    setName('');        
    setDescription('');        
    setImageUrl('');           
    setIsPublished(true); 
  };

  return (
    <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
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

      <form onSubmit={handleSubmit}>
        <div className="p-6">
          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="col-span-2">Name</label>
            <div className="col-span-4">
              <Input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Category title"
                className="w-full"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="col-span-2">Description</label>
            <div className="col-span-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Category Description"
                className="w-full p-2 border border-gray-300 rounded"
                rows="4"
              />
            </div>
          </div>


          <div className="grid grid-cols-6 gap-3 mb-6">
            <label className="col-span-2">Category Image</label>
            <div className="col-span-4">
              <Uploader
                imageUrl={imageUrl}
                setImageUrl={setImageUrl}
                folder="category"
              />
            </div>
          </div>


          <div className="grid grid-cols-6 gap-3 mb-20">
            <label className="col-span-2">Published</label>
            <div className="col-span-4">
              <SwitchToggle
                handleProcess={setIsPublished}
                processOption={isPublished}
              />
            </div>
          </div>

          {error && <p className="text-red-500">{error}</p>}

          <DrawerButton id={id} title="Category" isSubmitting={isSubmitting} />
        </div>
      </form>
    </div>
  );
};

export default CategoryDrawer;
