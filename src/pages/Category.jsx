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
import { useTranslation } from "react-i18next";
import { FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";

// internal import
import useAsync from "@/hooks/useAsync";
import { SidebarContext } from "@/context/SidebarContext";
import CategoryServices from "@/services/CategoryServices";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import useFilter from "@/hooks/useFilter";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import PageTitle from "@/components/Typography/PageTitle";
import MainDrawer from "@/components/drawer/MainDrawer";
import CategoryDrawer from "@/components/drawer/CategoryDrawer";
import UploadMany from "@/components/common/UploadMany";
import SwitchToggleChildCat from "@/components/form/switch/SwitchToggleChildCat";
import TableLoading from "@/components/preloader/TableLoading";
import CheckBox from "@/components/form/others/CheckBox";
import CategoryTable from "@/components/category/CategoryTable";
import NotFound from "@/components/table/NotFound";
import AnimatedContent from "@/components/common/AnimatedContent";

const Category = () => {
  const { toggleDrawer, lang } = useContext(SidebarContext);
  const { data, loading, error } = useAsync(CategoryServices.getAllCategory);
  const { data: getAllCategories } = useAsync(CategoryServices.getAllCategories);
  const { handleDeleteMany, allId, handleUpdateMany, serviceId } = useToggleDrawer();
  const { t } = useTranslation();

  const {
    handleSubmitCategory,
    categoryRef,
    totalResults,
    resultsPerPage,
    dataTable,
    serviceData,
    handleChangePage,
    filename,
    isDisabled,
    setCategoryType,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useFilter(data[0]?.children ? data[0]?.children : data);

  // react hooks
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [showChild, setShowChild] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupon, setFilteredCoupon] = useState([]); // To store filtered data

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data[0]?.children.map((li) => li._id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // handle reset field function
  const handleResetField = () => {
    setSearchTerm("");
    setCategoryType("");
    categoryRef.current.value = "";
    setFilteredCoupon(null); // Reset the filteredCoupon to null when resetting
  };

  const handleSearchCategory = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      setFilteredCoupon(null); // Reset filteredCoupon if search is empty
      return;
    }
    try {
      const result = await CategoryServices.searchCategory(searchTerm);
      setFilteredCoupon(result.data); // Store search result in filteredCoupon
      console.log(result);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <PageTitle>{t("Category")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} />

      <BulkActionDrawer
        ids={allId}
        title="Categories"
        lang={lang}
        data={data}
        isCheck={isCheck}
      />

      <MainDrawer>
        <CategoryDrawer id={serviceId} data={data} lang={lang} />
      </MainDrawer>

      <AnimatedContent>
        <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
        <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
          <CardBody className="">
            <form
              onSubmit={handleSubmitCategory}
              className="lg:gap-6 xl:gap-6 xl:flex grid gap-4 py-3"
              className="lg:gap-6 xl:gap-6 xl:flex grid gap-4 py-3"
            >
              <div className="xl:w-1/2 md:w-full flex justify-start w-1/2">
              <div className="xl:w-1/2 md:w-full flex justify-start w-1/2">
                <UploadMany
                  title="Categories"
                  exportData={getAllCategories}
                  filename={filename}
                  isDisabled={isDisabled}
                  handleSelectFile={handleSelectFile}
                  handleUploadMultiple={handleUploadMultiple}
                  handleRemoveSelectFile={handleRemoveSelectFile}
                />
              </div>

              <div className="lg:flex md:flex xl:justify-end xl:w-1/2 md:w-full md:justify-start flex-grow-0">
                <div className="md:w-40 lg:w-40 xl:w-40 lg:mb-0 w-full mb-3 mr-3">
                <div className="md:w-40 lg:w-40 xl:w-40 lg:mb-0 w-full mb-3 mr-3">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleUpdateMany(isCheck)}
                    className="btn-gray w-full h-12 text-gray-600 rounded-md"
                    className="btn-gray w-full h-12 text-gray-600 rounded-md"
                  >
                    <span className="mr-2">
                      <FiEdit />
                    </span>
                    {t("BulkAction")}
                  </Button>
                </div>
                <div className="md:w-32 lg:w-32 xl:w-32 lg:mb-0 w-full mb-3 mr-3">
                <div className="md:w-32 lg:w-32 xl:w-32 lg:mb-0 w-full mb-3 mr-3">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleDeleteMany(isCheck)}
                    className="disabled btn-red w-full h-12 bg-red-500 rounded-md"
                    className="disabled btn-red w-full h-12 bg-red-500 rounded-md"
                  >
                    <span className="mr-2">
                      <FiTrash2 />
                    </span>
                    {t("Delete")}
                  </Button>
                </div>
                <div className="md:w-48 lg:w-48 xl:w-48 w-full">
                  <Button onClick={toggleDrawer} className="w-full h-12 rounded-md">
                <div className="md:w-48 lg:w-48 xl:w-48 w-full">
                  <Button onClick={toggleDrawer} className="w-full h-12 rounded-md">
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("AddCategory")}
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="dark:bg-gray-800 rounded-0 min-w-0 mb-4 overflow-hidden bg-white rounded-t-lg shadow-xs">
        <Card className="dark:bg-gray-800 rounded-0 min-w-0 mb-4 overflow-hidden bg-white rounded-t-lg shadow-xs">
          <CardBody>
            <form
              onClick={handleSearch}
              className="lg:gap-6 xl:gap-6 md:flex xl:flex grid gap-4 py-3"
            >
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
                <Input
                  ref={categoryRef}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  type="search"
                  placeholder={t("SearchCategory")}
                />
              </div>
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
              <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
                <div className="w-full mx-1">
                  <Button type="submit" className="bg-emerald-700 w-full h-12">
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
                    className="md:py-1 dark:bg-gray-700 h-12 px-4 py-2 text-sm"
                  >
                    <span className="dark:text-gray-200 text-black">Reset</span>
                    <span className="dark:text-gray-200 text-black">Reset</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      <SwitchToggleChildCat
        title=" "
        handleProcess={setShowChild}
        processOption={showChild}
        name={showChild}
      />

      {loading ? (
        <TableLoading row={12} col={6} width={190} height={20} />
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
                
                <TableCell>{t("catIdTbl")}</TableCell>
                <TableCell>{t("catIconTbl")}</TableCell>
                <TableCell>{t("CatTbName")}</TableCell>
                <TableCell>{t("CatTbDescription")}</TableCell>
                <TableCell className="text-center">
                  {t("catPublishedTbl")}
                </TableCell>
                <TableCell className="text-right">
                  {t("catActionsTbl")}
                </TableCell>
                <TableCell>{t("catIconTbl")}</TableCell>
                <TableCell>{t("CatTbName")}</TableCell>
                <TableCell>{t("CatTbDescription")}</TableCell>
                <TableCell className="text-center">
                  {t("catPublishedTbl")}
                </TableCell>
                <TableCell className="text-right">
                  {t("catActionsTbl")}
                </TableCell>
              </tr>
            </TableHeader>
                

            <CategoryTable categories={serviceData} />
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
        <NotFound title={"category"}/>
      )}
    </>
  );
};

export default Category;
