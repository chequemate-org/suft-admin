import { useEffect, useState } from "react";
import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import axios from "axios"; // Import axios for API calls
import { toast } from "react-toastify"; // Import toast for notifications

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

  const [categories, setCategories] = useState([]); // State to hold category data
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  // Function to fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://suft-90bec7a20f24.herokuapp.com/category/admin-all');
      console.log('categories:', response.data);

      if (Array.isArray(response.data.data)) {
        setCategories(response.data.data); 
        setLoading(false); // Set categories from response.data.data
      } else {
        console.error('Categories data is not an array:', response.data);
        setCategories([]);  // Reset categories to an empty array if data is invalid
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      setCategories([]);  // Reset categories to an empty array on error
      setError("Failed to fetch categories. Please try again.");
    }
  };

  useEffect(() => {
    fetchCategories(); // Fetch categories on component mount
  }, []);

  // Handle delete category based on uuid
  const handleDelete = async (uuid) => {
    if (!uuid) return;

    try {
      const response = await axios.delete(`https://suft-90bec7a20f24.herokuapp.com/category/admin-delete/${uuid}`);
      
      if (response.status === 200) {
        toast.success("Category deleted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // Fetch categories again to update the list after deletion
        fetchCategories(); 
      }
    } catch (err) {
      console.error("Error deleting category:", err);
      toast.error("Failed to delete the category. Please try again.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };

  // Conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading categories...</div>; // Return a div instead of <p>
  }

  if (error) {
    return <div>{error}</div>; // Return a div instead of <p>
  }

  return (
    <>
      {isCheck?.length < 1 && (
        <DeleteModal useParamId={useParamId} id={serviceId} title={title} />
      )}

      <MainDrawer>
        <CategoryDrawer id={serviceId} lang={lang} />
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

              {/* Category ID (shortened version) */}
              <TableCell className="text-xs font-semibold uppercase">
                {category.uuid.substring(0, 8)}
              </TableCell>

              {/* Category Icon */}
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

              {/* Category Name */}
              <TableCell className="text-sm font-medium">
                <span>{category.name}</span>
              </TableCell>

              {/* Category Description */}
              <TableCell className="text-sm">
                <span>{category.description}</span>
              </TableCell>

              {/* Show/Hide Button for Category */}
              <TableCell className="text-center">
                <ShowHideButton id={category.uuid} status={category.isPublished} />
              </TableCell>

              {/* Edit/Delete Button */}
              <TableCell>
                <EditDeleteButton
                  id={category.uuid}
                  parent={category}
                  isCheck={isCheck}
                  handleDelete={() => handleDelete(category.uuid)} // Pass the uuid for deletion
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                  title={category.name}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center">No categories available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default CategoryTable;
