import React, { useState, useEffect } from "react";
import { Input } from "@windmill/react-ui";
import LabelArea from "@/components/form/selectOption/LabelArea";
import useCouponSubmit from "@/hooks/useCouponSubmit";
import Error from "@/components/form/others/Error";
import DrawerButton from "@/components/form/button/DrawerButton";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import Title from "@/components/form/others/Title";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputValue from "@/components/form/input/InputValue";

const CouponDrawer = ({ id, coupon, fetchCoupons }) => {
  const { t } = useTranslation();
  const { register, handleSelectLanguage } = useCouponSubmit(id);

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
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
    if (!name) newErrors.name = "Coupon name is required.";
    if (!code) newErrors.code = "Coupon code is required.";
    
    if (!discount || isNaN(discount) || discount > 100)
      newErrors.discount = "Discount must be between 1 and 100.";
    if (!expiryDate) newErrors.expiryDate = "Expiry date is required.";
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
          response = await fetch(
            `https://suft-90bec7a20f24.herokuapp.com/coupon/admin-update/coupon/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(couponData),
            }
          );
        } else {
          // POST request to create a new coupon
          response = await fetch(
            "https://suft-90bec7a20f24.herokuapp.com/coupon/admin-create",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(couponData),
            }
          );
        }

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `Failed to submit coupon. Server responded with: ${errorText}`
          );
        }

        resetForm();
        toast.success(
          id ? "Coupon updated successfully!" : "Coupon created successfully!"
        );
        fetchCoupons(); // Refetch coupons after submission
      } catch (error) {
        console.error("Error submitting coupon:", error.message);
        setErrors({ api: error.message });
        toast.error("Failed to submit the coupon. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setDiscount("");
    setExpiryDate("");
    setIsPublished(true);
    setErrors({});
  };

  return (
    <div>
      <>
        <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
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
        </div>
        <form onSubmit={handleSubmit} className="p-6 rounded-lg">
          <div className="grid grid-cols-6 gap-3 mb-6">
            <LabelArea label="Coupon Name" />
            <div className="sm:col-span-4 col-span-8">
              <div className="">
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter coupon name"
                  className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
                />
                {errors.name && (
                  <span className="mt-2 text-sm text-red-400">Name is required.</span>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-6 gap-3 mb-6">
            <LabelArea label="Coupon Code" />
            <div className="sm:col-span-4 col-span-8">
              <Input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter coupon code"
                className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
              />
              {errors.code && (
                <span className="mt-2 text-sm text-red-400">Coupon code is required.</span>
              )}
            </div>

            
          </div>

          <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-6">
            <LabelArea label="Discount" />
            <div className="sm:col-span-4 relative col-span-8">
              <div className="absolute left-0 flex items-center py-3 pl-3 pointer-events-none">
                <span className="text-gray-500 text-[15px]">%</span>
              </div>
              <input
                type="number"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="Enter discount"
                className="focus:bg-white block w-full h-12 px-10 py-2 bg-gray-100 border border-gray-200 rounded-md outline-none"
                min="1"
                max="100"
              />
              <div className="left-2 absolute inset-y-0 flex items-center h-12 border-l border-gray-300 pointer-events-none"></div>
              {errors.discount && (
                <span className="mt-2 text-sm text-red-400">Discount is required.</span>
              )}
            </div>
            
          </div>

          <div className="grid grid-cols-6 gap-3 mb-6">
            <LabelArea label="Expiry Date" />
            <div className="sm:col-span-4 col-span-8">
              <Input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
              />
              {errors.expiryDate && (
                <span className="mt-2 text-sm text-red-400">Discount is required.</span>
              )}
            </div>

          
          </div>

          <div className="md:gap-5 xl:gap-6 lg:gap-6 grid grid-cols-6 gap-3 mb-[10rem]">
            <LabelArea label={t("Published")} />
            <div className="sm:col-span-4 col-span-8">
              <SwitchToggle
                handleProcess={setIsPublished}
                processOption={isPublished}
              />
            </div>
          </div>

          <DrawerButton id={id} title="Coupon" isSubmitting={loading}/>
        </form>
      </>
    </div>
  );
};

export default CouponDrawer;
