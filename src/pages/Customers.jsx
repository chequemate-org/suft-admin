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
  const userRef = useRef(null);
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage] = useState(10); 
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState({ products: [], totalDoc: 0 });

  // Fetch customer data from the API
  useEffect(() => {
    const fetchCustomers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users`,
          {
            params: {
              // Add any necessary params here if needed
            },
          }
        );

        console.log('API Response:', response); // Logging the full response

        const customerArray = response.data?.data?.data || [];
        setCustomerData(customerArray);
        setTotalResults(customerArray.length);
      } catch (err) {
        console.error('Error fetching customers:', err); // Logging errors
        setError("Failed to load customer data");
      } finally {
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [currentPage]);

  // Handle search and filtering logic
  const handleSubmitUser = (event) => {
    event.preventDefault();
    // Implement search or filtering logic if needed
  };

  const handleResetField = () => {
    if (userRef.current) userRef.current.value = "";
    // Reset any other filters if needed
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
    // Implement pagination logic if needed
  };

  const ProductSearch = async () => {
    try {
      const response = await axios.get("https://suft-90bec7a20f24.herokuapp.com/admin/search-users?searchType=user&email", {
        params: {
          searchType: search,
          email: email,
          
        },
      });
      setData({
        products: response.data.data,
        totalDoc: response.data.totalDocs,
      });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    ProductSearch();
  }, [search, email]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    ProductSearch(); // Trigger fetch with updated parameters
  };

  // Reset the filters
  const ResetField = () => {
    setSearch("");
    setEmail("");
    ProductSearch();
  };
  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.products.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
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
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  name="search"
                  placeholder={t("CustomersPageSearchPlaceholder")}
                />
              </div>

              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
                <Button type="submit" className="bg-emerald-700 w-full h-12">
                  Filter
                </Button>

                <Button
                  layout="outline"
                  onClick={ResetField}
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
      ) : customerData.length ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("CustomersId")}</TableCell>
                <TableCell>{t("CustomersJoiningDate")}</TableCell>
                <TableCell>{t("CustomersName")}</TableCell>
                <TableCell>{t("CustomersEmail")}</TableCell>
                <TableCell>{t("CustomersPhone")}</TableCell>
                <TableCell className="text-right">{t("CustomersActions")}</TableCell>
              </tr>
            </TableHeader>
            {/* Passing customerData to CustomerTable with a key prop */}
            <CustomerTable customers={customerData} />
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
