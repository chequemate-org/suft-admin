// SelectStatus.js
import React, { useContext } from "react";
import { Select } from "@windmill/react-ui";

import OrderServices from "@/services/OrderServices";
import { notifySuccess, notifyError } from "@/utils/toast";
import { SidebarContext } from "@/context/SidebarContext";

const SelectStatus = ({ id, order }) => {
  const { setIsUpdate } = useContext(SidebarContext);

  const handleChangeStatus = (id, status) => {
    OrderServices.updateOrder(id, { status })
      .then((res) => {
        notifySuccess(res.message);
        setIsUpdate(true);
      })
      .catch((err) => notifyError(err.message));
  };

  return (
    <Select onChange={(e) => handleChangeStatus(id, e.target.value)} className="h-8">
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