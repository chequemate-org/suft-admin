
import {
  Button,
  Card,
  CardBody,
  Input,
  Pagination,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
} from "@windmill/react-ui";
import { useContext, useState } from "react";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { useTranslation } from "react-i18next";

//internal import
import { SidebarContext } from "@/context/SidebarContext";
import CouponServices from "@/services/CouponServices";
import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import PageTitle from "@/components/Typography/PageTitle";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import MainDrawer from "@/components/drawer/MainDrawer";
import CouponDrawer from "@/components/drawer/CouponDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import CouponTable from "@/components/coupon/CouponTable";
import NotFound from "@/components/table/NotFound";
import UploadMany from "@/components/common/UploadMany";
import AnimatedContent from "@/components/common/AnimatedContent";

const Coupons = () => {
  const { t } = useTranslation();
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(CouponServices.getAllCoupons);
  const [searchQuery, setSearchQuery] = useState("");
  // console.log('data',data)
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);

  const { allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const {
    filename,
    isDisabled,
    couponRef,
    dataTable,
    serviceData,
    totalResults,
    resultsPerPage,
    handleChangePage,
    handleSelectFile,
    setSearchCoupon,
    handleSubmitCoupon,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data?.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // handle reset field function
  // const handleResetField = () => {
  //   setSearchCoupon("");
  //   couponRef.current.value = "";
  // };
  
  const handleResetField = () => {
    setSearchTerm("");
    setSearchCoupon("");
    couponRef.current.value = "";
    refetch(); // Refetch all coupons when resetting
  };
  const handleSearchCoupons = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      refetch(); // If search term is empty, fetch all coupons
      return;
    }
    try {
      const result = await CouponServices.searchCoupons(searchTerm);
      setFilteredCoupons(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <PageTitle>{t("CouponspageTitle")}</PageTitle>
      <DeleteModal
        ids={allId}
        setIsCheck={setIsCheck}
        title="Selected Coupon"
      />
      <BulkActionDrawer ids={allId} title="Coupons" />

      <MainDrawer>
        <CouponDrawer id={serviceId} />
      </MainDrawer>

      <AnimatedContent>
        <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
          <CardBody>
            <form
              onSubmit={handleSubmitCoupon}
              className="lg:gap-6 xl:gap-6 xl:flex grid gap-4 py-3"
            >
              <div className="xl:w-1/2 md:w-full flex justify-start">
                <UploadMany
                  title="Coupon"
                  exportData={data}
                  filename={filename}
                  isDisabled={isDisabled}
                  handleSelectFile={handleSelectFile}
                  handleUploadMultiple={handleUploadMultiple}
                  handleRemoveSelectFile={handleRemoveSelectFile}
                />
              </div>

              <div className="lg:flex md:flex xl:justify-end xl:w-1/2 md:w-full md:justify-start flex-grow-0">
                <div className="md:w-40 lg:w-40 xl:w-40 lg:mb-0 w-full mb-3 mr-3">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleUpdateMany(isCheck)}
                    className="btn-gray w-full h-12 text-gray-600 rounded-md"
                  >
                    <span className="mr-2">
                      <FiEdit />
                    </span>
                    {t("BulkAction")}
                  </Button>
                </div>

                <div className="md:w-32 lg:w-32 xl:w-32 lg:mb-0 w-full mb-3 mr-3">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleDeleteMany(isCheck)}
                    className="btn-red w-full h-12 bg-red-500 rounded-md"
                  >
                    <span className="mr-2">
                      <FiTrash2 />
                    </span>

                    {t("Delete")}
                  </Button>
                </div>

                <div className="md:w-48 lg:w-48 xl:w-48 w-full">
                  <Button
                    onClick={toggleDrawer}
                    className="w-full h-12 rounded-md"
                  >
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("AddCouponsBtn")}
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
          <CardBody>
            <form
            onSubmit={handleSearchCoupons}
              // onSubmit={handleSubmitCoupon}
              className="lg:gap-6 xl:gap-6 md:flex xl:flex grid gap-4 py-3"
            >
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
                <Input
                  ref={couponRef}
                  type="search"
                  placeholder={t("SearchCoupon")}
                />
              </div>
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
                <div className="w-full mx-1">
                  <Button type="submit" className="bg-emerald-700 w-full h-12">
                    Filter
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button
                    layout="outline"
                    onClick={handleResetField}
                    type="reset"
                    className="md:py-1 dark:bg-gray-700 h-12 px-4 py-2 text-sm"
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
        <TableLoading row={12} col={8} width={140} height={20} />
      ) : error ? (
        <span className="mx-auto text-center text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    handleClick={handleSelectAll}
                    isChecked={isCheckAll}
                  />
                </TableCell>
                <TableCell>{t("CoupTblCampaignsName")}</TableCell>
                <TableCell>{t("CoupTblCode")}</TableCell>
                <TableCell>{t("Discount")}</TableCell>

                <TableCell className="text-center">
                  {t("catPublishedTbl")}
                </TableCell>
                <TableCell>{t("CoupTblEndDate")}</TableCell>
                {/* <TableCell>{t("CoupTblExpiryDate")}</TableCell> */}
                <TableCell>{t("CoupTblStatus")}</TableCell>
                <TableCell className="text-right">
                  {t("CoupTblActions")}
                </TableCell>
              </tr>
            </TableHeader>
            <CouponTable
              lang={lang}
              isCheck={isCheck}
              coupons={dataTable}
              setIsCheck={setIsCheck}
            />
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
        <NotFound title="Sorry, There are no coupons right now." />
      )}
    </>
  );
};

export default Coupons;
