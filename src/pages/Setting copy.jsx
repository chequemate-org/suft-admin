import { useTranslation } from "react-i18next";
import { Button, Select } from "@windmill/react-ui";

//internal import

import Error from "@/components/form/others/Error";
import PageTitle from "@/components/Typography/PageTitle";
import useSettingSubmit from "@/hooks/useSettingSubmit";
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import InputAreaTwo from "@/components/form/input/InputAreaTwo";
import SelectTimeZone from "@/components/form/selectOption/SelectTimeZone";
import SelectCurrency from "@/components/form/selectOption/SelectCurrency";
import SelectReceiptSize from "@/components/form/selectOption/SelectPrintSize";
import AnimatedContent from "@/components/common/AnimatedContent";

const Setting = () => {
  const { errors, register, isSave, isSubmitting, onSubmit, handleSubmit } =
    useSettingSubmit();

  const { t } = useTranslation();

  return (
    <>
      <PageTitle>{t("Setting")}</PageTitle>
      <AnimatedContent>
        <div className="sm:container md:p-6 dark:bg-gray-800 dark:text-gray-200 w-full p-4 mx-auto bg-white rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 font-sans">
              <div className="md:col-span-12 lg:col-span-12 col-span-12 mr-3">
                <div className="lg:px-6 lg:pl-40 lg:pr-40 md:pl-5 md:pr-5 scrollbar-hide flex-grow w-full max-h-full pt-4 pb-0">
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("DefaultCurrency")}
                    </label>

                    <div className="sm:col-span-3">
                      <div className="sm:col-span-4 col-span-8">
                        <SelectCurrency
                          register={register}
                          label="Currency"
                          name="default_currency"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("NumberOfImagesPerProduct")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("NumberOfImagesPerProduct")}
                        name="number_of_image_per_product"
                        type="number"
                        placeholder={t("NumberOfImagesPerProduct")}
                      />
                      <Error errorName={errors.number_of_image_per_product} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("TimeZone")}
                    </label>

                    <div className="sm:col-span-3">
                      <SelectTimeZone
                        register={register}
                        name="default_time_zone"
                        label="Time Zone"
                      />
                      <Error errorName={errors.default_time_zone} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("DefaultDateFormat")}
                    </label>

                    <div className="sm:col-span-3">
                      <Select
                        {...register(`default_date_format`, {
                          required: "Default date formate is required",
                        })}
                      >
                        <option value="" defaultValue hidden>
                          {t("DefaultDateFormat")}
                        </option>
                        <option value="MMM D, YYYY">MM/DD/YYYY</option>
                        <option value="D MMM, YYYY">DD/MM/YYYY</option>
                        <option value="YYYY,MMM D">YYYY/MM/DD</option>
                      </Select>
                      <Error errorName={errors.default_date_format} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 relative grid gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("ReceiptSize")}
                    </label>
                    <div className="sm:col-span-3">
                      <SelectReceiptSize
                        label="Role"
                        register={register}
                        name="receipt_size"
                        required={true}
                      />
                      <Error errorName={errors.receipt_size} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("ShopName")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("ShopName")}
                        name="shop_name"
                        type="text"
                        placeholder={t("ShopName")}
                      />
                      <Error errorName={errors.shop_name} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("InvoiceCompanyName")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label={t("InvoiceCompanyName")}
                        name="company_name"
                        type="text"
                        placeholder={t("InvoiceCompanyName")}
                      />
                      <Error errorName={errors.company_name} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {/* {t("FooterAddress")} */}
                      {t("VatNumber")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        register={register}
                        label="Address"
                        name="vat_number"
                        type="text"
                        placeholder="Vat Number"
                      />
                      <Error errorName={errors.vat_number} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("AddressLine")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label="Address"
                        name="address"
                        type="text"
                        placeholder="Address"
                      />
                      <Error errorName={errors.address} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("PostCode")}
                    </label>
                    <div className="sm:col-span-3">
                      <InputAreaTwo
                        register={register}
                        label="Address"
                        name="post_code"
                        type="text"
                        placeholder="Post Code"
                      />
                      <Error errorName={errors.post_code} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("GlobalContactNumber")}
                    </label>
                    <div className=" sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label="Phone"
                        name="contact"
                        type="text"
                        placeholder="Contact Number"
                      />
                      <Error errorName={errors.contact} />
                    </div>
                  </div>

                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("FooterEmail")}
                    </label>
                    <div className=" sm:col-span-3">
                      <InputAreaTwo
                        required={true}
                        register={register}
                        label="Email"
                        name="email"
                        type="text"
                        placeholder="Email"
                      />
                      <Error errorName={errors.email} />
                    </div>
                  </div>
                  <div className="md:grid-cols-5 sm:grid-cols-12 md:gap-5 xl:gap-6 lg:gap-6 grid items-center gap-3 mb-6">
                    <label className="dark:text-gray-400 sm:col-span-2 block mb-1 text-sm font-semibold text-gray-600">
                      {t("WebSite")}
                    </label>
                    <div className=" sm:col-span-3">
                      <InputAreaTwo
                        register={register}
                        label="Email"
                        name="website"
                        type="text"
                        placeholder="Web Site"
                      />
                      <Error errorName={errors.website} />
                    </div>
                  </div>
                  <div className="flex flex-row-reverse pb-6">
                    {isSubmitting ? (
                      <Button disabled={true} type="button" className="h-12">
                        <img
                          src={spinnerLoadingImage}
                          alt="Loading"
                          width={20}
                          height={10}
                        />{" "}
                        <span className="ml-2 font-serif font-light">
                          Processing
                        </span>
                      </Button>
                    ) : (
                      <Button type="submit" className="h-12 px-8">
                        {" "}
                        {isSave ? "Save" : "Update"}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </AnimatedContent>
    </>
  );
};
export default Setting;
