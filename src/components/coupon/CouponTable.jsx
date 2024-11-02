
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

const CouponTable = ({ isCheck, setIsCheck }) => {
  const [coupons, setCoupons] = useState([]); // State for all coupons
  const [updatedCoupons, setUpdatedCoupons] = useState([]); // For date conversion
  const [selectedCoupon, setSelectedCoupon] = useState(null); // For editing
  const [selectedCouponForDelete, setSelectedCouponForDelete] = useState(null);

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { currency, showDateFormat, globalSetting, showingTranslateValue } =
    useUtilsFunction();

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/coupon/admin-all-coupons`
      );
      console.log("Fetched coupons:", response.data);

      if (Array.isArray(response.data.data)) {
        setCoupons(response.data.data);
      } else {
        console.error("Coupons data is not an array:", response.data);
        setCoupons([]);
      }
    } catch (error) {
      console.error("Error fetching coupons:", error);
      setCoupons([]);
    }
  };

  const fetchCouponByUUID = async (uuid) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/coupon/admin-coupon/${uuid}`
      );
      if (response.data) {
        setSelectedCoupon(response.data);
        console.log("Fetched coupon for editing by UUID:", response.data);
      }
    } catch (error) {
      console.error("Error fetching coupon by UUID:", error);
    }
  };

  const handleEdit = async (uuid) => {
    await fetchCouponByUUID(uuid);
    handleUpdate(uuid);
  };

  const handleDeleteClick = (coupon) => {
    setSelectedCouponForDelete(coupon);
    handleModalOpen();
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck((prevCheck) => [...prevCheck, id]);
    } else {
      setIsCheck((prevCheck) => prevCheck.filter((item) => item !== id));
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  useEffect(() => {
    const result = coupons.map((coupon) => {
      const updatedDate = new Date(coupon?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      return {
        ...coupon,
        updatedDate,
      };
    });
    setUpdatedCoupons(result);
  }, [coupons, globalSetting?.default_time_zone]);

  return (
    <>
      {selectedCouponForDelete && (
        <DeleteModal
          id={selectedCouponForDelete.uuid}
          title={selectedCouponForDelete.name}
          onDelete={() => handleDelete(selectedCouponForDelete.uuid)}
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
        {updatedCoupons?.map((coupon, i) => (
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

            <TableCell className="text-center">
              <ShowHideButton id={coupon.id} status={coupon.status} />
            </TableCell>

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
                handleUpdate={() => handleEdit(coupon.uuid, coupon.name)}
                handleModalOpen={() => handleDeleteClick(coupon)}
                title={showingTranslateValue(coupon.name)}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CouponTable;
