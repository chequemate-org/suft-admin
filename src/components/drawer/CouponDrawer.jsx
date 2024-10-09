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
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const CouponDrawer = ({ id, coupon, fetchCoupons }) => {
  const { t } = useTranslation();
  const {
    isSubmitting,
    register,
    handleSelectLanguage,
  } = useCouponSubmit(id);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch the coupon data by ID
  useEffect(() => {
    if (id && coupon) {
      setName(coupon.data.name);
      setCode(coupon.data.code);
      setDiscount(coupon.data.discount);
      setExpiryDate(coupon.data.expiryDate);
      setIsPublished(coupon.data.isPublished);
    } else {
      resetForm();
    }
  }, [id, coupon]);

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
  
        if (id) {
          // PUT request to update the coupon by ID
          response = await fetch(`https://suft-90bec7a20f24.herokuapp.com/coupon/admin-update/coupon/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(couponData),
          });
        } else {
          // POST request to create a new coupon
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
        toast.success(id ? 'Coupon updated successfully!' : 'Coupon created successfully!');
        fetchCoupons(); // Refetch coupons after submission
      } catch (error) {
        console.error('Error submitting coupon:', error.message);
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
  };
  

  
  return (
    <div className="bg-gray-50 p-6 rounded shadow-md">
      {loading ? (
        <p>Loading coupon data...</p>
      ) : (
        <>
          <Title
            register={register}
            handleSelectLanguage={handleSelectLanguage}
            title={id ? t("UpdateCoupon") : t("AddCoupon")}
            description={id ? t("UpdateCouponDescription") : t("AddCouponDescription")}
          />
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
                <span className="absolute p-2 font-semibold text-gray-500">%</span>
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

            <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
              <LabelArea label={t("Published")} />
              <div className="sm:col-span-4 col-span-8">
                <SwitchToggle
                  handleProcess={setIsPublished}
                  processOption={isPublished}
                />
                {errors.productType && <Error errorName={errors.productType} />}
              </div>
            </div>

            {/* <DrawerButton id={id} title="Coupon" /> */}
            <DrawerButton id={id} title="Coupon" isSubmitting={isSubmitting} />
          </form>
        </>
      )}
    </div>
  );
};

export default CouponDrawer;
