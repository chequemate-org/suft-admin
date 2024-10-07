import React, { useEffect } from "react";
import Scrollbars from "react-custom-scrollbars-2";
import Title from "@/components/form/others/Title";
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import DrawerButton from "@/components/form/button/DrawerButton";
import axios from "axios";
import { useForm } from "react-hook-form";

const CustomerDrawer = ({ id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  // Fetch customer data when id is provided
  useEffect(() => {
    const fetchCustomerData = async () => {
      if (id) {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users/${id}`
          );
          const customerData = response.data.data; // Adjust based on your API response structure

          // Populate the form fields with fetched data
          setValue("name", customerData.name || "");
          setValue("email", customerData.email || "");
          setValue("password", ""); // Password can be left empty for updates
          setValue("phone", customerData.phone || "");
          setValue("dob", customerData.dob || ""); // Ensure the API returns dob if applicable
          setValue("country", customerData.country || ""); // Ensure the API returns country if applicable
        } catch (error) {
          console.error("Failed to fetch customer data", error);
        }
      }
    };

    fetchCustomerData();
  }, [id, setValue]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        // Update customer data
        await axios.put(
          `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users/${id}`,
          data
        );
        console.log("Customer updated successfully");
      } else {
        // Create a new customer
        await axios.post(
          `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users`,
          data
        );
        console.log("Customer created successfully");
      }
    } catch (error) {
      console.error("Failed to submit customer data", error);
    }
  };

  return (
    <>
      <div className="w-full relative p-6 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
        {id ? (
          <Title
            title={"Update Customer"}
            description={"Update your Customer necessary information from here"}
          />
        ) : (
          <Title
            title={"Add Customer"}
            description={"Add your Customer necessary information from here"}
          />
        )}
      </div>

      <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40">
            {/* Name Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Name"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder={"Name"}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Error errorName={errors.name} />
              </div>
            </div>

            {/* Email Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Email"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder={"Email"}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Error errorName={errors.email} />
              </div>
            </div>

            {/* Password Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Password (leave empty to keep current)"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Password"
                  name="password"
                  type="password"
                  placeholder={"Password"}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Error errorName={errors.password} />
              </div>
            </div>

            {/* Phone Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Phone"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  register={register}
                  label="Phone"
                  name="phone"
                  type="text"
                  placeholder={"Phone"}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Error errorName={errors.phone} />
              </div>
            </div>

            {/* Date of Birth Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Date of Birth"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Error errorName={errors.dob} />
              </div>
            </div>

            {/* Country Input */}
            <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
              <LabelArea label={"Country"} />
              <div className="col-span-8 sm:col-span-4">
                <InputArea
                  required={true}
                  register={register}
                  label="Country"
                  name="country"
                  type="text"
                  placeholder={"Country"}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
                />
                <Error errorName={errors.country} />
              </div>
            </div>
          </div>

          <DrawerButton id={id} title="Customer" isSubmitting={isSubmitting} />
        </form>
      </Scrollbars>
    </>
  );
};

export default CustomerDrawer;
