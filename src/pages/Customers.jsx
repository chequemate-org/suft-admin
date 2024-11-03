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
import React, { useEffect, useState } from "react";
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
  const [totalResults, setTotalResults] = useState(0);
  const [resultsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [isSearching, setIsSearching] = useState(false); // Flag to differentiate between search and regular fetch

  // Fetch customers based on the current mode (search or regular)
  const fetchCustomers = async (page, query = "") => {
    setLoading(true);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_APP_API_BASE_URL}/admin/users${query ? '/search' : ''}`,
        {
          params: query
            ? { searchType: "email", email: query }
            : { page, limit: resultsPerPage },
        }
      );

      const customerArray = response.data?.data?.data || [];
      setCustomerData(customerArray);
      setTotalResults(response.data?.data?.total || customerArray.length);
    } catch (err) {
      console.error("Error fetching customers:", err);
      setError("Failed to load customer data");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission for search
  const handleSubmitUser = (event) => {
    event.preventDefault();
    setCurrentPage(1); // Reset pagination to the first page on a new search
    setIsSearching(Boolean(searchQuery.trim()));
    fetchCustomers(1, searchQuery.trim());
  };

  // Handle pagination change
  const handleChangePage = (page) => {
    setCurrentPage(page);
    if (isSearching) {
      fetchCustomers(page, searchQuery); // Maintain search results across pages if in search mode
    } else {
      fetchCustomers(page);
    }
  };

  // Reset search
  const handleResetField = () => {
    setSearchQuery("");
    setCurrentPage(1);
    setIsSearching(false);
    fetchCustomers(1); // Fetch all customers without search filters
  };

  // Initial fetch on component mount or when `currentPage` changes
  useEffect(() => {
    if (!isSearching) fetchCustomers(currentPage);
  }, [currentPage, isSearching]); // Only refetch when page or mode changes

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
                  type="search"
                  name="search"
                  placeholder={t("CustomersPageSearchPlaceholder")}
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
                <TableCell className="text-right">
                  {t("CustomersActions")}
                </TableCell>
              </tr>
            </TableHeader>
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
