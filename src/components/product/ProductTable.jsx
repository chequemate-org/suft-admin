import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Badge,
  TableBody,
  TableCell,
  TableRow,
} from "@windmill/react-ui";
import { t } from "i18next";
import { FiZoomIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from  "axios";

// internal imports
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import DeleteModal from "@/components/modal/DeleteModal";
import EditDeleteButton from "@/components/table/EditDeleteButton";
import ShowHideButton from "@/components/table/ShowHideButton";
import Tooltip from "@/components/tooltip/Tooltip";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const ProductTable = ({ products, isCheck, setIsCheck }) => {
  const { title, serviceId, handleModalOpen, handleUpdate } = useToggleDrawer();
  const { currency, getNumberTwo } = useUtilsFunction();

  // State to store the fetched product data
  const [product, setProduct] = useState([]);
  const [fetchedProduct, setFetchedProduct] = useState(null);

  const fetchProductByUUID = async (uuid) => {
    try {
      const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/product/single/${uuid}`);
      if (response.data) {
        setFetchedProduct(response.data); // Set fetched product to state
        console.log("Fetched product for editing by UUID:", response.data);
      }
    } catch (error) {
      console.error("Error fetching product by UUID:", error);
    }
  };

  const handleEdit = async (uuid) => {
    await fetchProductByUUID(uuid); // Fetch product data
    handleUpdate(uuid); // Open the drawer for editing
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const response = await fetch('https://suft-90bec7a20f24.herokuapp.com/product');
        const data = await response.json();
        if (response.ok) {
          setProduct(data.data); // Store the product data
        } else {
          console.error(data.message); // Handle error messages
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts(); // Fetch products on component mount
  }, []);

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck(prev => 
      checked 
        ? [...prev, id]
        : prev.filter(item => item !== id)
    );
  };

  return (
    <>
      {isCheck?.length < 1 && <DeleteModal id={serviceId} title={title} />}

      {isCheck?.length < 2 && (
        <MainDrawer>
          <ProductDrawer currency={currency} id={serviceId}  product={fetchedProduct} />
        </MainDrawer>
      )}

      <TableBody>
        {products?.map((product, i) => (
          <TableRow key={product.id || i}>
            <TableCell>
              <CheckBox
                type="checkbox"
                name={product?.name}
                id={product.id}
                handleClick={handleClick}
                isChecked={isCheck?.includes(product.id)}
              />
            </TableCell>

            <TableCell>
              <div className="flex items-center">
                {product?.imageUrl?.[0] ? (
                  <Avatar
                    className="md:block bg-gray-50 p-1 mr-2 shadow-none"
                    src={product.imageUrl[0]}
                    alt="product"
                  />
                ) : (
                  <Avatar
                    src={'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg'}
                    alt="product"
                  />
                )}
                <div>
                  <h2
                    className={`text-sm font-medium ${
                      product?.name?.length > 30 ? "wrap-long-title" : ""
                    }`}
                  >
                    {product?.name?.substring(0, 28)}
                  </h2>
                </div>
              </div>
            </TableCell>

            <TableCell>
              <span className="text-sm">
                {product?.categories?.join(', ') || 'N/A'}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {getNumberTwo(product?.price)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm font-semibold">
                {currency}
                {getNumberTwo(product?.salePrice || product?.price)}
              </span>
            </TableCell>

            <TableCell>
              <span className="text-sm">{product.stockLevel}</span>
            </TableCell>
            <TableCell>
              {product.isAvailable ? (
                <Badge type="success">{t("Selling")}</Badge>
              ) : (
                <Badge type="danger">{t("SoldOut")}</Badge>
              )}
            </TableCell>
            <TableCell>
              <Link
                to={`/product/${product.uuid}`}
                className="hover:text-emerald-600 flex justify-center text-gray-400"
              >
                <Tooltip
                  id="view"
                  Icon={FiZoomIn}
                  title={t("DetailsTbl")}
                  bgColor="#10B981"
                />
              </Link>
            </TableCell>
            <TableCell className="text-center">
              <ShowHideButton id={product.id} status={product.isAvailable} />
            </TableCell>
            <TableCell>
              <EditDeleteButton
                id={product.uuid}
                product={product}
                isCheck={isCheck}
                handleUpdate={() => handleEdit(product.uuid)} 
                // handleUpdate={handleUpdate}
                handleModalOpen={handleModalOpen}
                title={product?.name}
              />
            </TableCell>
          </TableRow>
        ))}

        {/* Display fetched product details if available */}
        {fetchedProduct && (
          <TableRow>
            <TableCell colSpan="10">
              <div className="p-4">
                <h2 className="text-lg font-bold">{fetchedProduct.name}</h2>
                <p>{fetchedProduct.description}</p>
                <p className="font-semibold">{currency}{fetchedProduct.price}</p>
                {/* Add any additional product details you want to display here */}
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </>
  );
};

export default ProductTable;
