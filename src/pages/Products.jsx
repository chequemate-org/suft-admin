// import React, { useContext, useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Table,
//   TableHeader,
//   TableCell,
//   TableFooter,
//   TableContainer,
//   Input,
//   Button,
//   Card,
//   CardBody,
//   Pagination,
// } from "@windmill/react-ui";
// import { Select } from "@windmill/react-ui";
// import { useTranslation } from "react-i18next";
// import { FiPlus, FiEdit, FiTrash2 } from "react-icons/fi";

// // Internal imports
// import useToggleDrawer from "@/hooks/useToggleDrawer";
// import UploadMany from "@/components/common/UploadMany";
// import NotFound from "@/components/table/NotFound";
// import PageTitle from "@/components/Typography/PageTitle";
// import { SidebarContext } from "@/context/SidebarContext";
// import ProductTable from "@/components/product/ProductTable";
// import MainDrawer from "@/components/drawer/MainDrawer";
// import ProductDrawer from "@/components/drawer/ProductDrawer";
// import CheckBox from "@/components/form/others/CheckBox";
// import DeleteModal from "@/components/modal/DeleteModal";
// import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
// import TableLoading from "@/components/preloader/TableLoading";
// import SelectCategory from "@/components/form/selectOption/SelectCategory";
// import AnimatedContent from "@/components/common/AnimatedContent";
// import useProductFilter from "@/hooks/useProductFilter";

// const Products = () => {
//   const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
//     useToggleDrawer();
//   const { t } = useTranslation();
//   const {
//     toggleDrawer,
//     lang,
//     currentPage,
//     handleChangePage,
//     // searchText,
//     category,
//     setCategory,
//     searchRef,
//     handleSubmitForAll,
//     // sortedField,
//     // setSortedField,
//     handleClick,
//     limitData,
//   } = useContext(SidebarContext);

//   // State for products, loading, and error
//   // const [data, setData] = useState({
//   //   products: [],
//   //   totalDoc: 0,
//   // });
//   const [isCheckAll, setIsCheckAll] = useState(false);
//   const [isCheck, setIsCheck] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   // const [allProducts, setAllProducts] = useState([]);
//   const [fetchedProduct, setFetchedProduct] = useState(null);
//   const [data, setData] = useState({ products: [], totalDoc: 0 });
//   const [minPrice, setMinPrice] = useState("");
//   const [maxPrice, setMaxPrice] = useState("");
//   const [color, setColor] = useState("");
//   const [size, setSize] = useState("");
//   const [searchText, setSearchText] = useState("");
//   const [sortedField, setSortedField] = useState("");

//   useEffect(() => {
//     const fetchProducts = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(
//           "https://suft-90bec7a20f24.herokuapp.com/product/",
//           {
//             params: {
//               page: currentPage,
//               limit: limitData,
//               category: category,
//               title: searchText,
//               price: sortedField,
//             },
//           }
//         );
//         console.log("API Response:", response.data);
//         setData({
//           products: response.data.data,
//           totalDoc: response.data.totalDocs, // Ensure you're getting the total number of documents here.
//         });
//         setLoading(false);
//       } catch (err) {
//         setError(err.message);
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, [currentPage, limitData, category, searchText, sortedField]);
//   const fetchProduct = async (uuid) => {
//     try {
//       const response = await fetch(
//         `https://suft-90bec7a20f24.herokuapp.com/product/single/${uuid}`
//       );
//       const data = await response.json();
//       console.log(data);
//       if (response.ok) {
//         setFetchedProduct(data.data);
//       } else {
//         console.error(data.message);
//       }
//     } catch (error) {
//       console.error("Error fetching product:", error);
//     }
//   };
//   // Select all and handle selections
  
//   const ProductSearch = async () => {
//     try {
//       const response = await axios.get("https://suft-90bec7a20f24.herokuapp.com/product/filter?", {
//         params: {
//           page: currentPage,
//           min: minPrice,
//           max: maxPrice,
//           color: color,
//           size: size,
//           search: searchText,
//           sortBy: sortedField,
//         },
//       });
//       setData({
//         products: response.data.data,
//         totalDoc: response.data.totalDocs,
//       });
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   useEffect(() => {
//     ProductSearch();
//   }, [currentPage, minPrice, maxPrice, color, size, searchText, sortedField]);

//   // Handle search form submission
//   const handleSearchSubmit = (e) => {
//     e.preventDefault();
//     ProductSearch(); // Trigger fetch with updated parameters
//   };

//   // Reset the filters
//   const ResetField = () => {
//     setMinPrice("");
//     setMaxPrice("");
//     setColor("");
//     setSize("");
//     setSearchText("");
//     setSortedField("");
//     ProductSearch();
//   };

//   const handleSelectAll = () => {
//     setIsCheckAll(!isCheckAll);
//     setIsCheck(data.products.map((li) => li.id));
//     if (isCheckAll) {
//       setIsCheck([]);
//     }
//   };

//   // const handleResetField = () => {
//   //   setCategory("");
//   //   setSortedField("");
//   //   searchRef.current.value = "";
//   // };

//   const {
//     serviceData,
//     filename,
//     isDisabled,
//     handleSelectFile,
//     handleUploadMultiple,
//     handleRemoveSelectFile,
//   } = useProductFilter(data.products);

//   return (
//     <>
//       <PageTitle>{t("ProductsPage")}</PageTitle>
//       <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
//       <BulkActionDrawer ids={allId} title="Products" />
//       <MainDrawer>
//         <ProductDrawer id={serviceId} product={fetchedProduct}  />
//       </MainDrawer>
//       <AnimatedContent>
//         <Card className="dark:bg-gray-800 min-w-0 mb-5 overflow-hidden bg-white shadow-xs">
//           <CardBody className="">
//             <form
//               onSubmit={handleSubmitForAll}
//               className="md:pb-0 lg:gap-6 xl:gap-6 xl:flex grid gap-4 py-3"
//             >
//               <div className="sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                 <UploadMany
//                   title="Products"
//                   filename={filename}
//                   isDisabled={isDisabled}
//                   totalDoc={data?.totalDoc}
//                   handleSelectFile={handleSelectFile}
//                   handleUploadMultiple={handleUploadMultiple}
//                   handleRemoveSelectFile={handleRemoveSelectFile}
//                 />
//               </div>
//               <div className="sm:flex-row flex flex-col gap-4">
//                 <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                   <Button
//                     disabled={isCheck.length < 1}
//                     onClick={() => handleUpdateMany(isCheck)}
//                     className="btn-gray w-full h-12 text-gray-600 rounded-md"
//                   >
//                     <span className="mr-2">
//                       <FiEdit />
//                     </span>
//                     {t("BulkAction")}
//                   </Button>
//                 </div>
//                 <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                   <Button
//                     disabled={isCheck?.length < 1}
//                     onClick={() => handleDeleteMany(isCheck, data.products)}
//                     className="disabled btn-red w-full h-12 bg-red-300 rounded-md"
//                   >
//                     <span className="mr-2">
//                       <FiTrash2 />
//                     </span>
//                     {t("Delete")}
//                   </Button>
//                 </div>
//                 <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                   <Button
//                     onClick={toggleDrawer}
//                     className="w-full h-12 rounded-md"
//                   >
//                     <span className="mr-2">
//                       <FiPlus />
//                     </span>
//                     {t("AddProduct")}
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </CardBody>
//         </Card>

//         <Card className="dark:bg-gray-800 rounded-0 min-w-0 mb-4 overflow-hidden bg-white rounded-t-lg shadow-xs">
//           <CardBody>
//             <form
//               onSubmit={handleSearchSubmit}
//               className="lg:gap-6 xl:gap-6 md:flex xl:flex grid gap-4 py-3"
//             >
//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                 <Input
//                   ref={searchRef}
//                   type="search"
//                   name="search"
//                   value={searchText}
//                   onChange={(e) => setSearchText(e.target.value)}
//                   placeholder="Search Product"
//                 />
//                 <button
//                   type="submit"
//                   className="absolute top-0 right-0 mt-5 mr-1"
//                 ></button>
//               </div>

//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                 <SelectCategory setCategory={setCategory} lang={lang} />
//               </div>

//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
//                 <Select onChange={(e) => setSortedField(e.target.value)}>
//                   <option value="All" defaultValue hidden>
//                     {t("Price")}
//                   </option>
//                   <option value="low">{t("LowtoHigh")}</option>
//                   <option value="high">{t("HightoLow")}</option>
//                   <option value="published">{t("Published")}</option>
//                   <option value="unPublished">{t("Unpublished")}</option>
//                   <option value="status-selling">{t("StatusSelling")}</option>
//                   <option value="status-out-of-stock">
//                     {t("StatusStock")}
//                   </option>
//                   <option value="date-added-asc">{t("DateAddedAsc")}</option>
//                   <option value="date-added-desc">{t("DateAddedDesc")}</option>
//                   <option value="date-updated-asc">
//                     {t("DateUpdatedAsc")}
//                   </option>
//                   <option value="date-updated-desc">
//                     {t("DateUpdatedDesc")}
//                   </option>
//                 </Select>
//               </div>
//               <div className="md:flex-grow lg:flex-grow xl:flex-grow flex items-center flex-grow-0 gap-2">
//                 <div className="w-full mx-1">
//                   <Button type="submit"  className="bg-emerald-700 w-full h-12">
//                     Filter
//                   </Button>
//                 </div>

//                 <div className="w-full mx-1">
//                   <Button
//                     layout="outline"
//                     onClick={ResetField}
//                     type="reset"
//                     className="md:py-1 dark:bg-gray-700 h-12 px-4 py-2 text-sm"
//                   >
//                     <span className="dark:text-gray-200 text-black">Reset</span>
//                   </Button>
//                 </div>
//               </div>
//             </form>
//           </CardBody>
//         </Card>

//         <div className="rounded-0 min-w-0 overflow-hidden bg-white rounded-t-lg shadow-xs">
//           <TableContainer className="mb-8">
//             <Table>
//               <TableHeader>
//                 <tr>
//                   <TableCell>
//                     <CheckBox
//                       type="checkbox"
//                       name="selectAll"
//                       handleClick={handleSelectAll}
//                       isChecked={isCheckAll}
//                     />
//                   </TableCell>
//                   <TableCell>{t("ProductNameTbl")}</TableCell>
//                   <TableCell>{t("CategoryTbl")}</TableCell>
//                   <TableCell>{t("PriceTbl")}</TableCell>
//                   <TableCell>Sale Price</TableCell>
//                   <TableCell>{t("StockTbl")}</TableCell>
//                   <TableCell>{t("StatusTbl")}</TableCell>
//                   <TableCell className="text-center">{t("DetailsTbl")}</TableCell>
//                   <TableCell className="text-center">
//                     {t("PublishedTbl")}
//                   </TableCell>
//                   <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
//                 </tr>
//               </TableHeader>

//               {/* Product Table Data */}
//               {loading ? (
//                 <TableLoading row={10} />
//               ) : data.products?.length ? (
//                 <ProductTable
//                   fetchProduct={fetchProduct}
//                   isCheck={isCheck}
//                   handleClick={handleClick}
//                   isCheckAll={isCheckAll}
//                   products={data.products}
//                   loading={loading}
//                 />
//               ) : (
//                 <NotFound message="No Product found" />
//               )}
//             </Table>

//             <TableFooter>
//               <Pagination
//                 totalResults={data.totalDoc}
//                 resultsPerPage={limitData}
//                 onChange={handleChangePage}
//                 label="Product Page Navigation"
//               />
//             </TableFooter>
//           </TableContainer>
//         </div>
//       </AnimatedContent>
//     </>
//   );
// };

// export default Products;
import React, { useContext, useState , useEffect} from "react";
import {
  Table,
  TableHeader,
  TableCell,
  TableFooter,
  TableContainer,
  Select,
  Input,
  Button,
  Card,
  CardBody,
  Pagination,
} from "@windmill/react-ui";
import { useTranslation } from "react-i18next";
import { FiPlus } from "react-icons/fi";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import axios from "axios";

//internal import

import useAsync from "@/hooks/useAsync";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import UploadMany from "@/components/common/UploadMany";
import NotFound from "@/components/table/NotFound";
import ProductServices from "@/services/ProductServices";
import PageTitle from "@/components/Typography/PageTitle";
import { SidebarContext } from "@/context/SidebarContext";
import ProductTable from "@/components/product/ProductTable";
import MainDrawer from "@/components/drawer/MainDrawer";
import ProductDrawer from "@/components/drawer/ProductDrawer";
import CheckBox from "@/components/form/others/CheckBox";
import useProductFilter from "@/hooks/useProductFilter";
import DeleteModal from "@/components/modal/DeleteModal";
import BulkActionDrawer from "@/components/drawer/BulkActionDrawer";
import TableLoading from "@/components/preloader/TableLoading";
import SelectCategory from "@/components/form/selectOption/SelectCategory";
import AnimatedContent from "@/components/common/AnimatedContent";

const Products = () => {
  const { title, allId, serviceId, handleDeleteMany, handleUpdateMany } =
    useToggleDrawer();

  const { t } = useTranslation();
  const {
    toggleDrawer,
    lang,
    currentPage,
    handleChangePage,
    // searchText,
    category,
    setCategory,
    searchRef,
    handleSubmitForAll,
    // sortedField,
    // setSortedField,
    limitData,
  } = useContext(SidebarContext);

  // const { data, l} = useAsync(() =>
  //   ProductServices.getAllProducts({
  //     page: currentPage,
  //     limit: limitData,
  //     category: category,
  //     title: searchText,
  //     price: sortedField,
  //   })
  // );

  // console.log("product page", data);

  // react hooks
  
  // const [data, setData] = useState({
  //   products: [],
  //   totalDoc: 0,
  // });
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // const [allProducts, setAllProducts] = useState([]);
  const [fetchedProduct, setFetchedProduct] = useState(null);
  const [data, setData] = useState({ products: [], totalDoc: 0 });
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const [searchText, setSearchText] = useState("");
  const [sortedField, setSortedField] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://suft-90bec7a20f24.herokuapp.com/product/",
          {
            params: {
              page: currentPage,
              limit: limitData,
              category: category,
              title: searchText,
              price: sortedField,
            },
          }
        );
        console.log("API Response:", response.data);
        setData({
          products: response.data.data,
          totalDoc: response.data.totalDocs, // Ensure you're getting the total number of documents here.
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [currentPage, limitData, category, searchText, sortedField]);
  const fetchProduct = async (uuid) => {
    try {
      const response = await fetch(
        `https://suft-90bec7a20f24.herokuapp.com/product/single/${uuid}`
      );
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setFetchedProduct(data.data);
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };
  // Select all and handle selections
  
  const ProductSearch = async () => {
    try {
      const response = await axios.get("https://suft-90bec7a20f24.herokuapp.com/product/filter?", {
        params: {
          page: currentPage,
          min: minPrice,
          max: maxPrice,
          color: color,
          size: size,
          search: searchText,
          sortBy: sortedField,
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
  }, [currentPage, minPrice, maxPrice, color, size, searchText, sortedField]);

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    ProductSearch(); // Trigger fetch with updated parameters
  };

  // Reset the filters
  const ResetField = () => {
    setMinPrice("");
    setMaxPrice("");
    setColor("");
    setSize("");
    setSearchText("");
    setSortedField("");
    ProductSearch();
  };

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(data.products.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  // const handleResetField = () => {
  //   setCategory("");
  //   setSortedField("");
  //   searchRef.current.value = "";
  // };

  // const handleSelectAll = () => {
  //   setIsCheckAll(!isCheckAll);
  //   setIsCheck(data?.products.map((li) => li._id));
  //   if (isCheckAll) {
  //     setIsCheck([]);
  //   }
  // };
  // handle reset field
  const handleResetField = () => {
    setCategory("");
    setSortedField("");
    searchRef.current.value = "";
  };

  // console.log('productss',products)
  const {
    serviceData,
    filename,
    isDisabled,
    handleSelectFile,
    handleUploadMultiple,
    handleRemoveSelectFile,
  } = useProductFilter(data?.products);

  return (
    <>
      <PageTitle>{t("ProductsPage")}</PageTitle>
      <DeleteModal ids={allId} setIsCheck={setIsCheck} title={title} />
      <BulkActionDrawer ids={allId} title="Products" />
      <MainDrawer>
        <ProductDrawer id={serviceId} />
      </MainDrawer>
      <AnimatedContent>
        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
          <CardBody className="">
            <form
              onSubmit={handleSubmitForAll}
              className="py-3 md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex"
            >
              <div className="flex-grow-0 sm:flex-grow md:flex-grow lg:flex-grow xl:flex-grow">
                <UploadMany
                  title="Products"
                  filename={filename}
                  isDisabled={isDisabled}
                  totalDoc={data?.totalDoc}
                  handleSelectFile={handleSelectFile}
                  handleUploadMultiple={handleUploadMultiple}
                  handleRemoveSelectFile={handleRemoveSelectFile}
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button
                    disabled={isCheck.length < 1}
                    onClick={() => handleUpdateMany(isCheck)}
                    className="w-full rounded-md h-12 btn-gray text-gray-600"
                  >
                    <span className="mr-2">
                      <FiEdit />
                    </span>
                    {t("BulkAction")}
                  </Button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button
                    disabled={isCheck?.length < 1}
                    onClick={() => handleDeleteMany(isCheck, data.products)}
                    className="w-full rounded-md h-12 bg-red-300 disabled btn-red"
                  >
                    <span className="mr-2">
                      <FiTrash2 />
                    </span>

                    {t("Delete")}
                  </Button>
                </div>
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button
                    onClick={toggleDrawer}
                    className="w-full rounded-md h-12"
                  >
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("AddProduct")}
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 rounded-t-lg rounded-0 mb-4">
          <CardBody>
            <form
              onSubmit={handleSearchSubmit}
              className="py-3 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex"
            >
              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Input
                  ref={searchRef}
                  type="search"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  name="search"
                  placeholder="Search Product"
                />
                <button
                  type="submit"
                  className="absolute right-0 top-0 mt-5 mr-1"
                ></button>
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <SelectCategory setCategory={setCategory} lang={lang} />
              </div>

              <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <Select onChange={(e) => setSortedField(e.target.value)}>
                  <option value="All" defaultValue hidden>
                    {t("Price")}
                  </option>
                  <option value="low">{t("LowtoHigh")}</option>
                  <option value="high">{t("HightoLow")}</option>
                  <option value="published">{t("Published")}</option>
                  <option value="unPublished">{t("Unpublished")}</option>
                  <option value="status-selling">{t("StatusSelling")}</option>
                  <option value="status-out-of-stock">
                    {t("StatusStock")}
                  </option>
                  <option value="date-added-asc">{t("DateAddedAsc")}</option>
                  <option value="date-added-desc">{t("DateAddedDesc")}</option>
                  <option value="date-updated-asc">
                    {t("DateUpdatedAsc")}
                  </option>
                  <option value="date-updated-desc">
                    {t("DateUpdatedDesc")}
                  </option>
                </Select>
              </div>
              <div className="flex items-center gap-2 flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                <div className="w-full mx-1">
                  <Button type="submit" className="h-12 w-full bg-emerald-700">
                    Filter
                  </Button>
                </div>

                <div className="w-full mx-1">
                  <Button
                    layout="outline"
                    onClick={ResetField}
                    type="reset"
                    className="px-4 md:py-1 py-2 h-12 text-sm dark:bg-gray-700"
                  >
                    <span className="text-black dark:text-gray-200">Reset</span>
                  </Button>
                </div>
              </div>
            </form>
          </CardBody>
        </Card>
      </AnimatedContent>

      {loading ? (
        <TableLoading row={12} col={7} width={160} height={20} />
      ) : error ? (
        <span className="text-center mx-auto text-red-500">{error}</span>
      ) : serviceData?.length !== 0 ? (
        <TableContainer className="mb-8 rounded-b-lg">
          <Table>
            <TableHeader>
              <tr>
                <TableCell>
                  <CheckBox
                    type="checkbox"
                    name="selectAll"
                    id="selectAll"
                    isChecked={isCheckAll}
                    handleClick={handleSelectAll}
                  />
                </TableCell>
                <TableCell>{t("ProductNameTbl")}</TableCell>
                <TableCell>{t("CategoryTbl")}</TableCell>
                <TableCell>{t("PriceTbl")}</TableCell>
                <TableCell>Sale Price</TableCell>
                <TableCell>{t("StockTbl")}</TableCell>
                <TableCell>{t("StatusTbl")}</TableCell>
                <TableCell className="text-center">{t("DetailsTbl")}</TableCell>
                <TableCell className="text-center">
                  {t("PublishedTbl")}
                </TableCell>
                <TableCell className="text-right">{t("ActionsTbl")}</TableCell>
              </tr>
            </TableHeader>
            <ProductTable
              lang={lang}
              isCheck={isCheck}
              products={data?.products}
              setIsCheck={setIsCheck}
            />
          </Table>
          <TableFooter>
            <Pagination
              totalResults={data?.totalDoc}
              resultsPerPage={limitData}
              onChange={handleChangePage}
              label="Product Page Navigation"
            />
          </TableFooter>
        </TableContainer>
      ) : (
        <NotFound title="Product" />
      )}
    </>
  );
};

export default Products;
