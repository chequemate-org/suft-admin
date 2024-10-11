import { Button, Modal, ModalBody, ModalFooter } from "@windmill/react-ui";
import React, { useContext } from "react";
import { FiTrash2 } from "react-icons/fi";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

//internal import
import spinnerLoadingImage from "@/assets/img/spinner.gif";
import { SidebarContext } from "@/context/SidebarContext";
import AdminServices from "@/services/AdminServices";
import CategoryServices from "@/services/CategoryServices";
import CouponServices from "@/services/CouponServices";
import CustomerServices from "@/services/CustomerServices";
import LanguageServices from "@/services/LanguageServices";
import ProductServices from "@/services/ProductServices";
import useToggleDrawer from "@/hooks/useToggleDrawer";
import AttributeServices from "@/services/AttributeServices";
import CurrencyServices from "@/services/CurrencyServices";
import { notifyError, notifySuccess } from "@/utils/toast";

const DeleteModal = ({ id, ids, setIsCheck, category, title, useParamId }) => {
  const { isModalOpen, closeModal, setIsUpdate } = useContext(SidebarContext);
  const { setServiceId } = useToggleDrawer();
  const location = useLocation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsSubmitting(true);
      let res;

      // Handle product deletion
      if (location.pathname === "/products") {
        if (ids) {
          res = await ProductServices.deleteManyProducts({ ids });
        } else {
          res = await ProductServices.deleteProduct(id);
        }
      }

      // Handle coupon deletion
      if (location.pathname === "/coupons") {
        if (ids) {
          res = await CouponServices.deleteManyCoupons({ ids });
        } else {
          res = await CouponServices.deleteCoupon(id);
        }
      }

      // Handle category deletion
      if (location.pathname === "/categories" || category) {
        if (ids) {
          res = await CategoryServices.deleteManyCategory({ ids });
        } else {
          if (!id) {
            notifyError("Please select a category first!");
            setIsSubmitting(false);
            return;
          }
          res = await CategoryServices.deleteCategory(id);
        }
      }

      // Handle child category deletion
      if (location.pathname === `/categories/${useParamId}` || category) {
        if (!id) {
          notifyError("Please select a category first!");
          setIsSubmitting(false);
          return;
        }
        res = await CategoryServices.deleteCategory(id);
      }

      // Handle customer deletion
      if (location.pathname === "/customers") {
        res = await CustomerServices.deleteCustomer(id);
      }

      // Handle attribute deletion
      if (location.pathname === "/attributes") {
        if (ids) {
          res = await AttributeServices.deleteManyAttribute({ ids });
        } else {
          res = await AttributeServices.deleteAttribute(id);
        }
      }

      // Handle staff deletion
      if (location.pathname === "/our-staff") {
        res = await AdminServices.deleteStaff(id);
      }

      // Handle language deletion
      if (location.pathname === "/languages") {
        if (ids) {
          res = await LanguageServices.deleteManyLanguage({ ids });
        } else {
          res = await LanguageServices.deleteLanguage(id);
        }
      }

      // Handle currency deletion
      if (location.pathname === "/currencies") {
        if (ids) {
          res = await CurrencyServices.deleteManyCurrency({ ids });
        } else {
          res = await CurrencyServices.deleteCurrency(id);
        }
      }

      // If the deletion was successful
      setIsUpdate(true);
      notifySuccess(res.message);
      setIsCheck([]);
      setServiceId();
      closeModal();

    } catch (err) {
      // If an error occurs
      notifyError(err?.response?.data?.message || err?.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalBody className="custom-modal px-8 pt-6 pb-4 text-center">
          <span className="flex justify-center mb-6 text-3xl text-red-500">
            <FiTrash2 />
          </span>
          <h2 className="mb-2 text-xl font-medium">
            {t("DeleteModalH2")} <span className="text-red-500">{title}</span>?
          </h2>
          <p>{t("DeleteModalPtag")}</p>
        </ModalBody>

        <ModalFooter className="justify-center">
          <Button
            className="sm:w-auto hover:bg-white hover:border-gray-50 w-full"
            layout="outline"
            onClick={closeModal}
          >
            {t("modalKeepBtn")}
          </Button>
          <div className="flex justify-end">
            {isSubmitting ? (
              <Button
                disabled={true}
                type="button"
                className="sm:w-auto w-full h-12"
              >
                <img
                  src={spinnerLoadingImage}
                  alt="Loading"
                  width={20}
                  height={10}
                />{" "}
                <span className="ml-2 font-serif font-light">
                  {t("Processing")}
                </span>
              </Button>
            ) : (
              <Button onClick={handleDelete} className="sm:w-auto w-full h-12">
                {t("modalDeletBtn")}
              </Button>
            )}
          </div>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default React.memo(DeleteModal);
