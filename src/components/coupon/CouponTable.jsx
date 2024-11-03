import React from "react";
import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import dayjs from "dayjs";
import CheckBox from "@/components/form/others/CheckBox";
import ShowHideButton from "@/components/table/ShowHideButton";
import EditDeleteButton from "@/components/table/EditDeleteButton";

const CouponTable = ({ lang, isCheck, coupons, setIsCheck }) => {
  // Log the coupons received
  console.log("Coupons passed to CouponTable:", coupons);
  console.log("Coupons Type:", typeof coupons);
  console.log("Is Coupons an Array?", Array.isArray(coupons));

  // Check if coupons is an array
  if (!Array.isArray(coupons)) {
    return (
      <tbody>
        <tr>
          <td colSpan="8" className="text-center text-red-500">
            Invalid coupon data.
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <TableBody>
      {coupons.map((coupon) => (
        <TableRow key={coupon._id}>
          <TableCell>
            <CheckBox
              type="checkbox"
              name={coupon.name}
              id={coupon._id}
              handleClick={(e) => {
                const { id, checked } = e.target;
                if (checked) {
                  setIsCheck((prevCheck) => [...prevCheck, id]);
                } else {
                  setIsCheck((prevCheck) =>
                    prevCheck.filter((item) => item !== id)
                  );
                }
              }}
              isChecked={isCheck.includes(coupon._id)}
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

          <TableCell>
            {dayjs().isAfter(dayjs(coupon.expiryDate)) ? (
              <Badge type="danger">Expired</Badge>
            ) : (
              <Badge type="success">Active</Badge>
            )}
          </TableCell>

          <TableCell>
            <EditDeleteButton
              id={coupon._id}
              isCheck={isCheck}
              handleUpdate={() => console.log(`Edit ${coupon.name}`)}
              handleModalOpen={() => console.log(`Delete ${coupon.name}`)}
              title={coupon.name}
            />
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  );
};

export default CouponTable;
