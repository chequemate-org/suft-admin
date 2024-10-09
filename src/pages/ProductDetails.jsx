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

const ProductDetails = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const { handleUpdate } = useToggleDrawer();
  const { attribue } = useProductSubmit(id);
  const [variantTitle, setVariantTitle] = useState([]);
  const { lang } = useContext(SidebarContext);

  const { data = {}, loading } = useAsync(() => ProductServices.getProductById(id));

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

  return (
    <>
      <MainDrawer product>
        <ProductDrawer id={id} />
      </MainDrawer>

      <PageTitle>{t("ProductDetails")}</PageTitle>
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <div className="inline-block overflow-y-auto h-full align-middle transition-all transform">
          <div className="flex flex-col lg:flex-row md:flex-row w-full overflow-hidden">
            <div className="flex-shrink-0 flex items-center justify-center h-auto">
              {data.imageUrl && data.imageUrl.length > 0 ? (
                <img src={data.imageUrl[0]} alt="product" className="h-64 w-64" />
              ) : (
                <img
                  src="https://res.cloudinary.com/ahossain/image/upload/v1655097002/placeholder_kvepfp.png"
                  alt="product"
                />
              )}
            </div>
            <div className="w-full flex flex-col p-5 md:p-8 text-left">
              <div className="mb-5 block ">
                <h2 className="text-heading text-lg md:text-xl lg:text-2xl font-semibold font-serif dark:text-gray-400">
                  {showingTranslateValue(data.name)}
                </h2>
                <p className="uppercase font-serif font-medium text-gray-500 dark:text-gray-400 text-sm">
                  {t("Sku")}:{" "}
                  <span className="font-bold text-gray-500 dark:text-gray-500">
                    {data.uuid}
                  </span>
                </p>
              </div>
              <div className="font-serif product-price font-bold dark:text-gray-400">
                <span className="inline-block text-2xl">
                  {currency}
                  {getNumberTwo(data.price)}
                </span>
              </div>
              <div className="mb-3">
                {data.stockLevel <= 0 ? (
                  <Badge type="danger">
                    <span className="font-bold">{t("StockOut")}</span>{" "}
                  </Badge>
                ) : (
                  <Badge type="success">
                    {" "}
                    <span className="font-bold">{t("InStock")}</span>
                  </Badge>
                )}
                <span className="text-sm text-gray-500 dark:text-gray-400 font-medium pl-4">
                  {t("Quantity")}: {data.stockLevel}
                </span>
              </div>
              <p className="text-sm leading-6 text-gray-500 dark:text-gray-400 md:leading-7">
                {showingTranslateValue(data.description)}
              </p>
              <div className="flex flex-col mt-4">
                <p className="font-serif font-semibold py-1 text-gray-500 text-sm">
                  <span className="text-gray-700 dark:text-gray-400">
                    {t("Color")}:{" "}
                  </span>{" "}
                  {data.color.map((color, index) => (
                    <span key={index} className="mr-2">
                      <span className="inline-block w-4 h-4 rounded-full" style={{ backgroundColor: color.hex }} />
                      {color.name}
                    </span>
                  ))}
                </p>
              </div>
              <div className="mt-6">
                <button
                  onClick={() => handleUpdate(id)}
                  className="cursor-pointer leading-5 transition-colors duration-150 font-medium text-sm focus:outline-none px-5 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600 "
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
