import { Avatar, TableBody, TableCell, TableRow } from "@windmill/react-ui";
import React from "react";

// Internal imports
import Status from "@/components/table/Status";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import MainDrawer from "@/components/drawer/MainDrawer";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import StaffDrawer from "@/components/drawer/StaffDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ActiveInActiveButton from "@/components/table/ActiveInActiveButton";

const StaffTable = ({ staffs = [], lang }) => {
  const {
    title,
    serviceId,
    handleModalOpen,
    handleUpdate,
    isSubmitting,
    handleResetPassword,
  } = useToggleDrawer();

  const { showDateFormat, showingTranslateValue } = useUtilsFunction();

  // Ensure staffs is always an array
  if (!Array.isArray(staffs)) {
    return <p>No staff data available.</p>;
  }

  return (
    <>
      <DeleteModal id={serviceId} title={title} />

      <MainDrawer>
        <StaffDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {staffs.map((staff) => (
          <TableRow key={staff.uuid}>
            <TableCell>
              <div className="flex items-center">
                <Avatar
                  className="hidden mr-3 md:block bg-gray-50"
                  src={staff.image || "/default-avatar.png"} // Fallback to a default image if staff.image is null
                  alt="staff"
                />
                <div>
                  <h2 className="text-sm font-medium">
                    {showingTranslateValue(staff?.name)}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">{staff.email}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm ">{staff.phone}</span>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {showDateFormat(staff.createdAt)} {/* Use createdAt as the joining date */}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-semibold">{staff?.role}</span>
            </TableCell>
            <TableCell className="text-center text-xs">
              <Status status={staff.status} />
            </TableCell>

            <TableCell className="text-center">
              <ActiveInActiveButton
                id={staff?.uuid}
                staff={staff}
                option="staff"
                status={staff.status}
              />
            </TableCell>

            <TableCell>
              <EditDeleteButton
                id={staff.uuid}
                staff={staff}
                isSubmitting={isSubmitting}
                handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                handleResetPassword={handleResetPassword}
                title={showingTranslateValue(staff?.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default StaffTable;
