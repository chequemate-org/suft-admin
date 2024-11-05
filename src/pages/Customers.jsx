// import {
//   Card,
//   Button,
//   CardBody,
//   Input,
//   Pagination,
//   Table,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
// } from "@windmill/react-ui";
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";

// // Internal imports
// import CustomerTable from "@/components/customer/CustomerTable";
// import TableLoading from "@/components/preloader/TableLoading";
// import NotFound from "@/components/table/NotFound";
// import PageTitle from "@/components/Typography/PageTitle";
// import AnimatedContent from "@/components/common/AnimatedContent";

// const Customers = () => {
//   const { t } = useTranslation();
//   const [customerData, setCustomerData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(""); // Single search query state
//   const userRef = useRef(null);
//   const [totalResults, setTotalResults] = useState(0);
//   const [resultsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchCustomers();
//   }, [currentPage]);

//   const fetchCustomers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users`
//       );

//       const customerArray = response.data?.data?.data || [];
//       setCustomerData(customerArray);
//       setTotalResults(customerArray.length);
//     } catch (err) {
//       console.error("Error fetching customers:", err);
//       setError("Failed to load customer data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_API_BASE_URL}/admin/search-users?`,
//         {
//           params: {
//             query: searchQuery, // Send the single search query parameter
//           },
//         }
//       );

//       const filteredData = response.data?.data?.data || [];
//       setCustomerData(filteredData);
//       setTotalResults(filteredData.length);
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Failed to load search results");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitUser = (event) => {
//     event.preventDefault();
//     handleSearch();
//   };

//   const handleResetField = () => {
//     setSearchQuery("");
//     fetchCustomers(); // Reset to fetch all customers
//   };

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <PageTitle>{t("CustomersPage")}</PageTitle>

//       <AnimatedContent>
//         <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
//           <CardBody>
//             <form
//               onSubmit={handleSubmitUser}
//               className="lg:gap-6 xl:gap-6 md:flex xl:flex grid gap-4 py-3"
//             >
//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                 <Input
//                   ref={userRef}
//                   type="text"
//                   name="searchQuery"
//                   placeholder={t("Enter search query (type or email)")}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
//                 <Button type="submit" className="bg-emerald-700 w-full h-12">
//                   Filter
//                 </Button>

//                 <Button
//                   layout="outline"
//                   onClick={handleResetField}
//                   type="reset"
//                   className="md:py-1 dark:bg-gray-700 h-12 px-4 py-2 text-sm"
//                 >
//                   <span className="dark:text-gray-200 text-black">Reset</span>
//                 </Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </AnimatedContent>

//       {loading ? (
//         <TableLoading row={12} col={6} width={190} height={20} />
//       ) : error ? (
//         <span className="mx-auto text-center text-red-500">{error}</span>
//       ) : customerData?.length ? (
//         <TableContainer className="mb-8">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableCell>{t("CustomersId")}</TableCell>
//                 <TableCell>{t("CustomersJoiningDate")}</TableCell>
//                 <TableCell>{t("CustomersName")}</TableCell>
//                 <TableCell>{t("CustomersEmail")}</TableCell>
//                 <TableCell>{t("CustomersPhone")}</TableCell>
//                 <TableCell className="text-right">
//                   {t("CustomersActions")}
//                 </TableCell>
//               </tr>
//             </TableHeader>
//             <CustomerTable customers={customerData} />
//           </Table>
//           <TableFooter>
//             <Pagination
//               totalResults={totalResults}
//               resultsPerPage={resultsPerPage}
//               onChange={handleChangePage}
//               label="Table navigation"
//             />
//           </TableFooter>
//         </TableContainer>
//       ) : (
//         <NotFound title="Sorry, There are no customers right now." />
//       )}
//     </>
//   );
// };

// export default Customers;
// import {
//   Card,
//   Button,
//   CardBody,
//   Input,
//   Pagination,
//   Table,
//   TableCell,
//   TableContainer,
//   TableFooter,
//   TableHeader,
// } from "@windmill/react-ui";
// import React, { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import { useTranslation } from "react-i18next";

// // Internal imports
// import CustomerTable from "@/components/customer/CustomerTable";
// import TableLoading from "@/components/preloader/TableLoading";
// import NotFound from "@/components/table/NotFound";
// import PageTitle from "@/components/Typography/PageTitle";
// import AnimatedContent from "@/components/common/AnimatedContent";

// const Customers = () => {
//   const { t } = useTranslation();
//   const [customerData, setCustomerData] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const userRef = useRef(null);
//   const [totalResults, setTotalResults] = useState(0);
//   const [resultsPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);

//   useEffect(() => {
//     fetchCustomers();
//   }, [currentPage]);

//   const fetchCustomers = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users`
//       );

//       const customerArray = response.data?.data?.data || [];
//       setCustomerData(customerArray);
//       setTotalResults(customerArray.length);
//     } catch (err) {
//       console.error("Error fetching customers:", err);
//       setError("Failed to load customer data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_APP_API_BASE_URL}/admin/search-users`,
//         {
//           params: {
//             query: searchQuery,
//           },
//         }
//       );

//       const filteredData = response.data?.data?.data || [];
//       setCustomerData(filteredData); // Update with filtered data
//       setTotalResults(filteredData.length);
//     } catch (err) {
//       console.error("Search error:", err);
//       setError("Failed to load search results");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSubmitUser = (event) => {
//     event.preventDefault();
//     handleSearch();
//   };

//   const handleResetField = () => {
//     setSearchQuery("");
//     fetchCustomers();
//   };

//   const handleChangePage = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <>
//       <PageTitle>{t("CustomersPage")}</PageTitle>

//       <AnimatedContent>
//         <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
//           <CardBody>
//             <form
//               onSubmit={handleSubmitUser}
//               className="lg:gap-6 xl:gap-6 md:flex xl:flex grid gap-4 py-3"
//             >
//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                 <Input
//                   ref={userRef}
//                   type="text"
//                   name="searchQuery"
//                   placeholder={t("Enter search query (type or email)")}
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>

//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
//                 <Button type="submit" className="bg-emerald-700 w-full h-12">
//                   Filter
//                 </Button>

//                 <Button
//                   layout="outline"
//                   onClick={handleResetField}
//                   type="reset"
//                   className="md:py-1 dark:bg-gray-700 h-12 px-4 py-2 text-sm"
//                 >
//                   <span className="dark:text-gray-200 text-black">Reset</span>
//                 </Button>
//               </div>
//             </form>
//           </CardBody>
//         </Card>
//       </AnimatedContent>

//       {loading ? (
//         <TableLoading row={12} col={6} width={190} height={20} />
//       ) : error ? (
//         <span className="mx-auto text-center text-red-500">{error}</span>
//       ) : customerData?.length ? (
//         <TableContainer className="mb-8">
//           <Table>
//             <TableHeader>
//               <tr>
//                 <TableCell>{t("CustomersId")}</TableCell>
//                 <TableCell>{t("CustomersJoiningDate")}</TableCell>
//                 <TableCell>{t("CustomersName")}</TableCell>
//                 <TableCell>{t("CustomersEmail")}</TableCell>
//                 <TableCell>{t("CustomersPhone")}</TableCell>
//                 <TableCell className="text-right">
//                   {t("CustomersActions")}
//                 </TableCell>
//               </tr>
//             </TableHeader>
//             {/* Pass customerData to CustomerTable */}
//             <CustomerTable customers={customerData} fetchCustomers={fetchCustomers} />
//           </Table>
//           <TableFooter>
//             <Pagination
//               totalResults={totalResults}
//               resultsPerPage={resultsPerPage}
//               onChange={handleChangePage}
//               label="Table navigation"
//             />
//           </TableFooter>
//         </TableContainer>
//       ) : (
//         <NotFound title="Sorry, There are no customers right now." />
//       )}
//     </>
//   );
// };

// export default Customers;
import {
  Card,
  Button,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

// Internal imports
import CustomerTable from "@/components/customer/CustomerTable";
import TableLoading from "@/components/preloader/TableLoading";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import AnimatedContent from "@/components/common/AnimatedContent";

const Customers = () => {
const { t } = useTranslation();
const [customerData, setCustomerData] = useState([]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [searchQuery, setSearchQuery] = useState("");
const userRef = useRef(null);
const [totalResults, setTotalResults] = useState(0);
const [resultsPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(1);

useEffect(() => {
  fetchCustomers();
}, [currentPage]);

const fetchCustomers = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users`
    );

    const customerArray = response.data?.data?.data || [];
    setCustomerData(customerArray);
    setTotalResults(customerArray.length);
  } catch (err) {
    console.error("Error fetching customers:", err);
    setError("Failed to load customer data");
  } finally {
    setLoading(false);
  }
};

const handleSearch = async () => {
  setLoading(true);
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_APP_API_BASE_URL}/admin/search-users?`,
      {
        params: {
          query: searchQuery,
        },
      }
    );

    const filteredData = response.data?.result || [];
    setCustomerData(filteredData);
    console.log(customerData);
    setTotalResults(filteredData.length);
  } catch (err) {
    console.error("Search error:", err);
    setError("Failed to load search results");
  } finally {
    setLoading(false);
  }
};

const handleSubmitUser = (event) => {
  event.preventDefault();
  handleSearch();
};

const handleResetField = () => {
  setSearchQuery("");
  fetchCustomers();
};

const handleChangePage = (page) => {
  setCurrentPage(page);
};

return (
  <>
    <PageTitle>{t("CustomersPage")}</PageTitle>

    <AnimatedContent>
      <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
        <CardBody>
          <form
            onSubmit={handleSubmitUser}
            className="lg:gap-6 xl:gap-6 md:flex xl:flex grid gap-4 py-3"
          >
            <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
              <Input
                ref={userRef}
                type="text"
                name="searchQuery"
                placeholder={t("Enter search query (type or email)")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
              <Button type="submit" className="bg-emerald-700 w-full h-12">
                Filter
              </Button>

              <Button
                layout="outline"
                onClick={handleResetField}
                type="reset"
                className="md:py-1 dark:bg-gray-700 h-12 px-4 py-2 text-sm"
              >
                <span className="dark:text-gray-200 text-black">Reset</span>
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </AnimatedContent>

    {loading ? (
      <TableLoading row={12} col={6} width={190} height={20} />
    ) : error ? (
      <span className="mx-auto text-center text-red-500">{error}</span>
    ) : customerData?.length ? (
      <TableContainer className="mb-8">
        <Table>
          <TableHeader>
            <tr>
              <TableCell>{t("CustomersId")}</TableCell>
              <TableCell>{t("CustomersJoiningDate")}</TableCell>
              <TableCell>{t("CustomersName")}</TableCell>
              <TableCell>{t("CustomersEmail")}</TableCell>
              <TableCell>{t("CustomersPhone")}</TableCell>
              <TableCell className="text-right">
                {t("CustomersActions")}
              </TableCell>
            </tr>
          </TableHeader>
          <CustomerTable customers={customerData} fetchCustomers={fetchCustomers} />
        </Table>
        <TableFooter>
          <Pagination
            totalResults={totalResults}
            resultsPerPage={resultsPerPage}
            onChange={handleChangePage}
            label="Table navigation"
          />
        </TableFooter>
      </TableContainer>
    ) : (
      <NotFound title="Sorry, There are no customers right now." />
    )}
  </>
);
};

export default Customers;