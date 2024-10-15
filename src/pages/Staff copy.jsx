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
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";

//internal import

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

  const { data, loading, error } = useAsync(() =>
    AdminServices.getAllStaff({ email: adminInfo.email })
  );

  const {
    userRef,
    setRole,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
    handleSubmitUser,
  } = useFilter(data);

  const { t } = useTranslation();

  // handle reset filed
  const handleResetField = () => {
    setRole("");
    userRef.current.value = "";
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
                  placeholder={t("StaffSearchBy")}
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 mt-5 mr-1"
                ></button>
              </div>
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
                <Select onChange={(e) => setRole(e.target.value)}>
                  <option value="All" defaultValue hidden>
                    {t("StaffRole")}
                  </option>
                  <option value="Admin">{t("StaffRoleAdmin")}</option>
                  <option value="Cashier">{t("SelectCashiers")}</option>
                  <option value="Super Admin">{t("SelectSuperAdmin")}</option>
                </Select>
              </div>

              <div className="md:w-56 lg:w-56 xl:w-56 w-full">
                <Button
                  onClick={toggleDrawer}
                  className="w-full h-12 rounded-md"
                >
                  <span className="mr-3">
                    <FiPlus />
                  </span>
                  {t("AddStaff")}
                </Button>
              </div>
              <div className="md:mt-0 xl:gap-x-4 gap-x-1 md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 mt-2">
                <div className="w-full mx-1">
                  <Button type="submit" className="bg-emerald-700 w-full h-12">
                    Filter
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
        // <Loading loading={loading} />
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
                {/* <TableCell>{t("StaffJoiningDateTbl")}</TableCell> */}
                {/* <TableCell>{t("StaffRoleTbl")}</TableCell> */}
                {/* <TableCell className="text-center">
                  {t("OderStatusTbl")}
                </TableCell> */}
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
