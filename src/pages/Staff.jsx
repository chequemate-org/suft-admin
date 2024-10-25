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
  const [resultsPerPage] = useState(10); // Set the number of results per page
  const [currentPage, setCurrentPage] = useState(1);
  const [inputValue, setInputValue] = useState("");

  // Fetch customer data from the API
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users`,
        {
          params: {
            // Optionally add other query params here
          },
        }
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

  useEffect(() => {
    fetchCustomers(); // Initial fetch
  }, [currentPage]);

  // Handle search and filtering logic
  const handleSearch = async (searchType, email) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://suft-90bec7a20f24.herokuapp.com/admin/search-users?",
        {
          params: { searchType, email },
        }
      );

      const searchResults = response.data?.data || [];
      setCustomerData(searchResults);
      setTotalResults(searchResults.length);
      setError(null); // Clear any previous errors on successful search
    } catch (err) {
      console.error("Error fetching search results:", err);
      setError("No matching customers found");
    } finally {
      setLoading(false);
    }
  };

  // Parse input and trigger search
  const handleSubmitUser = (event) => {
    event.preventDefault();
    const [searchType, email] = inputValue.split(":");

    if (!searchType || !email) {
      setError("Please enter a valid format (searchType:email)");
      return;
    }

    handleSearch(searchType.trim(), email.trim()); // Use trimmed values
  };

  // Clear input and reset data
  const handleResetField = () => {
    setInputValue("");
    fetchCustomers(); // Reset to all customers
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
              {/* Search Input */}
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
                <Input
                  ref={userRef}
                  type="search"
                  name="search"
                  placeholder={t("CustomersPageSearchPlaceholder")}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
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
