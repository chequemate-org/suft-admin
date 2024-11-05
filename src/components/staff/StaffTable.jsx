

import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React, { useState, useEffect } from "react";
import axios from "axios";

// Internal imports
import Status from "@/components/table/Status";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import MainDrawer from "@/components/drawer/MainDrawer";
import useToggleDrawer from "@/hooks/useToggleDrawer";
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

  const fetchStaffs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/admin/all-staff`
      );

      console.log("Fetched staff data:", response.data);

      if (Array.isArray(response.data.data.data)) {
        setStaffs(response.data.data.data);
      } else {
        console.error("Staff data is not an array:", response.data);
        setStaffs([]);
      }
    } catch (error) {
      console.error("Error fetching staff data:", error);
      setStaffs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffs();
  }, []);

  if (loading) {
    return <p>Loading staff data...</p>;
  }

  if (!Array.isArray(staffs) || staffs.length === 0) {
    return <p>No staff data available.</p>;
  }

  const fetchStaffByUUID = async (uuid) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/admin/staff/${uuid}`
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
    await fetchStaffByUUID(uuid);
    handleUpdate(uuid);
  };

  const handleDeleteClick = (staff) => {
    setSelectedStaffForDelete(staff);
    handleModalOpen();
  };

  return (
    <>
      {selectedStaffForDelete && (
        <DeleteModal
          id={selectedStaffForDelete.uuid}
          title={selectedStaffForDelete.name}
          onDelete={() => handleDelete(selectedStaffForDelete.uuid)}
        />
      )}

      <MainDrawer>
        <StaffDrawer
          id={serviceId}
          staff={selectedStaff}
          fetchStaffs={fetchStaffs}
        />
      </MainDrawer>

      <TableBody>
        {staffs.map((staff) => (
          <TableRow key={staff?.uuid}>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50"
                  src={staff.image}
                  alt="staff"
                />

                <div>
                  <h2 className="text-sm font-medium">
                    {staff?.name || "N/A"}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{staff?.email || "N/A"}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{staff?.phoneNumber || "N/A"}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {staff?.joiningDate ? showDateFormat(staff.joiningDate) : "N/A"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{staff?.role || "N/A"}</span>
            </TableCell>

            {/* <TableCell className="text-center">
              <ActiveInActiveButton
                id={staff?.uuid}
                staff={staff}
                option="staff"
                status={staff?.status || "inactive"}
              />
            </TableCell> */}

            <TableCell>
              <EditDeleteButton
                id={staff?.uuid}
                staff={staff}
                handleUpdate={() => handleEdit(staff?.uuid, staff.name)}
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
