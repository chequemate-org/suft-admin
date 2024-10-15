import { Input } from "@windmill/react-ui";
import { useState, useEffect } from "react";
import { useState, useEffect } from "react";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Uploader from "@/components/image-uploader/Uploader";
import Title from "@/components/form/others/Title";
import DrawerButton from "../form/button/DrawerButton";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CategoryDrawer = ({ id }) => {
  // Initialize form states
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [error, setError] = useState('');

  // Fetch single category data if id (uuid) is provided
  useEffect(() => {
    const fetchCategoryById = async (uuid) => {
      try {
        const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/category/admin-get/${uuid}`);
        const category = response.data.data; // Assuming response structure has category under data

        if (category) {
          setName(category.name || '');
          setDescription(category.description || '');
          setImageUrl(category.iconUrl || '');
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
      fetchCategoryById(id); // Call function to fetch category data by uuid
    } else {
      resetForm(); // Reset form if no id is provided
    }
  }, [id]);

  // Handle form submission for updating/creating a category

  // Fetch single category data if id (uuid) is provided
  useEffect(() => {
    const fetchCategoryById = async (uuid) => {
      try {
        const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/category/admin-get/${uuid}`);
        const category = response.data.data; // Assuming response structure has category under data

        if (category) {
          setName(category.name || '');
          setDescription(category.description || '');
          setImageUrl(category.iconUrl || '');
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
      fetchCategoryById(id); // Call function to fetch category data by uuid
    } else {
      resetForm(); // Reset form if no id is provided
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
        response = await axios.put(`https://suft-90bec7a20f24.herokuapp.com/category/admin-update/${id}`, categoryData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          toast.success("Category updated successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } else {
        // Create a new category if no id
        response = await axios.post("https://suft-90bec7a20f24.herokuapp.com/category/admin-add", categoryData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.status === 201) {
          toast.success("Category created successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        if (response.status === 201) {
          toast.success("Category created successfully!", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
      resetForm();
      resetForm();
    } catch (err) {
      console.error("Error saving category:", err);
      setError(id ? "Failed to update the category. Please try again." : "Failed to create the category. Please try again.");
      console.error("Error saving category:", err);
      setError(id ? "Failed to update the category. Please try again." : "Failed to create the category. Please try again.");
    }
  };

  // Reset the form fields
  const resetForm = () => {
    setName('');
    setDescription('');
    setImageUrl('');
    setIsPublished(true);
    setError('');
    setName('');
    setDescription('');
    setImageUrl('');
    setIsPublished(true);
    setError('');
  };

  return (
    <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
      <Title
        title={id ? "Update Category" : "Add Category"}
        description={id ? "Update existing category" : "Add new category"}
      />
    <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
      <Title
        title={id ? "Update Category" : "Add Category"}
        description={id ? "Update existing category" : "Add new category"}
      />

      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {/* Name Field */}
          {/* Name Field */}
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

          {/* Description Field */}
          {/* Description Field */}
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

          {/* Image Upload Field */}
          {/* Image Upload Field */}
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

          {/* Published Switch */}
          {/* Published Switch */}
          <div className="grid grid-cols-6 gap-3 mb-20">
            <label className="col-span-2">Published</label>
            <div className="col-span-4">
              <SwitchToggle
                handleProcess={setIsPublished}
                processOption={isPublished}
              />
            </div>
          </div>

          {/* Error message display */}
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
