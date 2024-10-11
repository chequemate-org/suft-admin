import { useEffect, useState } from "react";
import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import axios from "axios";
import { toast } from "react-toastify";

// Internal imports
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import CategoryDrawer from "@/components/drawer/CategoryDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const CategoryTable = ({ lang, isCheck, setIsCheck, useParamId, showChild }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { showingTranslateValue } = useUtilsFunction();

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://suft-90bec7a20f24.herokuapp.com/category/admin-all');
      if (Array.isArray(response.data.data)) {
        setCategories(response.data.data);
        setLoading(false);
      } else {
        console.error('Categories data is not an array:', response.data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);
      setError("Failed to fetch categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle deleting a category
  const handleDelete = async (uuid) => {
    try {
      const response = await axios.delete(`https://suft-90bec7a20f24.herokuapp.com/category/admin-delete/${uuid}`);

      if (response.status === 200) {
        toast.success("Category deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        fetchCategories(); // Refresh the categories list after successful deletion
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Failed to delete the category. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

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
      {isCheck?.length < 1 && (
      //  <DeleteModal/>
       <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <MainDrawer>
        <CategoryDrawer id={serviceId} data={categories} lang={lang} />
      </MainDrawer>

      <TableBody>
        {Array.isArray(categories) && categories.length > 0 ? (
          categories.map((category) => (
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
                {category.uuid.substring(0, 8)}
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
                    src="https://images.pexels.com/photos/60597/dahlia-red-blossom-bloom-60597.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="product"
                    className="md:block bg-gray-50 p-1 mr-2 shadow-none"
                  />
                )}
              </TableCell>
              <TableCell className="text-sm font-medium">
                <span>{category.name}</span>
              </TableCell>
              <TableCell className="text-sm">
                <span>{category.description}</span>
              </TableCell>
              <TableCell className="text-center">
                <ShowHideButton id={category.uuid} status={category.isPublished} />
              </TableCell>
              <TableCell>
                <EditDeleteButton
                  id={category.uuid}
                  parent={category}
                  isCheck={isCheck}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={category.name}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center">
              No categories available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default CategoryTable;
