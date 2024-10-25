import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

// Internal imports
import OrderServices from "@/services/OrderServices";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";

const SelectStatus = ({ uuid, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);

  const handleChangeStatus = (uuid, status) => {
    OrderServices.updateOrder(uuid, { status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  return (
    <Select
      onChange={(e) => handleChangeStatus(uuid, e.target.value)}
      className="h-8"
    >
      <option value="status" defaultValue hidden>
        {order?.status}
      </option>
      <option value="delivered" defaultValue={order?.status === "Delivered"}>
        Delivered
      </option>
      <option value="pending" defaultValue={order?.status === "Pending"}>
        Pending
      </option>
      <option value="processing" defaultValue={order?.status === "Processing"}>
        Processing
      </option>
      <option value="cancel" defaultValue={order?.status === "Cancel"}>
        Cancel
      </option>
    </Select>
  );
};

export default SelectStatus;
