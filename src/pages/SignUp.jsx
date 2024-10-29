import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Input, Label, Button } from "@windmill/react-ui";
import { ImFacebook, ImGoogle } from "react-icons/im";
import { useTranslation } from "react-i18next";

// Internal imports
import Error from "@/components/form/others/Error";
import InputArea from "@/components/form/input/InputArea";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SelectRole from "@/components/form/selectOption/SelectRole";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import ImageLight from "@/assets/img/create-account-office.jpeg";
import ImageDark from "@/assets/img/create-account-office-dark.jpeg";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";
import { notifyError, notifySuccess } from "@/utils/toast";

const SignUp = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState([]);
  const { onSubmit, register, handleSubmit, errors, loading } =
    useLoginSubmit();

  const handleImageUpload = (acceptedFiles) => {
    const oversizedFiles = acceptedFiles.filter((file) => file.size > 5000000);
    if (oversizedFiles.length > 0) {
      notifyError("Some files are larger than 5MB and cannot be uploaded.");
      return;
    }

    setFile((prevFiles) => [
      ...prevFiles,
      ...acceptedFiles.map((file) =>
        Object.assign(file, { preview: URL.createObjectURL(file) })
      ),
    ]);
    notifySuccess("Images uploaded successfully!");
  };

  const handleRemoveImage = (fileToRemove) => {
    setFile((prevFiles) => prevFiles.filter((img) => img !== fileToRemove));
    notifySuccess("Image removed successfully!");
  };

  const mainImageThumbs = file.map((file, index) => (
    <div key={index} className="relative">
      <img className="w-24 h-24" src={file.preview} alt={file.name} />
      <button
        type="button"
        className="absolute top-0 right-0 text-red-500"
        onClick={() => handleRemoveImage(file)}
      >
        <FiXCircle />
      </button>
    </div>
  ));

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp"] },
    multiple: true,
    maxSize: 5000000,
    onDrop: handleImageUpload,
  });

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                {t("CreateAccount")}
              </h1>
              <form
                onSubmit={handleSubmit((data) =>
                  onSubmit({ ...data, image: file[0] })
                )}
              >
                <LabelArea label="Name" />
                <InputArea
                  required
                  register={register}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Admin"
                />
                <Error errorName={errors.name} />

                <LabelArea label="Email" />
                <InputArea
                  required
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="john@doe.com"
                />
                <Error errorName={errors.email} />

                <LabelArea label="Phone Number" />
                <InputArea
                  required
                  register={register}
                  label="Phone Number"
                  name="phoneNumber"
                  type="text"
                  placeholder="08104048887"
                />
                <Error errorName={errors.phoneNumber} />

                <LabelArea label="Joining Date" />
                <InputArea
                  required
                  register={register}
                  label="Joining Date"
                  name="joiningDate"
                  type="date"
                  placeholder="12/10/2024"
                />
                <Error errorName={errors.joiningDate} />

                <LabelArea label="Staff Role" />
                <SelectRole register={register} name="role" />
                <Error errorName={errors.role} />

                <LabelArea label="Profile Image" />
                <div className="w-full">
                  <div
                    {...getRootProps()}
                    className="p-6 text-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer w-full bg-white"
                  >
                    <input {...getInputProps()} />
                    <span className="flex justify-center mx-auto">
                      <FiUploadCloud className="text-emerald-500 text-3xl" />
                    </span>
                    <p className="mt-2 text-sm">Drag your image here</p>
                    <em className="text-xs text-gray-400">
                      (Only *.jpeg, *.png, and *.webp images accepted, Max: 5MB)
                    </em>
                  </div>
                  <div className="flex flex-wrap mt-4">{mainImageThumbs}</div>
                  {errors.image && (
                    <span className="mt-2 text-sm text-red-400">
                      {errors.image.message}
                    </span>
                  )}
                </div>

                <Label check>
                  <Input type="checkbox" required />
                  <span className="ml-2">
                    {t("Iagree")}{" "}
                    <span className="underline">{t("privacyPolicy")}</span>
                  </span>
                </Label>

                <Button
                  disabled={loading}
                  type="submit"
                  className="mt-4 h-12 w-full"
                >
                  {t("CreateAccountTitle")}
                </Button>
              </form>

              <hr className="my-10" />

              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-blue-600 h-11 md:h-12 w-full mr-2"
              >
                <ImFacebook className="w-4 h-4 mr-2" />{" "}
                <span className="ml-2">{t("LoginWithFacebook")}</span>
              </button>
              <button
                disabled
                className="text-sm inline-flex items-center cursor-pointer transition ease-in-out duration-300 font-semibold font-serif text-center justify-center rounded-md focus:outline-none text-gray-700 bg-gray-100 shadow-sm my-2 md:px-2 lg:px-3 py-4 md:py-3.5 lg:py-4 hover:text-white hover:bg-red-500 h-11 md:h-12 w-full"
              >
                <ImGoogle className="w-4 h-4 mr-2" />{" "}
                <span className="ml-2">{t("LoginWithGoogle")}</span>
              </button>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                  to="/login"
                >
                  {t("AlreadyAccount")}
                </Link>
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
