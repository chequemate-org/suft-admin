import { TableBody, TableCell, TableRow } from "@windmill/react-ui";
import dayjs from "dayjs";
import { t } from "i18next";
import React from "react";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";

// Internal imports
import MainDrawer from "@/components/drawer/MainDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import Tooltip from "@/components/tooltip/Tooltip";
import CustomerDrawer from "@/components/drawer/CustomerDrawer";
import EditDeleteButton from "@/components/table/EditDeleteButton";

// Component
const CustomerTable = ({ customers, fetchCustomers }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();

  if (!customers || customers.length === 0) {
    return (
      <tr>
        <td colSpan="6" className="text-center py-4">
          No customers available.
        </td>
      </tr>
    );
  }

  return (
    <>
      <DeleteModal id={serviceId} title={title} />
      <MainDrawer>
        <CustomerDrawer id={serviceId} />
      </MainDrawer>

      <TableBody>
        {customers?.map((customer) => (
          <TableRow key={customer.uuid}>
            <TableCell>
              <span className="text-xs font-semibold uppercase">
                {customer.uuid?.substring(0, 4) || "N/A"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">
                {dayjs(customer.createdAt).format("MMM D, YYYY") || "Unknown"}
              </span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{customer.name || "No Name"}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm">{customer.email || "No Email"}</span>
            </TableCell>
            <TableCell>
              <span className="text-sm font-medium">{customer.phone || "No Phone"}</span>
            </TableCell>

            <TableCell>
              <div className="flex justify-end text-right">
                <div className="hover:text-emerald-600 p-2 text-gray-400 cursor-pointer">
                  <Link to={`/customer-order/${customer.uuid}`}>
                    <Tooltip
                      id="view"
                      Icon={FiZoomIn}
                      title={t("ViewOrder")}
                      bgColor="#34D399"
                    />
                  </Link>
                </div>

                <EditDeleteButton
                  title={customer.name}
                  id={customer.uuid}
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

