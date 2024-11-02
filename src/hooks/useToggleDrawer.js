import { useContext, useEffect, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";

const useToggleDrawer = () => {
  const [serviceId, setServiceId] = useState("");
  const [allId, setAllId] = useState([]);
  const [title, setTitle] = useState("");
  const [staffDetails, setStaffDetails] = useState(null);
  const { toggleDrawer, isDrawerOpen, toggleModal, toggleBulkDrawer } =
    useContext(SidebarContext);

  // const handleUpdate = (uuid) => {
  //   setServiceId(uuid);
  //   toggleDrawer();
  // };
  const handleUpdate = (id, staffData = null) => {
    setServiceId(id);
    setStaffDetails(staffData);  // Store staff data
    toggleDrawer();
  };


  const handleUpdateMany = (id) => {
    setAllId(id);
    toggleBulkDrawer();
  };

  const handleModalOpen = (uuid, title) => {
    setServiceId(uuid);
    toggleModal();
    setTitle(title);
  };

  useEffect(() => {
    if (!isDrawerOpen) {
      setServiceId();
      setStaffDetails(null)
    }
  }, [isDrawerOpen]);

  const handleDeleteMany = async (id, products) => {
    setAllId(id);
    toggleModal();
    setTitle("Selected Products");
  };

  return {
    title,
    allId,
    serviceId,
    handleUpdate,
    setServiceId,
    handleModalOpen,
    handleDeleteMany,
    handleUpdateMany,
    setStaffDetails,
    staffDetails,  
  };
};

export default useToggleDrawer;
