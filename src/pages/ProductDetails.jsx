import {
  Badge,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import React, { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router";

// Internal imports
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import useProductSubmit from "@/hooks/useProductSubmit";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import ProductServices from "@/services/ProductServices";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import AttributeList from "@/components/attribute/AttributeList";
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import Loading from "@/components/preloader/Loading";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";

const ProductDetails = ({}) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { handleUpdate } = useToggleDrawer();
  const { attribue } = useProductSubmit(id);
  const [variantTitle, setVariantTitle] = useState([]);
  const [productData, setProductData] = useState(null); // State to hold fetched product data
  const { lang } = useContext(SidebarContext);

  const { data = {}, loading } = useAsync(() => ProductServices.getProductById(id, "NGN"));
  const { currency, getNumberTwo } = useUtilsFunction();

  const { handleChangePage, totalResults, resultsPerPage, dataTable } = useFilter(data.variants || []);

  useEffect(() => {
    if (!loading && data.size) {
      const res = Object.keys(data.color || {});
      const varTitle = attribue?.filter((att) => res.includes(att._id));
      setVariantTitle(varTitle);
    }
  }, [attribue, data.color, loading, lang]);

  const handleEditClick = async () => {
    try {
      const fetchedProductData = await ProductServices.getProductById(id); // Fetch product details
      setProductData(fetchedProductData); // Set the fetched data to state
      handleUpdate(); // Open the drawer
    } catch (error) {
      console.error("Error fetching product details for editing:", error);
    }
  };

  return (
    <>
      <MainDrawer product>
        <ProductDrawer id={id} productData={productData} /> 
      </MainDrawer>

      <PageTitle>{t("ProductDetails")}</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="flex flex-col lg:flex-row md:flex-row gap-10 w-full overflow-hidden">
            {/* Product Image Section */}
            <div className="flex-shrink-0 flex items-center justify-center md:w-1/2 h-auto sm:w-full">
              {data.imageUrl && data.imageUrl.length > 0 ? (
                <img src={data.imageUrl[0]} alt="product" className="h-[400px] w-full" />
              ) : (
                <img
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="product"
                />
              )}
            </div>
            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              {/* Product Details */}
              <div className="mb-5">
                <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif dark:text-gray-400">
                  {data.name || t("Bean bag")}
                </h2>
                <p className="uppercase font-serif font-medium text-gray-500 dark:text-gray-400 text-sm">
                  {t("Sku")}:{" "}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {data.sku || t("N/A")}
                  </span>
                </p>
              </div>
              <div className="font-serif product-price font-bold dark:text-gray-400">
                <span className="inline-block text-2xl">
                  NGN
                  {(data.price) || "0.00"}
                </span>
              </div>
              <div className="mb-3">
                {data.stockLevel <= 0 ? (
                  <Badge type="danger">
                    <span className="font-bold uppercase">{t("unavailable")}</span>
                  </Badge>
                ) : (
                  <Badge type="success">
                    <span className="font-bold uppercase">{t("available")}</span>
                  </Badge>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium pl-4">
                  {t("Quantity")}: {data.stockLevel ?? t("Unknown")}
                </span>
              </div>
              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 md:leading-7">
                {data.description || t("NoDescriptionAvailable")}
              </p>
              {data.color && data.color.length > 0 && (
                <div className="flex flex-col mt-4">
                  <p className="font-serif font-semibold py-1 text-gray-500 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      {t("Color")}:{" "}
                    </span>
                    {data.color.map((color, index) => (
                      <span key={index} className="mr-2 flex items-center">
                        <span className="inline-block w-4 h-4 rounded-full mr-1" style={{ backgroundColor: color.hex }} />
                        {color.name}
                      </span>
                    ))}
                  </p>
                </div>
              )}
              {/* Size Information */}
              {data.size && data.size.length > 0 && (
                <div className="flex flex-col mt-4">
                  <p className="font-serif font-semibold py-1 text-gray-500 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">
                      {t("Size")}:{" "}
                    </span>
                    {data.size.join(", ")}
                  </p>
                </div>
              )}
              {/* Extra Images */}
              {data.extraImages && data.extraImages.length > 0 && (
                <div className="flex flex-wrap mt-4 space-x-4">
                  {data.extraImages.map((url, index) => (
                    <img key={index} src={url} alt={`extra-image-${index}`} className="h-20 w-20 rounded-md" />
                  ))}
                </div>
              )}
              {/* Edit Button */}
              <div className="mt-6">
                <button
                  onClick={handleEditClick} // Call the new function on click
                  className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 "
                >
                  {t("EditProduct")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Variant List Table */}
      {/* {data.isAvailable > 0 && !loading && (
        <PageTitle>{t("ProductVariantList")}</PageTitle>
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("SR")}</TableCell>
                <TableCell>{t("Image")}</TableCell>
                <TableCell>{t("Combination")}</TableCell>
                <TableCell>{t("Sku")}</TableCell>
                <TableCell>{t("Barcode")}</TableCell>
                <TableCell>{t("OriginalPrice")}</TableCell>
                <TableCell>{t("SalePrice")}</TableCell>
                <TableCell>{t("Quantity")}</TableCell>
              </tr>
            </TableHeader>
            <AttributeList
              lang={lang}
              variants={dataTable}
              currency={currency}
              variantTitle={variantTitle}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalResults}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      )} */}
    </>
  );
};

export default ProductDetails;