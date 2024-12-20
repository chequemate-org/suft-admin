import axios from "axios";
import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

// Internal imports
import useUtilsFunction from "@/hooks/useUtilsFunction";
import CheckBox from "@/components/form/others/CheckBox";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import DeleteModal from "@/components/modal/DeleteModal";
import MainDrawer from "@/components/drawer/MainDrawer";
import CouponDrawer from "@/components/drawer/CouponDrawer";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const CouponTable = ({ coupons, isCheck, setIsCheck, fetchCoupons }) => {
  const [updatedCoupons, setUpdatedCoupons] = useState([]); // For date conversion
  const [selectedCoupon, setSelectedCoupon] = useState(null); // For editing
  const [selectedCouponForDelete, setSelectedCouponForDelete] = useState(null);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { globalSetting, showingTranslateValue } = useUtilsFunction();

  // Handle the edit button click
  useEffect(() => {
    const couponArray = Array.isArray(coupons) ? coupons : [];
    const result = couponArray.map((coupon) => {
      const updatedDate = new Date(coupon?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      return {
        ...coupon,
        updatedDate,
      };
    });
    setUpdatedCoupons(result);
  }, [coupons, globalSetting?.default_time_zone]); // Ensure to react to coupons prop changes

  const handleEdit = async (uuid) => {
    await fetchCouponByUUID(uuid);
    handleUpdate(uuid); // Open the drawer for editing
  };

  const handleDeleteClick = (coupon) => {
    setSelectedCouponForDelete(coupon); // Set the selected coupon (name and uuid)
    handleModalOpen(); // Open the delete modal
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck((prevCheck) => [...prevCheck, id]);
    } else {
      setIsCheck((prevCheck) => prevCheck.filter((item) => item !== id));
    }
  };

  // Fetch coupon by UUID
  const fetchCouponByUUID = async (uuid) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/coupon/admin-coupon/${uuid}`,
      );
      if (response.data) {
        setSelectedCoupon(response.data); // Set coupon to state for drawer
      }
    } catch (error) {
      console.error("Error fetching coupon by UUID:", error);
    }
  };

  // Handle deletion of coupon
  const handleDelete = async (uuid) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_BASE_URL}/coupon/admin-delete/coupon/${uuid}`,
      );
      fetchCoupons(); // Refresh the coupons after deletion
    } catch (error) {
      console.error("Error deleting coupon:", error);
    }
  };

  return (
    <>
      {selectedCouponForDelete && (
        <DeleteModal
          id={selectedCouponForDelete.uuid}
          title={selectedCouponForDelete.name} // Include coupon name in the title
          onDelete={() => handleDelete(selectedCouponForDelete.uuid)} // Handle actual deletion
        />
      )}
      <MainDrawer>
        <CouponDrawer
          id={serviceId}
          coupon={selectedCoupon}
          fetchCoupons={fetchCoupons}
        />
      </MainDrawer>
      
      <TableBody>
        {updatedCoupons?.length > 0 ? (
          updatedCoupons.map((coupon) => (
            <TableRow key={coupon.uuid}>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name={coupon.name}
                  id={coupon.uuid}
                  handleClick={handleClick}
                  isChecked={isCheck?.includes(coupon.uuid)}
                />
              </TableCell>

              <TableCell>
                <div className="flex items-center">
                  {coupon?.logo ? (
                    <Avatar
                      className="md:block bg-gray-50 hidden p-1 mr-2 shadow-none"
                      src={coupon?.logo}
                      alt="coupon"
                    />
                  ) : (
                    <Avatar
                      src={`https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png`}
                      alt="coupon"
                    />
                  )}
                  <div>
                    <span className="text-sm">{coupon.name}</span>
                  </div>
                </div>
              </TableCell>

              <TableCell>
                <span className="text-sm">{coupon.code}</span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-semibold">{coupon.discount}</span>
              </TableCell>

              {/* <TableCell className="text-center">
                <ShowHideButton id={coupon.id} status={coupon.status} />
              </TableCell> */}

              <TableCell>
                <span className="text-sm">{coupon.expiryDate}</span>
              </TableCell>

              <TableCell className="align-middle">
                {dayjs().isAfter(dayjs(coupon.expiryDate)) ? (
                  <Badge type="danger">Expired</Badge>
                ) : (
                  <Badge type="success">Active</Badge>
                )}
              </TableCell>

              <TableCell>
                <EditDeleteButton
                  id={coupon.uuid}
                  isCheck={isCheck}
                  handleUpdate={() => handleEdit(coupon.uuid)}
                  handleModalOpen={() => handleDeleteClick(coupon)}
                  title={showingTranslateValue(coupon.name)}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No coupons available
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default CouponTable;
