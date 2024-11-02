import { useState, useEffect } from "react";
import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import { Link } from "react-router-dom";
import axios from "axios";
import { IoRemoveSharp } from "react-icons/io5";

// Internal imports
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import CategoryDrawer from "@/components/drawer/CategoryDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const CategoryTable = ({
  data,
  lang,
  isCheck,
  setIsCheck,
  useParamId,
  showChild,
}) => {
  const { serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null); 

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://suft-90bec7a20f24.herokuapp.com/category/admin-all"
      );
      if (Array.isArray(response.data.data)) {
        setCategories(response.data.data);
        setLoading(false);
      } else {
        console.error("Categories data is not an array:", response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
      setError("Failed to fetch categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle delete click - open modal with category name
  const handleDeleteClick = (category) => {
    setSelectedCategory(category); // Set the selected category (name and uuid)
    handleModalOpen(); // Open the modal
  };

  // Handle actual category deletion
  // const handleDelete = async (uuid) => {
  //   try {
  //     const response = await axios.delete(
  //       `https://suft-90bec7a20f24.herokuapp.com/category/admin-delete/${uuid}`
  //     );

  //     if (response.status === 200) {
  //       toast.success("Category deleted successfully!", {
  //         // position: toast.POSITION.TOP_RIGHT,
  //       });
  //       fetchCategories(); // Refresh the categories list after successful deletion
  //       setSelectedCategory(null); // Reset selected category after deletion
  //     }
  //   } catch (error) {
  //     console.error("Error deleting category:", error);
  //     toast.error("Failed to delete the category. Please try again.", {
  //       // position: toast.POSITION.TOP_RIGHT,
  //     });
  //   }
  // };

  // Handle checkbox click to manage selected items
  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck((prev) => [...prev, id]);
    } else {
      setIsCheck((prev) => prev.filter((item) => item !== id));
    }
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {selectedCategory && ( // Only show the modal when a category is selected
        <DeleteModal
          useParamId={useParamId}
          id={selectedCategory.uuid}
          title={selectedCategory.name}
          onDelete={() => handleDelete(selectedCategory.uuid)}
        />
      )}

      <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <TableBody>
        {categories?.map((category) => (
          <TableRow key={category.uuid}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name="category"
                id={category.uuid}
                handleClick={handleClick}
                isChecked={isCheck?.includes(category.uuid)}
              />
            </TableCell>

            <TableCell className="text-xs font-semibold uppercase">
              {category.uuid.substring(20, 24)}
            </TableCell>
            <TableCell>
              {category.iconUrl ? (
                <Avatar
                  className="md:block bg-gray-50 hidden p-1 mr-3"
                  src={category.iconUrl}
                  alt={category.name}
                />
              ) : (
                <Avatar
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="product"
                  className="md:block bg-gray-50 hidden p-1 mr-2 shadow-none"
                />
              )}
            </TableCell>

            <TableCell className=" text-sm font-medium">
              {category.children && category.children.length > 0 ? (
                <Link to={`/categories/${category.id}`} className="text-blue-700">
                  {category.name}
                  <>
                    {showChild && (
                      <>
                        {" "}
                        <div className=" pl-2">
                          {category?.children?.map((child) => (
                            <div key={child._id}>
                              <Link
                                to={`/categories/${child?._id}`}
                                className="text-blue-700"
                              >
                                <div className="flex items-center text-xs text-blue-800">
                                  <span className=" pr-1 text-xs text-gray-500">
                                    <IoRemoveSharp />
                                  </span>
                                  <span className="text-gray-500">
                                    {showingTranslateValue(child.name)}
                                  </span>
                                </div>
                              </Link>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                </Link>
              ) : (
                <span>{category.name}</span>
              )}
            </TableCell>
            <TableCell className="text-sm">{category.description}</TableCell>

            <TableCell className="text-center">
              <ShowHideButton
                id={category.uuid}
                category
                status={category.isPublished}
              />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={category.uuid}
                parent={category}
                isCheck={isCheck}
                children={category?.children}
                handleUpdate={handleUpdate}
                handleModalOpen={() => handleDeleteClick(category)} 
                title={category.name}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CategoryTable;
