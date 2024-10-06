import React, { useState, useEffect } from 'react';
import { Scrollbars } from "react-custom-scrollbars-2";
import { t } from "i18next";
import { Input } from '@windmill/react-ui';
import LabelArea from '@/components/form/selectOption/LabelArea';
import useCouponSubmit from "@/hooks/useCouponSubmit";
import Error from '@/components/form/others/Error';
import DrawerButton from '@/components/form/button/DrawerButton';
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Title from "@/components/form/others/Title";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CouponDrawer = ({ id }) => {
  const {
    register,
    onSubmit,
    setImageUrl,
    imageUrl,
    published,
    setPublished,
    currency,
    discountType,
    setDiscountType,
    isSubmitting,
    handleSelectLanguage,
  } = useCouponSubmit(id);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [coupons, setCoupons] = useState([]); 
  const [editingCoupon, setEditingCoupon] = useState(null);

  const validateForm = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'Coupon name is required.';
    if (!code) newErrors.code = 'Coupon code is required.';
    if (!discount || discount <= 0 || discount > 100) newErrors.discount = 'Discount must be between 1 and 100.';
    if (!expiryDate) newErrors.expiryDate = 'Expiry date is required.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const couponData = {
        name,
        code,
        discount,
        expiryDate,
        isPublished,
      };

      try {
        setLoading(true);
        let response;
        if (editingCoupon) {
          response = await fetch(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-update/coupon/${editingCoupon.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(couponData),
          });
        } else {
          response = await fetch('https://suft-90bec7a20f24.herokuapp.com/coupon/admin-create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(couponData),
          });
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to submit coupon. Server responded with: ${errorText}`);
        }

        resetForm();
        toast.success(editingCoupon ? 'Coupon updated successfully!' : 'Coupon created successfully!');
      } catch (error) {
        console.error('Error submitting coupon:', error);
        setErrors({ api: error.message });
        toast.error('Failed to submit the coupon. Please try again.'); 
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setCode('');
    setDiscount('');
    setExpiryDate('');
    setIsPublished(true);
    setErrors({});
    setEditingCoupon(null);
  };

  
  const editCoupon = async (coupon) => {
    setEditingCoupon(coupon);
    try {
      const response = await fetch(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-update/coupon/${coupon.id}`);
      if (response.ok) {
        const data = await response.json();
        setName(data.name);
        setCode(data.code);
        setDiscount(data.discount);
        setExpiryDate(data.expiryDate);
        setIsPublished(data.isPublished);
      } else {
        toast.error('Failed to fetch coupon details.'); 
      }
    } catch (error) {
      console.error('Error fetching coupon details:', error);
      toast.error('Error occurred while fetching the coupon details.');
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded shadow-md">
      {/* <ToastContainer/> */}
    
      {id ? (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("UpdateCoupon")}
            description={t("UpdateCouponDescription")}
          />
        ) : (
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={t("AddCoupon")}
            description={t("AddCouponDescription")}
          />
        )}
 
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <LabelArea label="Coupon Name" />
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter coupon name"
            className={`border rounded-md p-2 w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.name && <Error errorName={errors.name} />}
        </div>

        <div className="mb-4">
          <LabelArea label="Coupon Code" />
          <Input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Enter coupon code"
            className={`border rounded-md p-2 w-full ${errors.code ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.code && <Error errorName={errors.code} />}
        </div>

        <div className="mb-4">
          <LabelArea label="Discount Percentage" />
          <div className="relative flex items-center">
            <span className="absolute p-2 text-gray-500 font-semibold">%</span>
            <div className="absolute h-full left-2 border-l border-gray-300"></div>
            <Input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Enter discount percentage (1-100)"
              className={`border rounded-md p-2 pl-10 w-full ${errors.discount ? 'border-red-500' : 'border-gray-300'}`}
            />
          </div>
          {errors.discount && <Error errorName={errors.discount} />}
        </div>

        <div className="mb-4">
          <LabelArea label="Expiry Date" />
          <Input
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            className={`border rounded-md p-2 w-full ${errors.expiryDate ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.expiryDate && <Error errorName={errors.expiryDate} />}
        </div>

        <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
          <LabelArea label={t("Published")} />
          <div className="col-span-8 sm:col-span-4">
            <SwitchToggle
              handleProcess={setPublished}
              processOption={published}
            />
            {errors.productType && <Error errorName={errors.productType} />}
          </div>
        </div>

        <DrawerButton id={id} title="Coupon" />
      </form>
      
    </div>
  );
};

export default CouponDrawer;
