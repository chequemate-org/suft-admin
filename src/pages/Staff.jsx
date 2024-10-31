import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Select,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import axios from "axios";

// Internal imports
import useAsync from "@/hooks/useAsync";
import useFilter from "@/hooks/useFilter";
import MainDrawer from "@/components/drawer/MainDrawer";
import StaffDrawer from "@/components/drawer/StaffDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import StaffTable from "@/components/staff/StaffTable";
import NotFound from "@/components/table/NotFound";
import PageTitle from "@/components/Typography/PageTitle";
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import AdminServices from "@/services/AdminServices";
import AnimatedContent from "@/components/common/AnimatedContent";

const Staff = () => {
  const { state } = useContext(AdminContext);
  const { adminInfo } = state;
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const [data, setData] = useState({ products: [], totalDoc: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [role, setRole] = useState("");
  const [inputValue, setInputValue] = useState("");

  const { t } = useTranslation();

  const { loading, error } = useAsync(() =>
    AdminServices.getAllStaff({ email: adminInfo.email, search: searchTerm, role })
  );

  const {
    userRef,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
  } = useFilter(data);

  const handleResetField = () => {
    setRole("");
    setInputValue("");
  };

  const handleSubmitUser = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <PageTitle>{t("StaffPageTitle")} </PageTitle>
      <MainDrawer>
        <StaffDrawer />
      </MainDrawer>

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
                  name="search"
                  value={inputValue}s
                  placeholder={t("StaffSearchBy")}
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 mt-5 mr-1"
                ></button>
              </div>

              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
                <Select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="" defaultValue hidden>
                    {t("StaffRole")}
                  </option>
                  <option value="Admin">{t("StaffRoleAdmin")}</option>
                  <option value="Cashier">{t("SelectCashiers")}</option>
                  <option value="Super Admin">{t("SelectSuperAdmin")}</option>
                </Select>
              </div>

              <div className="md:w-56 lg:w-56 xl:w-56 w-full">
                <Button onClick={toggleDrawer} className="w-full h-12 rounded-md">
                  <span className="mr-3">
                    <FiPlus />
                  </span>
                  {t("AddStaff")}
                </Button>
              </div>

              <div className="md:mt-0 xl:gap-x-4 gap-x-1 md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 mt-2">
                <div className="w-full mx-1">
                  <Button type="submit" className="bg-emerald-700 w-full h-12">
                    {t("Filter")}
                  </Button>
                </div>

                <div className="w-full">
                  <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="md:py-1 dark:bg-gray-700 px-4 py-3 text-sm"
                  >
                    <span className="dark:text-gray-200 text-black">Reset</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={7} width={163} height={20} />
      ) : error ? (
        <span className="mx-auto text-center text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>{t("StaffNameTbl")}</TableCell>
                <TableCell>{t("StaffEmailTbl")}</TableCell>
                <TableCell>{t("StaffContactTbl")}</TableCell>
                <TableCell>{t("StaffJoiningDateTbl")}</TableCell>
                <TableCell>{t("StaffRoleTbl")}</TableCell>
                <TableCell className="text-center">
                  {t("PublishedTbl")}
                </TableCell>
                <TableCell className="text-right">
                  {t("StaffActionsTbl")}
                </TableCell>
              </tr>
            </TableHeader>

            <StaffTable staffs={dataTable} lang={lang} />
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
        <NotFound title="Sorry, There are no staff right now." />
      )}
    </>
  );
};

export default Staff;
