import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import dayjs from "dayjs";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

// Internal imports
import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import Tooltip from "@/components/tooltip/Tooltip";
import CustomerDrawer from "@/components/drawer/CustomerDrawer";
import EditDeleteButton from "@/components/table/EditDeleteButton";

// Component
const CustomerTable = ({ customers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const [customers, setCustomers] = useState([]); // State to store customers
  const [loading, setLoading] = useState(true); // State to handle loading

  // Function to fetch customers
  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "https://suft-90bec7a20f24.herokuapp.com/admin/users"
      );

      console.log("Full API response:", response); // Log the full response
      console.log("Fetched customer data:", response.data?.data); // Log customer data

      // Access customer data inside response.data.data
      const customersData = response.data?.data || []; // Ensure an empty array fallback if not present

      if (Array.isArray(customersData)) {
        setCustomers(customersData); // Set customer data into state
      } else {
        console.error("Customer data is not an array:", customersData);
        setCustomers([]); // Fallback if not an array
      }

      setLoading(false); // Set loading to false after processing the response
    } catch (error) {
      console.error("Error fetching customers:", error);
      setCustomers([]); // Empty array on error
      setLoading(false); // Ensure loading is set to false in case of an error
    }
  };

  // Fetch customers on component mount
  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <>
      {/* Render modals */}
      <DeleteModal id={serviceId} title={title} />
      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {customers?.map((user) => (
          <TableRow key={user.uuid}>
            <TableCell>
              <span className="text-xs font-semibold uppercase">
                {user.uuid?.substring(0, 4) || "N/A"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(user.createdAt).format("MMM D, YYYY") || "Unknown"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.name || "No Name"}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{user.email || "No Email"}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{user.phone || "No Phone"}</span>
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <div className="hover:text-emerald-600 p-2 text-gray-400 cursor-pointer">
                  <Link to={`/customer-order/${user.uuid}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewOrder")}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>

                <EditDeleteButton
                  title={user.name}
                  id={user.uuid}
                  handleUpdate={handleUpdate}
                  handleModalOpen={handleModalOpen}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CustomerTable;
