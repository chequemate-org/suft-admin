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

  return (
    <>
      <PageTitle>{t("CustomersPage")}</PageTitle>

      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody>
            <form
              onSubmit={handleSubmitUser}
              className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
            >
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={userRef}
                  type="search"
                  name="search"
                  placeholder={t("CustomersPageSearchPlaceholder")}
                />
              </div>

              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Button type="submit" className="h-12 w-full bg-emerald-700">
                  Filter
                </Button>

                <Button
                  layout="outline"
                  onClick={handleResetField}
                  type="reset"
                  className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                >
                  <span className="text-black dark:text-gray-200">Reset</span>
                </Button>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
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
