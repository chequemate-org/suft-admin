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
        setCoupons(response.data.data); 
        setCoupons(response.data.data); 
      } else {
        console.error('Coupons data is not an array:', response.data);
        setCoupons([]); 
        setCoupons([]); 
      }
    } catch (error) {
      console.error('Error fetching coupons:', error);
      setCoupons([]); 
      setCoupons([]); 
    }
  };

  // Fetch coupon by UUID
  const fetchCouponByUUID = async (uuid) => {
  // Fetch coupon by UUID
  const fetchCouponByUUID = async (uuid) => {
    try {
      const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-coupon/${uuid}`);
      const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-coupon/${uuid}`);
      if (response.data) {
        setSelectedCoupon(response.data); // Set coupon to state for drawer
        console.log('Fetched coupon for editing by UUID:', response.data);
        setSelectedCoupon(response.data); // Set coupon to state for drawer
        console.log('Fetched coupon for editing by UUID:', response.data);
      }
    } catch (error) {
      console.error('Error fetching coupon by UUID:', error);
      console.error('Error fetching coupon by UUID:', error);
    }
  };

  // Handle the edit button click
  const handleEdit = async (uuid) => {
    await fetchCouponByUUID(uuid); // Fetch coupon by UUID when edit button is clicked
    handleUpdate(uuid);  // Open drawer for editing
  const handleEdit = async (uuid) => {
    await fetchCouponByUUID(uuid); // Fetch coupon by UUID when edit button is clicked
    handleUpdate(uuid);  // Open drawer for editing
  };

  useEffect(() => {
    fetchCoupons();  // Fetch all coupons on component load
    fetchCoupons();  // Fetch all coupons on component load
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
    }) : [];  
    }) : [];  

    setUpdatedCoupons(result);
  }, [coupons, globalSetting?.default_time_zone]);

  

  

  return (
    <>
      {isCheck.length < 1 && <DeleteModal id={serviceId} title={title} setIsCheck={setIsCheck}  />}
      {isCheck.length < 2 && (
        <MainDrawer>
          <CouponDrawer 
            id={serviceId} 
            coupon={selectedCoupon} 
            fetchCoupons={fetchCoupons} 
          />
          <CouponDrawer 
            id={serviceId} 
            coupon={selectedCoupon} 
            fetchCoupons={fetchCoupons} 
          />
        </MainDrawer>
      )}

      <TableBody>
        {Array.isArray(updatedCoupons) && updatedCoupons.length > 0 ? (
          updatedCoupons.map((coupon) => (
            <TableRow key={coupon.uuid}>  
              <TableCell>
                <CheckBox
                  type="checkbox"
                  name={coupon.name}
                  uuid={coupon.uuid}
                  uuid={coupon.uuid}
                  handleClick={handleClick}
                  isChecked={isCheck.includes(coupon.uuid)}
                  isChecked={isCheck.includes(coupon.uuid)}
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
                  id={coupon.uuid}  // Use uuid here
                  id={coupon.uuid}  // Use uuid here
                  isCheck={isCheck}
                  handleUpdate={() => handleEdit(coupon.uuid)}  // Handle edit button click with UUID
                  handleUpdate={() => handleEdit(coupon.uuid)}  // Handle edit button click with UUID
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
