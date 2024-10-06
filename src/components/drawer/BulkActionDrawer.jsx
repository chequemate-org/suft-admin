import ReactTagInput from "@pathofdev/react-tag-input";
import { Button, Input, Select } from "@windmill/react-ui";
import Multiselect from "multiselect-react-dropdown";
import Drawer from "rc-drawer";
import Tree from "rc-tree";
import React, { useContext } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import { FiX } from "react-icons/fi";

// Internal imports
import Error from "@/components/form/others/Error";
import { notifyError } from "@/utils/toast";
import Title from "@/components/form/others/Title";
import LabelArea from "@/components/form/selectOption/LabelArea";
import SwitchToggle from "@/components/form/switch/SwitchToggle";
import TextAreaCom from "@/components/form/input/TextAreaCom";
import { SidebarContext } from "@/context/SidebarContext";
import useBulkActionSubmit from "@/hooks/useBulkActionSubmit";
import ParentCategory from "@/components/category/ParentCategory";
import useUtilsFunction from "@/hooks/useUtilsFunction";

const BulkActionDrawer = ({
  ids,
  title,
  lang,
  data,
  childId,
  attributes,
  isCheck,
}) => {
  const { toggleBulkDrawer, isBulkDrawerOpen, closeBulkDrawer } = useContext(SidebarContext);
  const { showingTranslateValue } = useUtilsFunction();

  const {
    tag,
    setTag,
    published,
    register,
    onSubmit,
    errors,
    checked,
    setChecked,
    resetRefTwo,
    handleSubmit,
    setPublished,
    selectedCategory,
    setSelectedCategory,
    defaultCategory,
    setDefaultCategory,
    selectCategoryName,
    setSelectCategoryName,
  } = useBulkActionSubmit(ids, lang, childId);

  const motion = {
    motionName: "node-motion",
    motionAppear: false,
    onAppearStart: (node) => {
      return { height: 0 };
    },
    onAppearActive: (node) => ({ height: node.scrollHeight }),
    onLeaveStart: (node) => ({ height: node.offsetHeight }),
    onLeaveActive: () => ({ height: 0 }),
  };

  const renderCategories = (categories) => {
    let myCategories = [];
    for (let category of categories) {
      myCategories.push({
        title: showingTranslateValue(category?.name),
        key: category._id,
        children: category.children.length > 0 && renderCategories(category.children),
      });
    }
    return myCategories;
  };

  const findObject = (obj, target) => {
    return obj._id === target
      ? obj
      : obj?.children?.reduce(
          (acc, obj) => acc ?? findObject(obj, target),
          undefined
        );
  };

  const handleSelect = (key) => {
    const checkId = isCheck?.find((data) => data === key);

    if (isCheck?.length === data[0]?.children?.length) {
      return notifyError("This can't be selected as a parent category!");
    } else if (checkId !== undefined) {
      return notifyError("This can't be selected as a parent category!");
    } else if (key === childId) {
      return notifyError("This can't be selected as a parent category!");
    } else {
      if (key === undefined) return;
      setChecked(key);

      const obj = data[0];
      const result = findObject(obj, key);
      setSelectCategoryName(showingTranslateValue(result?.name));
    }
  };

  const STYLE = `
  .rc-tree-child-tree {
    display: hidden;
  }
  .node-motion {
    transition: all .3s;
    overflow-y: hidden;
  }
`;

  return (
    <>
      <Drawer open={isBulkDrawerOpen} onClose={closeBulkDrawer} parent={null} level={null} placement={"right"}>
        <button
          onClick={toggleBulkDrawer}
          className="absolute z-50 text-red-500 hover:bg-red-100 hover:text-gray-700 transition-colors duration-150 bg-white shadow-md mr-6 mt-6 right-0 left-auto w-10 h-10 rounded-full block text-center"
        >
          <FiX className="mx-auto" />
        </button>
        <div className="flex flex-col w-full h-full justify-between">
          <div className="w-full relative p-6 border-b border-gray-100 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            <Title title={`Update Selected ${title}`} description={`Apply changes to the selected ${title} from the list`} />
          </div>
          <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative dark:bg-gray-700 dark:text-gray-200">
            <form onSubmit={handleSubmit(onSubmit)} className="block">
              <div className="px-6 pt-8 flex-grow w-full h-full max-h-full pb-40 md:pb-32 lg:pb-32 xl:pb-32">
                {title === "Products" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Categories" />
                      <div className="col-span-8 sm:col-span-4">
                        <ParentCategory
                          lang={lang}
                          selectedCategory={selectedCategory}
                          setSelectedCategory={setSelectedCategory}
                          setDefaultCategory={setDefaultCategory}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Default Category" />
                      <div className="col-span-8 sm:col-span-4">
                        <Multiselect
                          displayValue="name"
                          isObject={true}
                          singleSelect={true}
                          ref={resetRefTwo}
                          hidePlaceholder={true}
                          onSelect={(v) => setDefaultCategory(v)}
                          selectedValues={defaultCategory}
                          options={selectedCategory}
                          placeholder={"Default Category"}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Published" />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle handleProcess={setPublished} processOption={published} />
                        <Error errorName={errors.status} />
                      </div>
                    </div>

                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Product Tags" />
                      <div className="col-span-8 sm:col-span-4">
                        <ReactTagInput
                          placeholder="Product Tag (Write then press enter to add new tag)"
                          tags={tag}
                          onChange={(newTags) => setTag(newTags)}
                        />
                      </div>
                    </div>
                  </>
                )}

                {title === "Coupons" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Start Time" />
                      <div className="col-span-8 sm:col-span-4">
                        <Input
                          {...register("startTime", {
                            required: "Coupon Validation Start Time",
                          })}
                          label="Coupon Validation Start Time"
                          name="startTime"
                          type="datetime-local"
                          placeholder="Start Time"
                        />
                        <Error errorName={errors.startTime} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="End Time" />
                      <div className="col-span-8 sm:col-span-4">
                        <Input
                          {...register("endTime", {
                            required: "Coupon Validation End Time",
                          })}
                          label="Coupon Validation End Time"
                          name="endTime"
                          type="datetime-local"
                          placeholder="End Time"
                        />
                        <Error errorName={errors.endTime} />
                      </div>
                    </div>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Published" />
                      <div className="col-span-8 sm:col-span-4">
                        <SwitchToggle handleProcess={setPublished} processOption={published} />
                        <Error errorName={errors.published} />
                      </div>
                    </div>
                  </>
                )}

                {title === "Languages" && (
                  <>
                    <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                      <LabelArea label="Country" />
                      <div className="col-span-8 sm:col-span-4">
                        <Select
                          {...register("country", {
                            required: "Country is required!",
                          })}
                          defaultValue={""}
                        >
                          <option value="" disabled>
                            Select your country
                          </option>
                          <option value="us">United States</option>
                          <option value="uk">United Kingdom</option>
                        </Select>
                        <Error errorName={errors.country} />
                      </div>
                    </div>
                  </>
                )}

                <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                  <LabelArea label="Published" />
                  <div className="col-span-8 sm:col-span-4">
                    <SwitchToggle
                      title={""}
                      processOption={published}
                      handleProcess={setPublished}
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-gray-800 dark:text-gray-200 border-t border-gray-100 dark:border-gray-700">
                <Button type="submit" className="w-full">
                  Apply Changes
                </Button>
              </div>
            </form>
          </Scrollbars>
        </div>
      </Drawer>
    </>
  );
};

export default BulkActionDrawer;
