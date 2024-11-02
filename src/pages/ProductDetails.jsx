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
import axios from "axios";

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

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { handleUpdate } = useToggleDrawer();
  const { attribue } = useProductSubmit(id);
  const [variantTitle, setVariantTitle] = useState([]);
  const { lang } = useContext(SidebarContext);
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { data = {} } = useAsync(() => ProductServices.getProductById(id));
  const { currency, showingTranslateValue, getNumberTwo } = useUtilsFunction();

  // Handle cases where data might not have variants
  const { handleChangePage, totalResults, resultsPerPage, dataTable } = useFilter(data.variants || []);

  useEffect(() => {
    if (!loading && data.size) {
      const res = Object.keys(data.color);
      const varTitle = attribue?.filter((att) => res.includes(att._id));
      setVariantTitle(varTitle);
    }
  }, [attribue, data.color, loading, lang]);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`https://suft-90bec7a20f24.herokuapp.com/product/single/${id}`);
        setProductData(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProductData();
  }, [id]);

  return (
    <>
      <MainDrawer product>
        <ProductDrawer id={id} />
      </MainDrawer>

      <PageTitle>{t("ProductDetails")}</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block h-full overflow-y-auto align-middle transition-all transform">
          <div className="lg:flex-row md:flex-row flex flex-col w-full overflow-hidden">
            <div className="flex items-center justify-center flex-shrink-0 h-auto">
              {productData.imageUrl && productData.imageUrl.length > 0 ? (
                <img src={data.imageUrl[0]} alt="product" className="w-64 h-64" />
              ) : (
                <img
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="product"
                />
              )}
            </div>
            <div className="md:p-8 flex flex-col w-full p-5 text-left">
              <div className="block mb-5">
                <h2 className="text-heading md:text-xl lg:text-2xl dark:text-gray-400 font-serif text-lg font-semibold">
                  {showingTranslateValue(productData.name)}
                </h2>
                <p className="dark:text-gray-400 font-serif text-sm font-medium text-gray-500 uppercase">
                  {t("Sku")}:{" "}
                  <span className="dark:text-gray-500 font-bold text-gray-500">
                    {productData.uuid}
                  </span>
                </p>
              </div>
              <div className="product-price dark:text-gray-400 font-serif font-bold">
                <span className="inline-block text-2xl">
                  {currency}
                  {getNumberTwo(productData.price)}
                </span>
              </div>
              <div className="mb-3">
                {productData.stockLevel <= 0 ? (
                  <Badge type="danger">
                    <span className="font-bold">{t("StockOut")}</span>{" "}
                  </Badge>
                ) : (
                  <Badge type="success">
                    {" "}
                    <span className="font-bold">{t("InStock")}</span>
                  </Badge>
                )}
                <span className="dark:text-gray-400 pl-4 text-sm font-medium text-gray-500">
                  {t("Quantity")}: {productData.stockLevel}
                </span>
              </div>
              <p className="dark:text-gray-400 md:leading-7 text-sm leading-6 text-gray-500">
                {showingTranslateValue(productData.description)}
              </p>
              <div className="flex flex-col mt-4">
                <p className="py-1 font-serif text-sm font-semibold text-gray-500">
                  <span className="dark:text-gray-400 text-gray-700">
                    {t("Color")}:{" "}
                  </span>{" "}
                  {data.color && data.color.length > 0 ? (
                    data.color.map((color, index) => (
                      <span key={index} className="mr-2">
                        <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }} />
                        {color.name}
                      </span>
                    ))
                  ) : (
                    <span className="text-gray-400">No colors available</span>
                  )}
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleUpdate(id)}
                  className="focus:outline-none bg-emerald-500 active:bg-emerald-600 hover:bg-emerald-600 px-5 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 border border-transparent rounded-md cursor-pointer"
                >
                  {t("EditProduct")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {data.isAvailable && variantTitle.length > 0 && !loading && (
        <>
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
        </>
      )}
    </>
  );
};

export default ProductDetails;
