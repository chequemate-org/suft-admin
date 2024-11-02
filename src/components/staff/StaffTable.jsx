
import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Internal imports
import Status from "@/components/table/Status"; // Assuming you have this component
import useUtilsFunction from "@/hooks/useUtilsFunction"; // Assuming this is a custom hook for utility functions
import MainDrawer from "@/components/drawer/MainDrawer";
import useToggleDrawer from "@/hooks/useToggleDrawer"; // Assuming this is a custom hook for handling drawer toggle
import StaffDrawer from "@/components/drawer/StaffDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ActiveInActiveButton from "@/components/table/ActiveInActiveButton";

const StaffTable = ({ lang }) => {
  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    setStaffDetails,
    handleResetPassword,
    staffDetails,
  } = useToggleDrawer();

  const { showDateFormat, showingTranslateValue } = useUtilsFunction();

  // State to hold staff data
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedStaffForDelete, setSelectedStaffForDelete] = useState(null);

  // Fetch staff data from the API
  const fetchStaffs = async () => {
    try {
      const response = await axios.get(
        "https://suft-90bec7a20f24.herokuapp.com/admin/all-staff"
      );

      console.log("Fetched staff data:", response.data);

      // Access the correct nested data (response.data.data.data)
      if (Array.isArray(response.data.data.data)) {
        setStaffs(response.data.data.data);
      } else {
        console.error("Staff data is not an array:", response.data);
        setStaffs([]); // Fallback to an empty array
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setStaffs([]); // Fallback to an empty array on error
    } finally {
      setLoading(false); // Ensure loading state is disabled
    }
  };

  // Use effect to fetch data on component mount
  useEffect(() => {
    fetchStaffs();
  }, []);

  // Ensure staffs is always an array and handle loading state
  if (loading) {
    return <p>Loading staff data...</p>;
  }

  if (!Array.isArray(staffs) || staffs.length === 0) {
    return <p>No staff data available.</p>;
  }

  const fetchStaffByUUID = async (uuid) => {
    try {
      const response = await axios.get(
        `https://suft-90bec7a20f24.herokuapp.com/admin/staff/${uuid}`
      );
      if (response.data) {
        setSelectedStaff(response.data); 
        console.log("Fetched staff for editing by UUID:", response.data);
      }
    } catch (error) {
      console.error("Error fetching staff by UUID:", error);
    }
  };

  const handleEdit = async (uuid) => {
    try {
      const staffData = await fetchStaffByUUID(uuid); // Fetch staff data
      setStaffDetails(staffData); // Set the fetched staff data
      handleUpdate(uuid); // Open the drawer
    } catch (error) {
      console.error("Error editing staff:", error);
    }
  };

  const handleDeleteClick = (staff) => {
    setSelectedStaffForDelete(staff); // Set the selected coupon (name and uuid)
    handleModalOpen(); // Open the delete modal
  };

  return (
    <>
      {selectedStaffForDelete && (
        <DeleteModal
          id={selectedStaffForDelete.uuid}
          title={selectedStaffForDelete.name} // Include coupon name in the title
          onDelete={() => handleDelete(selectedStaffForDelete.uuid)} // Handle actual deletion
        />
      )}

      <MainDrawer>
        <StaffDrawer
          id={serviceId}
          staff={staffDetails}
          fetchStaffs={fetchStaffs}
        />
      </MainDrawer>

      <TableBody>
        {staffs.map((staff) => (
          <TableRow key={staff?.uuid}>
            <TableCell>
              <div className="flex items-center">
                
                <div>
                  <h2 className="text-sm font-medium">{staff?.name || "N/A"}</h2> {/* Safeguard for name */}
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{staff?.email || "N/A"}</span> {/* Safeguard for email */}
            </TableCell>
            <TableCell>
              <span className="text-sm">{staff?.phoneNumber || "N/A"}</span> {/* Safeguard for phone number */}
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {staff?.joiningDate ? showDateFormat(staff.joiningDate) : "N/A"} {/* Safeguard for joining date */}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{staff?.role || "N/A"}</span> {/* Safeguard for role */}
            </TableCell>

            <TableCell className="text-center">
              <ActiveInActiveButton
                id={staff?.uuid}
                staff={staff}
                option="staff"
                status={staff?.status || "inactive"} // Safeguard for status
              />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={staff?.uuid}
                staff={staff}
                handleUpdate={() => handleEdit(staff?.uuid)}
                isSubmitting={isSubmitting}
                handleModalOpen={() => handleDeleteClick(staff)}
                handleResetPassword={handleResetPassword}
                title={showingTranslateValue(staff?.name || "N/A")} // Safeguard for name in the translated value
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;
