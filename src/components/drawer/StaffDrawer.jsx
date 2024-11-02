import React, { useState, useEffect } from "react";
import { Input } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";

// Internal imports
import Error from "@/components/form/others/Error";
import Title from "@/components/form/others/Title";
import SelectRole from "@/components/form/selectOption/SelectRole";
import DrawerButton from "@/components/form/button/DrawerButton";
import LabelArea from "@/components/form/selectOption/LabelArea";
import axios from "axios";

const StaffDrawer = ({ id, staff, fetchStaffs }) => {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [joiningDate, setJoiningDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [role, setRole] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id && staff) {
      setName(staff.data.name);
      setEmail(staff.data.email);
      setPhoneNumber(staff.data.phoneNumber);
      setJoiningDate(staff.data.joiningDate);
      setRole(staff.data.role);
    } else {
      resetForm();
    }
  }, [id, staff]);

  const validateForm = () => {
    const newErrors = {};

    if (!name) newErrors.name = "Name is required.";
    if (!email) newErrors.email = "Email is required.";
    if (!joiningDate) newErrors.joiningDate = "Date is required.";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required.";
    if (!role) newErrors.role = "Role is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const staffData = {
        name,
        email,
        joiningDate,
        phoneNumber,
        role,
      };

      try {
        setLoading(true);
        let response;

        if (id) {
          response = await fetch(
            `${import.meta.env.VITE_APP_API_BASE_URL}/admin/staff-update/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(staffData),
            }
          );
        } else {
          response = await fetch(
            `${import.meta.env.VITE_APP_API_BASE_URL}/admin/create-user"`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(staffData),
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
          id ? "Staff updated successfully!" : "Staff created successfully!"
        );
        fetchStaffs(); // Refetch coupons after submission
      } catch (error) {
        console.error("Error submitting staff:", error.message);
        setErrors({ api: error.message });
        toast.error("Failed to submit the staff. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhoneNumber("");
    setJoiningDate("");
    setRole("");
    setErrors({});
  };

  return (
    <div>
      <div className="bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 relative w-full p-6 border-b border-gray-100">
        <Title
          title={id ? t("Update Staff") : t("Add Staff")}
          description={id ? t("Update Staff Details") : t("Add New Staff")}
        />
      </div>
      <form onSubmit={handleSubmit} className="p-6 rounded-lg">
        {[
          // { label: "file", value: file, onChange: setFile, error: errors.file },
          { label: "Name", value: name, onChange: setName, error: errors.name },
          {
            label: "Email",
            value: email,
            onChange: setEmail,
            error: errors.email,
          },
          {
            label: "Phone Number",
            value: phoneNumber,
            onChange: setPhoneNumber,
            error: errors.phoneNumber,
          },
          {
            label: "Joining Date",
            type: "date",
            value: joiningDate,
            onChange: setJoiningDate,
            error: errors.joiningDate,
          },
        ].map(({ label, value, onChange, error, type = "text" }) => (
          <div key={label} className="grid grid-cols-6 gap-3 mb-6">
            <LabelArea label={label} />
            <div className="sm:col-span-4 col-span-8">
              <Input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="focus:bg-white w-full h-12 p-2 mt-1 bg-gray-100 border rounded outline-none"
              />
              {error && (
                <span className="mt-2 text-sm text-red-400">{error}</span>
              )}
            </div>
          </div>
        ))}

        {/* Role Selection */}
        <div className="grid grid-cols-6 gap-3 mb-[10rem]">
          <LabelArea label="Role" />
          <div className="sm:col-span-4 col-span-8">
            <SelectRole
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
            {errors.role && (
              <span className="mt-2 text-sm text-red-400">{errors.role}</span>
            )}
          </div>
        </div>

        <DrawerButton
          id={id}
          title="Staff"
          loading={loading}
          isSubmitting={loading}
        />
      </form>
    </div>
  );
};

export default StaffDrawer;
