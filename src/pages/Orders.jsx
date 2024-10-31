// import {
//   Button,
//   Card,
//   CardBody,
//   Input,
//   Label,
//   Pagination,
//   Select,
//   Table,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
//   TableBody,
//   TableRow,
// } from "@windmill/react-ui";
// import { useContext, useState, useEffect } from "react";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import { useTranslation } from "react-i18next";
// import exportFromJSON from "export-from-json";
// import axios from "axios";
// import { SidebarContext } from "@/context/SidebarContext";
// import { notifyError } from "@/utils/toast";
// import NotFound from "@/components/table/NotFound";
// import PageTitle from "@/components/Typography/PageTitle";
// import spinnerLoadingImage from "@/assets/img/spinner.gif";
// import AnimatedContent from "@/components/common/AnimatedContent";
// import SelectStatus from "@/components/form/selectOption/SelectStatus";
// import OrderServices from "@/services/OrderServices";
// import PrintReceipt from "@/components/form/others/PrintReceipt";
// import { Link } from "react-router-dom";
// import Tooltip from "@/components/tooltip/Tooltip";
// import { FiZoomIn } from "react-icons/fi";
// import Status from "@/components/table/Status";
// import useUtilsFunction from "@/hooks/useUtilsFunction";

// const Orders = () => {
//   const {
//     time,
//     setTime,
//     status,
//     endDate,
//     setStatus,
//     setEndDate,
//     startDate,
//     currentPage,
//     searchText,
//     searchRef,
//     method,
//     setMethod,
//     setStartDate,
//     setSearchText,
//     handleChangePage,
//     handleSubmitForAll,
//     resultsPerPage,
//   } = useContext(SidebarContext);

//   const { t } = useTranslation();
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [loadingExport, setLoadingExport] = useState(false);
//   const [error, setError] = useState("");
//   const [totalOrders, setTotalOrders] = useState(0);
//   const { currency, getNumber, getNumberTwo } = useUtilsFunction();

//   // Fetch orders with applied filters
//   const fetchOrders = async (filters = {}) => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `https://suft-90bec7a20f24.herokuapp.com/admin/order-filtering?`, {
//           params: {
//             page: currentPage,
//             customerName: filters.customerName || "",
//             startDate: filters.startDate || "",
//             endDate: filters.endDate || "",
//             status: filters.status || "",
//             orderLimit: filters.orderLimit || "",
//           },
//         }
//       );
//       setOrders(response.data.orders);
//       setTotalOrders(response.data.totalOrders);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError(error?.response?.data?.message || error.message);
//     }
//   };

//   useEffect(() => {
//     // Call fetchOrders whenever filters change
//     fetchOrders({
//       customerName: searchText,
//       startDate,
//       endDate,
//       status,
//       orderLimit: time,
//     });
//   }, [currentPage, searchText, startDate, endDate, status, time]);

//   const handleDownloadOrders = async () => {
//     try {
//       setLoadingExport(true);
//       const res = await OrderServices.getAllOrders({
//         page: 1,
//         day: time,
//         method: method,
//         status: status,
//         endDate: endDate,
//         download: true,
//         startDate: startDate,
//         limit: totalOrders,
//         customerName: searchText,
//       });

//       const exportData = res?.orders?.map((order) => ({
//         _id: order.id,
//         invoice: order.invoiceNo,
//         subTotal: getNumberTwo(order.subTotal),
//         shippingCost: getNumberTwo(order.shippingCost),
//         discount: getNumberTwo(order?.discount),
//         total: getNumberTwo(order.amount),
//         paymentMethod: order.method,
//         status: order.status,
//         user_info: order?.customerName,
//         createdAt: order.orderTime,
//         updatedAt: order.updatedAt,
//       }));

//       exportFromJSON({
//         data: exportData,
//         fileName: "orders",
//         exportType: exportFromJSON.types.csv,
//       });
//       setLoadingExport(false);
//     } catch (err) {
//       setLoadingExport(false);
//       notifyError(err?.response?.data?.message || err?.message);
//     }
//   };

//   const handleResetField = () => {
//     // Reset all filter states to their initial values
//     setTime("");
//     setMethod("");
//     setStatus("");
//     setEndDate("");
//     setStartDate("");
//     setSearchText("");
//     searchRef.current.value = "";
//   };
//   const handleSubmit = (e) => {
//     e.preventDefault(); // Prevent default form submission
//     handleSubmitForAll(); // Call the actual submit function you need
//   };

//   return (
//     <>
//       <PageTitle>{t("Orders")}</PageTitle>

//       <AnimatedContent>
//         <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
//           <CardBody>
//             <form onSubmit={handleSubmit}>
//               <div className="grid gap-4 lg:gap-4 xl:gap-6 md:gap-2 md:grid-cols-5 py-2">
//                 <div>
//                   <Input
//                     ref={searchRef}
//                     type="search"
//                     name="search"
//                     placeholder="Search by Customer Name"
//                     value={searchText} 
//                     onChange={(e) => setSearchText(e.target.value)} 
//                   />
//                 </div>
//                 <div>
//                   <Select
//                     value={status} // Controlled select value
//                     onChange={(e) => setStatus(e.target.value)}
//                   >
//                     <option value="" hidden>{t("Status")}</option>
//                     <option value="Delivered">{t("PageOrderDelivered")}</option>
//                     <option value="Pending">{t("PageOrderPending")}</option>
//                     <option value="Processing">{t("PageOrderProcessing")}</option>
//                     <option value="Cancel">{t("OrderCancel")}</option>
//                   </Select>
//                 </div>
//                 <div>
//                   <Select
//                     value={time} // Controlled select value
//                     onChange={(e) => setTime(e.target.value)}
//                   >
//                     <option value="" hidden>{t("Orderlimits")}</option>
//                     <option value="5">{t("DaysOrders5")}</option>
//                     <option value="7">{t("DaysOrders7")}</option>
//                     <option value="15">{t("DaysOrders15")}</option>
//                     <option value="30">{t("DaysOrders30")}</option>
//                   </Select>
//                 </div>
//                 <div>
//                   <Select
//                     value={method} // Controlled select value
//                     onChange={(e) => setMethod(e.target.value)}
//                   >
//                     <option value="" hidden>{t("Method")}</option>
//                     <option value="Cash">{t("Cash")}</option>
//                     <option value="Card">{t("Card")}</option>
//                     <option value="Credit">{t("Credit")}</option>
//                   </Select>
//                 </div>
//                 <div>
//                   {loadingExport ? (
//                     <Button
//                       disabled={true}
//                       type="button"
//                       className="h-12 w-full"
//                     >
//                       <img
//                         src={spinnerLoadingImage}
//                         alt="Loading"
//                         width={20}
//                         height={10}
//                       />
//                       <span className="font-serif ml-2 font-light">
//                         Processing
//                       </span>
//                     </Button>
//                   ) : (
//                     <button
//                       onClick={handleDownloadOrders}
//                       disabled={orders.length <= 0 || loadingExport}
//                       type="button"
//                       className={`${
//                         (orders.length <= 0 || loadingExport) &&
//                         "opacity-50 cursor-not-allowed bg-emerald-600"
//                       } flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600`}
//                     >
//                       Download All Orders
//                       <span className="ml-2 text-base">
//                         <IoCloudDownloadOutline />
//                       </span>
//                     </button>
//                   )}
//                 </div>
//               </div>
//               <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
//                 <div>
//                   <Label>Start Date</Label>
//                   <Input
//                     type="date"
//                     name="startDate"
//                     value={startDate} // Controlled input value
//                     onChange={(e) => setStartDate(e.target.value)}
//                   />
//                 </div>

//                 <div>
//                   <Label>End Date</Label>
//                   <Input
//                     type="date"
//                     name="endDate"
//                     value={endDate} // Controlled input value
//                     onChange={(e) => setEndDate(e.target.value)}
//                   />
//                 </div>
//                 <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
//                   <div className="w-full mx-1">
//                     <Label style={{ visibility: "hidden" }}>Filter</Label>
//                     <Button
//                       type="submit"
//                       className="h-12 w-full bg-emerald-700"
//                     >
//                       Filter
//                     </Button>
//                   </div>

//                   <div className="w-full">
//                     <Label style={{ visibility: "hidden" }}>Reset</Label>
//                     <Button
//                       layout="outline"
//                       onClick={handleResetField}
//                       type="button" // Change type to button to prevent form submission
//                       className="px-4 md:py-1 py-3 text-sm dark:bg-gray-700"
//                     >
//                       <span className="text-black dark:text-gray-200">
//                         Reset
//                       </span>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </AnimatedContent>

//       {loading ? (
//         <span>Loading...</span>
//       ) : error ? (
//         <span className="text-center mx-auto text-red-500">{error}</span>
//       ) : orders.length !== 0 ? (
//         <TableContainer className="mb-8 dark:bg-gray-900">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableCell>{t("InvoiceNo")}</TableCell>
//                 <TableCell>{t("TimeTbl")}</TableCell>
//                 <TableCell>{t("CustomerName")}</TableCell>
//                 <TableCell>{t("MethodTbl")}</TableCell>
//                 <TableCell>{t("AmountTbl")}</TableCell>
//                 <TableCell>{t("OderStatusTbl")}</TableCell>
//                 <TableCell>{t("ActionTbl")}</TableCell>
//                 <TableCell className="text-right">{t("InvoiceTbl")}</TableCell>
//               </tr>
//             </TableHeader>

//             <TableBody className="dark:bg-gray-900">
//               {orders.map((order, i) => (
//                 <TableRow key={i}>
//                   <TableCell>
//                     <span className="font-semibold uppercase text-xs">
//                       {order.invoiceNo}
//                     </span>
//                   </TableCell>
//                   <TableCell>
//                     <span className="text-sm">{order.orderTime}</span>
//                   </TableCell>
//                   <TableCell className="text-xs">
//                     <span className="text-sm">{order.customerName}</span>
//                   </TableCell>
//                   <TableCell>
//                     <span className="text-sm">{order.method}</span>
//                   </TableCell>
//                   <TableCell>
//                     <span className="text-sm">{order.amount}</span>
//                   </TableCell>
//                   <TableCell>
//                     <Status status={order?.status} />
//                   </TableCell>
//                   <TableCell className="text-center">
//                     <SelectStatus
//                       id={order.uuid}
//                       order={order}
//                       actions={order.actions}
//                     />
//                   </TableCell>
//                   <TableCell className="text-right flex justify-end">
//                     <div className="flex justify-between items-center">
//                       <PrintReceipt orderId={order.uuid} />
//                       <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
//                         <Link to={`/order/${order.uuid}`}>
//                           <Tooltip
//                             id="view"
//                             Icon={FiZoomIn}
//                             title={t("ViewInvoice")}
//                             bgColor="#059669"
//                           />
//                         </Link>
//                       </span>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <TableFooter>
//             <Pagination
//               totalResults={totalOrders}
//               resultsPerPage={resultsPerPage}
//               onChange={handleChangePage}
//               label="Order navigation"
//             />
//           </TableFooter>
//         </TableContainer>
//       ) : (
//         <NotFound title="Sorry, There are no orders right now." />
//       )}
//     </>
//   );
// };

// export default Orders;
import {
  Button,
  Card,
  CardBody,
  Input,
  Label,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  TableBody,
  TableRow,
} from "@windmill/react-ui";
import { useContext, useState, useEffect } from "react";
import { IoCloudDownloadOutline } from "react-icons/io5";
import { useTranslation } from "react-i18next";
import exportFromJSON from "export-from-json";
import axios from "axios";
import { SidebarContext } from "@/context/SidebarContext";
import { notifyError } from "@/utils/toast";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import AnimatedContent from "@/components/common/AnimatedContent";
import SelectStatus from "@/components/form/selectOption/SelectStatus";
import OrderServices from "@/services/OrderServices";
import PrintReceipt from "@/components/form/others/PrintReceipt";
import { Link } from "react-router-dom";
import Tooltip from "@/components/tooltip/Tooltip";
import { FiZoomIn } from "react-icons/fi";
import Status from "@/components/table/Status";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const Orders = () => {
  const {
    time,
    setTime,
    status,
    endDate,
    setStatus,
    setEndDate,
    startDate,
    currentPage,
    searchText,
    searchRef,
    method,
    setMethod,
    setStartDate,
    setSearchText,
    handleChangePage,
    handleSubmitForAll,
    resultsPerPage,
  } = useContext(SidebarContext);

  const { t } = useTranslation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingExport, setLoadingExport] = useState(false);
  const [error, setError] = useState("");
  const [totalOrders, setTotalOrders] = useState(0);
  const { currency, getNumber, getNumberTwo } = useUtilsFunction();

  const fetchOrders = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://suft-90bec7a20f24.herokuapp.com/admin/order-filtering?`,
        {
          params: {
            page: currentPage,
            ...params,
          },
        }
      );
      setOrders(response.data.orders);
      setTotalOrders(response.data.totalOrders);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error?.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage]);

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission
    const params = {
      customerName: searchText,
      startDate,
      endDate,
      time, // This is used as order limit in your context
      status,
    };
    fetchOrders(params);
  };
  const handleDownloadOrders = async () => {
        try {
          setLoadingExport(true);
          const res = await OrderServices.getAllOrders({
            page: 1,
            day: time,
            method: method,
            status: status,
            endDate: endDate,
            download: true,
            startDate: startDate,
            limit: totalOrders,
            customerName: searchText,
          });
    
          const exportData = res?.orders?.map((order) => ({
            _id: order.id,
            invoice: order.invoiceNo,
            subTotal: getNumberTwo(order.subTotal),
            shippingCost: getNumberTwo(order.shippingCost),
            discount: getNumberTwo(order?.discount),
            total: getNumberTwo(order.amount),
            paymentMethod: order.method,
            status: order.status,
            user_info: order?.customerName,
            createdAt: order.orderTime,
            updatedAt: order.updatedAt,
          }));
    
          exportFromJSON({
            data: exportData,
            fileName: "orders",
            exportType: exportFromJSON.types.csv,
          });
          setLoadingExport(false);
        } catch (err) {
          setLoadingExport(false);
          notifyError(err?.response?.data?.message || err?.message);
        }
      };
    

  
  
  // const handleResetField = () => {
  //   setTime("");
  //   setMethod("");
  //   setStatus("");
  //   setEndDate("");
  //   setStartDate("");
  //   setSearchText("");
  //   searchRef.current.value = "";
  // };
  const handleResetField = () => {
    setCustomerName("");
    setStartDate("");
    setEndDate("");
    setOrderLimit("");
    setStatus("");
    setSearchText(""),
    fetchOrders(),
    searchRef.current.value = "";
  };
  return (
    <>
      <PageTitle>{t("Orders")}</PageTitle>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form onSubmit={handleSearchSubmit}>
              <div className="grid gap-4 lg:gap-4 xl:gap-6 md:gap-2 md:grid-cols-5 py-2">
                <div>
                  <Input
                    ref={searchRef}
                    type="search"
                    name="search"
                    placeholder="Search by Customer Name"
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div>
                  <Select onChange={(e) => setStatus(e.target.value)}>
                    <option value="" defaultValue hidden>
                      {t("Status")}
                    </option>
                    <option value="Delivered">{t("PageOrderDelivered")}</option>
                    <option value="Pending">{t("PageOrderPending")}</option>
                    <option value="Processing">
                      {t("PageOrderProcessing")}
                    </option>
                    <option value="Cancel">{t("OrderCancel")}</option>
                  </Select>
                </div>
                <div>
                  <Select onChange={(e) => setTime(e.target.value)}>
                    <option value="" defaultValue hidden>
                      {t("Orderlimits")}
                    </option>
                    <option value="5">{t("DaysOrders5")}</option>
                    <option value="7">{t("DaysOrders7")}</option>
                    <option value="15">{t("DaysOrders15")}</option>
                    <option value="30">{t("DaysOrders30")}</option>
                  </Select>
                </div>
                <div>
                  <Select onChange={(e) => setMethod(e.target.value)}>
                    <option value="" defaultValue hidden>
                      {t("Method")}
                    </option>
                    <option value="Cash">{t("Cash")}</option>
                    <option value="Card">{t("Card")}</option>
                    <option value="Credit">{t("Credit")}</option>
                  </Select>
                </div>
                <div>
                  {loadingExport ? (
                    <Button
                      disabled={true}
                      type="button"
                      className="h-12 w-full"
                    >
                      <img
                        src={spinnerLoadingImage}
                        alt="Loading"
                        width={20}
                        height={10}
                      />
                      <span className="font-serif ml-2 font-light">
                        Processing
                      </span>
                    </Button>
                  ) : (
                    <button
                      onClick={handleDownloadOrders}
                      disabled={orders.length <= 0 || loadingExport}
                      type="button"
                      className={`${
                        (orders.length <= 0 || loadingExport) &&
                        "opacity-50 cursor-not-allowed bg-emerald-600"
                      } flex items-center justify-center text-sm leading-5 h-12 w-full text-center transition-colors duration-150 font-medium px-6 py-2 rounded-md text-white bg-emerald-500 border border-transparent active:bg-emerald-600 hover:bg-emerald-600`}
                    >
                      Download All Orders
                      <span className="ml-2 text-base">
                        <IoCloudDownloadOutline />
                      </span>
                    </button>
                  )}
                </div>
              </div>
              <div className="grid gap-4 lg:gap-6 xl:gap-6 lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 py-2">
                <div>
                  <Label>Start Date</Label>
                  <Input
                    type="date"
                    name="startDate"
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>

                <div>
                  <Label>End Date</Label>
                  <Input
                    type="date"
                    name="endDate"
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <div className="mt-2 md:mt-0 flex items-center xl:gap-x-4 gap-x-1 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <div className="w-full mx-1">
                    <Label style={{ visibility: "hidden" }}>Filter</Label>
                    <Button
                      type="submit"
                      className="h-12 w-full bg-emerald-700"
                    >
                      Filter
                    </Button>
                  </div>

                  <div className="w-full">
                    <Label style={{ visibility: "hidden" }}>Reset</Label>
                    <Button
                      layout="outline"
                      onClick={handleResetField}
                      type="reset"
                      className="px-4 md:py-1 py-3 text-sm dark:bg-gray-700"
                    >
                      <span className="text-black dark:text-gray-200">
                        Reset
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <span>Loading...</span>
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : orders.length !== 0 ? (
        <TableContainer className="mb-8 dark:bg-gray-900">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("InvoiceNo")}</TableCell>
                <TableCell>{t("TimeTbl")}</TableCell>
                <TableCell>{t("CustomerName")}</TableCell>
                <TableCell>{t("MethodTbl")}</TableCell>
                <TableCell>{t("AmountTbl")}</TableCell>
                <TableCell>{t("OderStatusTbl")}</TableCell>
                <TableCell>{t("ActionTbl")}</TableCell>
                <TableCell className="text-right">{t("InvoiceTbl")}</TableCell>
              </tr>
            </TableHeader>

            <TableBody className="dark:bg-gray-900">
              {orders.map((order, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <span className="font-semibold uppercase text-xs">
                      {order.invoiceNo}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.orderTime}</span>
                  </TableCell>
                  <TableCell className="text-xs">
                    <span className="text-sm">{order.customerName}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.method}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm">{order.amount}</span>
                  </TableCell>
                  <TableCell>
                    <Status status={order?.status} />
                  </TableCell>
                  <TableCell className="text-center">
                    <SelectStatus
                      id={order.uuid}
                      order={order}
                      actions={order.actions}
                    />
                  </TableCell>
                  <TableCell className="text-right flex justify-end">
                    <div className="flex justify-between items-center">
                      <PrintReceipt orderId={order.uuid} />
                      <span className="p-2 cursor-pointer text-gray-400 hover:text-emerald-600">
                        <Link to={`/order/${order.uuid}`}>
                          <Tooltip
                            id="view"
                            Icon={FiZoomIn}
                            title={t("ViewInvoice")}
                            bgColor="#059669"
                          />
                        </Link>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TableFooter>
            <Pagination
              totalResults={totalOrders}
              resultsPerPage={resultsPerPage}
              onChange={handleChangePage}
              label="Order navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound message="No Orders Found" />
      )}
    </>
  );
};

export default Orders;
