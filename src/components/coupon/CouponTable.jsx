import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

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
  const [updatedCoupons, setUpdatedCoupons] = useState([]);
  const [selectedCoupon, setSelectedCoupon] = useState(null); // State for selected coupon to edit

  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { currency, showDateFormat, globalSetting, showingTranslateValue } = useUtilsFunction();

  const handleClick = (e) => {
    const { id, checked } = e.target;
    if (checked) {
      setIsCheck((prev) => [...prev, id]);
    } else {
      setIsCheck((prev) => prev.filter((item) => item !== id));
    }
  };

  // Fetch all coupons
  const fetchCoupons = async () => {
    try {
      const response = await axios.get('https://suft-90bec7a20f24.herokuapp.com/coupon/admin-all-coupons');
      console.log('Fetched coupons:', response.data);

      if (Array.isArray(response.data.data)) {
        setCoupons(response.data.data);  // Set coupons from response.data.data
      } else {
        console.error('Coupons data is not an array:', response.data);
        setCoupons([]);  // Reset coupons to an empty array if data is invalid
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setCoupons([]);  // Reset coupons to an empty array on error
    }
  };

  // Fetch single coupon by ID for editing
  const fetchCouponById = async (id) => {
    try {
      const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/coupon/${id}`);
      if (response.data) {
        setSelectedCoupon(response.data); // Set the selected coupon details
        console.log('Fetched coupon for editing:', response.data);
      }
    } catch (error) {
      console.error('Error fetching coupon by ID:', error);
    }
  };

  // Handle the edit button click
  const handleEdit = async (id) => {
    await fetchCouponById(id);  // Fetch coupon details by ID
    handleUpdate(id);  // Open the drawer with coupon details
  };

  useEffect(() => {
    fetchCoupons();  // Call fetchCoupons on component mount
  }, []);

  useEffect(() => {
    const result = Array.isArray(coupons) ? coupons.map((el) => {
      const newDate = new Date(el?.updatedAt).toLocaleString("en-US", {
        timeZone: globalSetting?.default_time_zone,
      });
      return {
        ...el,
        updatedDate: newDate,
      };
    }) : [];  // Return an empty array if coupons is not an array

    setUpdatedCoupons(result);
  }, [coupons, globalSetting?.default_time_zone]);
  const deleteCoupon = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to delete this coupon?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`https://suft-90bec7a20f24.herokuapp.com/coupon/${id}`);
    // Fetch coupons again to refresh the list after deletion
    fetchCoupons(); 
  } catch (error) {
    console.error('Error deleting coupon:', error);
  }
};

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} />}
      {isCheck.length < 2 && (
        <MainDrawer>
          <CouponDrawer id={serviceId} coupon={selectedCoupon} /> {/* Pass selectedCoupon data to CouponDrawer */}
        </MainDrawer>
      )}

      <TableBody>
        {Array.isArray(updatedCoupons) && updatedCoupons.length > 0 ? (
          updatedCoupons.map((coupon) => (
            <TableRow key={coupon.id}>
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name={coupon.name}
                  id={coupon.id}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(coupon.id)}
                />
              </TableCell>

              <TableCell>
                <span className="text-sm">{coupon.name}</span>
              </TableCell>
              <TableCell>
                <span className="text-sm">{coupon.code}</span>
              </TableCell>

              <TableCell>
                <span className="text-sm font-semibold">
                  {coupon.discount}
                </span>
              </TableCell>

              <TableCell className="text-center">
                <ShowHideButton id={coupon.id} status={coupon.status} />
              </TableCell>

              <TableCell>
                <span className="text-sm">
                  {showDateFormat(coupon.expiryDate)}
                </span>
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
                  id={coupon.id}
                  isCheck={isCheck}
                  handleUpdate={() => handleEdit(coupon.id)}  // Handle edit button click
                  handleModalOpen={handleModalOpen}
                  title={showingTranslateValue(coupon.name)}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={9} className="text-center">No coupons available</TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default CouponTable;
