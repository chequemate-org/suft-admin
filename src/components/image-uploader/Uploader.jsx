import React, { useEffect, useState } from "react";
import { t } from "i18next";
import axios from "axios";
import { useDropzone } from "react-dropzone";
// import cloudinary from "cloudinary/lib/cloudinary";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FiUploadCloud, FiXCircle } from "react-icons/fi";


//internal import
import useAsync from "@/hooks/useAsync";
import SettingServices from "@/services/SettingServices";
import { notifyError, notifySuccess } from "@/utils/toast";
import Container from "@/components/image-uploader/Container";

// cloudinary?.config({
//   cloud_name: import.meta.env.VITE_APP_CLOUD_NAME,
//   api_key: import.meta.env.VITE_APP_CLOUDINARY_API_KEY,
//   api_secret: import.meta.env.VITE_APP_CLOUDINARY_API_SECRET,
// });
const api_key = import.meta.env.VITE_APP_CLOUDINARY_API_KEY
const api_secret = import.meta.env.VITE_APP_CLOUDINARY_API_SECRET
const cloudinary_name = import.meta.env.VITE_APP_CLOUD_NAME
const cloudinary_url = import.meta.env.VITE_APP_CLOUDINARY_URL
console.log("Api_key: ", api_key)
console.log("Api_Secret: ", api_secret)
console.log("cloudinary_name: ", cloudinary_name)
console.log("cloudinary_url: ", cloudinary_url)


const Uploader = ({ setImageUrl, imageUrl, product, folder }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState("");

  const { data: globalSetting } = useAsync(SettingServices.getGlobalSetting);

  // console.log("data", data);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".webp"],
    },
    multiple: product ? true : false,
    maxSize: 500000,
    maxFiles: globalSetting?.number_of_image_per_product || 2,
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  useEffect(() => {
    if (fileRejections) {
      fileRejections.map(({ file, errors }) => (
        <li key={file.path}>
          {file.path} - {file.size} bytes
          <ul>
            {errors.map((e) => (
              <li key={e.code}>
                {e.code === "too-many-files"
                  ? notifyError(
                      `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
                    )
                  : notifyError(e.message)}
              </li>
            ))}
          </ul>
        </li>
      ));
    }

    if (files) {
      files.forEach((file) => {
        if (
          product &&
          imageUrl?.length + files?.length >
            globalSetting?.number_of_image_per_product
        ) {
          return notifyError(
            `Maximum ${globalSetting?.number_of_image_per_product} Image Can be Upload!`
          );
        }

        setLoading(true);
        setError("Uploading....");

        if (product) {
          const result = imageUrl?.find(
            (img) => img === `${cloudinary_url}`
          );

          if (result) return setLoading(false);
        }

        const name = file.name.replaceAll(/\s/g, "");
        const public_id = name?.substring(0, name.lastIndexOf("."));

        const formData = new FormData();
        formData.append("file", file);
        // formData.append(
        //   "upload_preset",
        //   import.meta.env.VITE_APP_CLOUDINARY_UPLOAD_PRESET
        // );
        formData.append("cloud_name", cloudinary_name);
        formData.append("folder", folder);
        formData.append("public_id", public_id);

        axios({
          url: '',
          method: "POST",
          // headers: {
          //   "Content-Type": "application/x-www-form-urlencoded",
          // },
          data: formData,
        })
          .then((res) => {
            notifySuccess("Image Uploaded successfully!");
            setLoading(false);
            if (product) {
              setImageUrl((imgUrl) => [...imgUrl, res.data.secure_url]);
            } else {
              setImageUrl(res.data.secure_url);
            }
          })
          .catch((err) => {
            console.error("err", err);
            notifyError(err.Message);
            setLoading(false);
          });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [files]);

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div>
        <img
          className="max-h-24 inline-flex w-24 border-2 border-gray-100"
          src={file.preview}
          alt={file.name}
        />
      </div>
    </div>
  ));

  useEffect(
    () => () => {
      // Make sure to revoke the data uris to avoid memory leaks
      files.forEach((file) => URL.revokeObjectURL(file.preview));
    },
    [files]
  );

  
  return (
    <div className="w-full text-center">
      <div
        className="dark:border-gray-600 px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <span className="flex justify-center mx-auto">
          <FiUploadCloud className="text-emerald-500 text-3xl" />
        </span>
        <p className="mt-2 text-sm">{t("DragYourImage")}</p>
        <em className="text-xs text-gray-400">{t("imageFormat")}</em>
      </div>

      <div className="text-emerald-500">{loading && err}</div>
      <aside className="flex flex-row flex-wrap mt-4">
        {product ? (
          <DndProvider backend={HTML5Backend}>
            <Container
              setImageUrl={setImageUrl}
              imageUrl={imageUrl}
              handleRemoveImage={handleRemoveImage}
            />
          </DndProvider>
        ) : !product && imageUrl ? (
          <div className="relative">
            {" "}
            <img
              className="dark:border-gray-600 max-h-24 inline-flex w-24 p-2 border border-gray-100 rounded-md"
              src={imageUrl}
              alt="product"
            />
            <button
              type="button"
              className="focus:outline-none absolute top-0 right-0 text-red-500"
              onClick={() => handleRemoveImage(imageUrl)}
            >
              <FiXCircle />
            </button>
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </div>
  );
};

export default Uploader;
