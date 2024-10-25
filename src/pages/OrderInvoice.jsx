import dayjs from "dayjs";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import React, { useContext, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  TableCell,
  TableHeader,
  Table,
  TableContainer,
  WindmillContext,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { PDFDownloadLink } from "@react-pdf/renderer";

//internal import
import useAsync from "@/hooks/useAsync";
import Status from "@/components/table/Status";
import OrderServices from "@/services/OrderServices";
import Invoice from "@/components/invoice/Invoice";
import Loading from "@/components/preloader/Loading";
import PageTitle from "@/components/Typography/PageTitle";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import InvoiceForDownload from "@/components/invoice/InvoiceForDownload";

const OrderInvoice = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { id } = useParams();
  const printRef = useRef();

  const { data, loading, error } = useAsync(() =>
    OrderServices.getOrderById(id)
  );

  const {
    currency,
    globalSetting,
    showDateTimeFormat,
    showDateFormat,
    getNumberTwo,
  } = useUtilsFunction();
  const extractCurrencyAndAmount = (value) => {
    const currency = value.match(/[^0-9.]/g)?.join("") || ""; // Extracts currency symbol
    const amount = parseFloat(value.replace(/[^0-9.]/g, "")) || 0; // Extracts numeric amount
    return { currency, amount };
  };
  // Example usage
  const totalAmountData = extractCurrencyAndAmount(
    data?.order?.payment?.totalAmount || ""
  );
  const shippingCostData = extractCurrencyAndAmount(
    data?.order?.payment?.shippingCost || ""
  );
  const discountData = extractCurrencyAndAmount(
    data?.order?.payment?.discount || ""
  );
  const taxData = extractCurrencyAndAmount(data?.order?.payment?.tax || "");

  return (
    <>
      <PageTitle> {t("InvoicePageTittle")} </PageTitle>

      <div
        ref={printRef}
        className="bg-white dark:bg-gray-800 mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden"
      >
        {!loading && (
          <div className="">
            <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50 dark:border-gray-700 dark:text-gray-300">
              <h1 className="font-bold font-serif text-xl uppercase">
                {t("InvoicePageTittle")}
                <p className="text-xs mt-1 text-gray-500">
                  {t("InvoiceStatus")}
                  <span className="pl-2 font-medium text-xs capitalize">
                    {" "}
                    <Status status={data?.order?.status} />
                  </span>
                </p>
              </h1>
              <div className="lg:text-right text-left">
                <h2 className="lg:flex lg:justify-end text-lg font-serif font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                  {mode === "dark" ? (
                    <svg
                      width="150"
                      height="60"
                      viewBox="0 0 84 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50.169 25.4752V28.6775H49.2287C47.4496 28.6775 46.2805 28.0167 45.7977 26.746C44.8065 28.1946 43.3579 28.9824 41.5788 28.9824C38.6562 28.9824 36.6992 27.0255 36.6992 24.0266V15.716H40.0031V23.0608C40.0031 24.7127 41.0705 25.7801 42.6717 25.7801C44.3744 25.7801 45.5181 24.6873 45.5181 23.0099V15.716H48.822V24.3824C48.822 25.0686 49.2286 25.4752 49.9148 25.4752H50.169V25.4752Z"
                        fill="#220E01"
                      />
                      <path
                        d="M64.2345 18.7404V24.0266C64.2345 25.0432 64.8699 25.6531 65.9627 25.6531H67.2334V28.6775H65.4544C62.5063 28.6775 60.9306 27.2542 60.9306 24.5857V18.7404H55.5173V29.0587C55.5173 31.956 53.8399 33.5063 50.6377 33.5063H49.7227V30.4819H50.3326C51.5271 30.4819 52.2133 29.8211 52.2133 28.6775V18.7404H50.1801V15.716H52.2133V14.674C52.2133 11.7767 53.9161 10.2264 57.0929 10.2264H58.5162V13.2508H57.4233C56.2289 13.2508 55.5173 13.9115 55.5173 15.0552V15.716H60.0665C60.7526 15.716 61.1084 15.3602 61.1084 14.674V12.2596H64.2345V15.716H67.2334V18.7404H64.2345Z"
                        fill="#220E01"
                      />
                      <path
                        d="M16 24.0115L18.9133 23.3179C18.9133 23.3179 19.8844 31.1977 26.4601 31.1977C29.7064 31.1977 31.7318 29.089 31.7318 26.6474C31.7318 22.5965 26.3491 20.9872 26.3491 15.6878C26.3491 12.6636 28.7352 10 32.6474 10C38.6682 10 39.445 14.9942 39.445 14.9942L36.6983 15.7156C36.6983 15.7156 36.1433 12.7191 32.9803 12.7191C31.0936 12.7191 29.8173 13.9953 29.8173 15.6878C29.8173 19.267 35.1999 21.2092 35.1999 26.4532C35.1999 30.4207 31.9537 34 26.3769 34C16.9989 34 16 24.0115 16 24.0115Z"
                        fill="#220E01"
                      />
                      <path
                        d="M25.4613 18.8536C25.1581 18.353 24.8185 17.8311 24.3708 17.2725C24.3704 17.272 24.37 17.2716 24.3697 17.2711C24.0968 16.931 23.4938 16.477 22.5205 17.2578C18.7844 20.2545 19.8799 27.0004 24.111 29.0674C29.0252 31.4681 32.2497 25.9491 28.1631 22.4348C26.7477 21.2176 26.2173 20.1017 25.4613 18.8536Z"
                        fill="#FF8D00"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="150"
                      height="60"
                      viewBox="0 0 84 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M50.169 25.4752V28.6775H49.2287C47.4496 28.6775 46.2805 28.0167 45.7977 26.746C44.8065 28.1946 43.3579 28.9824 41.5788 28.9824C38.6562 28.9824 36.6992 27.0255 36.6992 24.0266V15.716H40.0031V23.0608C40.0031 24.7127 41.0705 25.7801 42.6717 25.7801C44.3744 25.7801 45.5181 24.6873 45.5181 23.0099V15.716H48.822V24.3824C48.822 25.0686 49.2286 25.4752 49.9148 25.4752H50.169V25.4752Z"
                        fill="#220E01"
                      />
                      <path
                        d="M64.2345 18.7404V24.0266C64.2345 25.0432 64.8699 25.6531 65.9627 25.6531H67.2334V28.6775H65.4544C62.5063 28.6775 60.9306 27.2542 60.9306 24.5857V18.7404H55.5173V29.0587C55.5173 31.956 53.8399 33.5063 50.6377 33.5063H49.7227V30.4819H50.3326C51.5271 30.4819 52.2133 29.8211 52.2133 28.6775V18.7404H50.1801V15.716H52.2133V14.674C52.2133 11.7767 53.9161 10.2264 57.0929 10.2264H58.5162V13.2508H57.4233C56.2289 13.2508 55.5173 13.9115 55.5173 15.0552V15.716H60.0665C60.7526 15.716 61.1084 15.3602 61.1084 14.674V12.2596H64.2345V15.716H67.2334V18.7404H64.2345Z"
                        fill="#220E01"
                      />
                      <path
                        d="M16 24.0115L18.9133 23.3179C18.9133 23.3179 19.8844 31.1977 26.4601 31.1977C29.7064 31.1977 31.7318 29.089 31.7318 26.6474C31.7318 22.5965 26.3491 20.9872 26.3491 15.6878C26.3491 12.6636 28.7352 10 32.6474 10C38.6682 10 39.445 14.9942 39.445 14.9942L36.6983 15.7156C36.6983 15.7156 36.1433 12.7191 32.9803 12.7191C31.0936 12.7191 29.8173 13.9953 29.8173 15.6878C29.8173 19.267 35.1999 21.2092 35.1999 26.4532C35.1999 30.4207 31.9537 34 26.3769 34C16.9989 34 16 24.0115 16 24.0115Z"
                        fill="#220E01"
                      />
                      <path
                        d="M25.4613 18.8536C25.1581 18.353 24.8185 17.8311 24.3708 17.2725C24.3704 17.272 24.37 17.2716 24.3697 17.2711C24.0968 16.931 23.4938 16.477 22.5205 17.2578C18.7844 20.2545 19.8799 27.0004 24.111 29.0674C29.0252 31.4681 32.2497 25.9491 28.1631 22.4348C26.7477 21.2176 26.2173 20.1017 25.4613 18.8536Z"
                        fill="#FF8D00"
                      />
                    </svg>
                  )}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {globalSetting?.address} <br />
                  {globalSetting?.contact} <br />{" "}
                  <span> {globalSetting?.email} </span> <br />
                  {globalSetting?.website}
                </p>
              </div>
            </div>
            <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceDate")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {showDateFormat(data?.createdAt)}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceNo")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  #{data?.order?.invoiceNo}
                </span>
              </div>
              <div className="flex flex-col lg:text-right text-left">
                <span className="font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceTo")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 block">
                  {data?.order?.customer?.name} <br />
                  {data?.order?.customer?.email}{" "}
                  <span className="ml-2">{data?.order?.customer?.phone}</span>
                  <br />
                  {data?.order?.customer?.shippingAddress?.substring(0, 30)}
                  <br />
                  {/* {data?.user_info?.city}, {data?.user_info?.country},{" "}
                  {data?.user_info?.zipCode} */}
                </span>
              </div>
            </div>
          </div>
        )}
        <div>
          {loading ? (
            <Loading loading={loading} />
          ) : error ? (
            <span className="text-center mx-auto text-red-500">{error}</span>
          ) : (
            <TableContainer className="my-8">
              <Table>
                <TableHeader>
                  <tr>
                    <TableCell>{t("Sr")}</TableCell>
                    <TableCell>Product Title</TableCell>
                    <TableCell className="text-center">
                      {t("Quantity")}
                    </TableCell>
                    <TableCell className="text-center">
                      {t("ItemPrice")}
                    </TableCell>
                    <TableCell className="text-right">{t("Amount")}</TableCell>
                  </tr>
                </TableHeader>
                <Invoice
                  data={data}
                  currency={currency}
                  getNumberTwo={getNumberTwo}
                />
              </Table>
            </TableContainer>
          )}
        </div>

        {!loading && (
          <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50 dark:bg-gray-900 dark:border-gray-800">
            <div className="flex lg:flex-row md:flex-row flex-col justify-between">
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoicepaymentMethod")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {data?.order?.payment?.method}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("ShippingCost")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {shippingCostData.currency}
                  {getNumberTwo(shippingCostData.amount)}
                </span>
              </div>
              <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceDicount")}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400 font-semibold font-serif block">
                  {discountData.currency}
                  {getNumberTwo(discountData.amount)}
                </span>
              </div>
              <div className="flex flex-col sm:flex-wrap">
                <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 dark:text-gray-500 block">
                  {t("InvoiceTotalAmount")}
                </span>
                <span className="text-xl font-serif font-bold text-red-500 dark:text-emerald-500 block">
                  {totalAmountData.currency}
                  {getNumberTwo(totalAmountData.amount)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {!loading && (
        <div className="mb-4 mt-3 flex justify-between">
          <PDFDownloadLink
            document={
              <InvoiceForDownload
                t={t}
                data={data}
                currency={currency}
                getNumberTwo={getNumberTwo}
                showDateFormat={showDateFormat}
              />
            }
            fileName="Invoice"
          >
            {({ blob, url, loading, error }) =>
              loading ? (
                "Loading..."
              ) : (
                <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600  w-auto cursor-pointer">
                  Download Invoice
                  <span className="ml-2 text-base">
                    <IoCloudDownloadOutline />
                  </span>
                </button>
              )
            }
          </PDFDownloadLink>

          <ReactToPrint
            trigger={() => (
              <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600  w-auto">
                {t("PrintInvoice")}
                <span className="ml-2">
                  <FiPrinter />
                </span>
              </button>
            )}
            content={() => printRef.current}
            documentTitle="Invoice"
          />
        </div>
      )}
    </>
  );
};

export default OrderInvoice;
