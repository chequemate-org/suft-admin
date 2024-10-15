import Ajv from "ajv";
import csvToJson from "csvtojson";
import { useContext, useState } from "react";
import { SidebarContext } from "@/context/SidebarContext";
import ProductServices from "@/services/ProductServices";
import { notifyError, notifySuccess } from "@/utils/toast";

// custom product upload validation schema
const schema = {
  type: "object",
  properties: {
    categories: { type: "array" },
    imageUrl: { type: "array" }, // update for imageUrl
    size: { type: "array" },
    color: { type: "array" },
    stockLevel: { type: "number" }, // update for stockLevel
    isAvailable: { type: "boolean" },
    name: { type: "string" },
    price: { type: "string" },
    avgRating: { type: "string" },
    totalReviews: { type: "number" },
  },
  required: ["name", "price", "stockLevel", "isAvailable"],
};

const useProductFilter = (data) => {
  const ajv = new Ajv({ allErrors: true });
  const { setLoading, setIsUpdate } = useContext(SidebarContext);

  const [newProducts] = useState([]);
  const [selectedFile, setSelectedFile] = useState([]);
  const [filename, setFileName] = useState("");
  const [isDisabled, setIsDisable] = useState(false);

  const serviceData = data;

  const handleOnDrop = (data) => {
    for (let i = 0; i < data.length; i++) {
      newProducts.push(data[i].data);
    }
  };

  const handleUploadProducts = () => {
    if (newProducts.length < 1) {
      notifyError("Please upload/select a CSV file first!");
    } else {
      ProductServices.addAllProducts(newProducts)
        .then((res) => {
          notifySuccess(res.message);
        })
        .catch((err) => notifyError(err.message));
    }
  };

  const handleSelectFile = async (e) => {
    e.preventDefault();
    const fileReader = new FileReader();
    const file = e.target?.files[0];

    if (file && file.type === "application/json") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.readAsText(file, "UTF-8");
      fileReader.onload = (e) => {
        const text = JSON.parse(e.target.result);
        const productData = text.map((value) => {
          return {
            name: value.name,
            price: value.price,
            imageUrl: value.imageUrl, // handle imageUrl array
            size: value.size,
            color: value.color,
            stockLevel: value.stockLevel,
            isAvailable: value.isAvailable,
          };
        });

        setSelectedFile(productData);
      };
    } else if (file && file.type === "text/csv") {
      setFileName(file?.name);
      setIsDisable(true);

      fileReader.onload = async (event) => {
        const text = event.target.result;
        const json = await csvToJson().fromString(text);
        const productData = json.map((value) => {
          return {
            name: value.name,
            price: value.price,
            imageUrl: JSON.parse(value.imageUrl), // convert imageUrl to array
            size: JSON.parse(value.size),
            color: JSON.parse(value.color),
            stockLevel: JSON.parse(value.stockLevel),
            isAvailable: JSON.parse(value.isAvailable.toLowerCase()),
          };
        });

        setSelectedFile(productData);
      };

      fileReader.readAsText(file);
    } else {
      setFileName(file?.name);
      setIsDisable(true);
      notifyError("Unsupported file type!");
    }
  };

  const handleRemoveSelectFile = (e) => {
    setFileName("");
    setSelectedFile([]);
    setTimeout(() => setIsDisable(false), 1000);
  };

  return {
    data,
    filename,
    isDisabled,
    handleSelectFile,
    serviceData,
    handleOnDrop,
    handleUploadProducts,
    handleRemoveSelectFile,
  };
};

export default useProductFilter;
