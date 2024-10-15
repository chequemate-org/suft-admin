import React, { useContext } from "react";
import { Button } from "@windmill/react-ui";
import { useTranslation } from "react-i18next";

// Internal import
import { SidebarContext } from "@/context/SidebarContext";
import spinnerLoadingImage from "@/assets/img/spinner.gif";

const DrawerButton = ({ id, title, isSubmitting}) => {
  const { t } = useTranslation();
  const { toggleDrawer, isDrawerOpen } = useContext(SidebarContext);
  
  return (
    <div
      className="lg:py-8 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 fixed bottom-0 right-0 z-10 grid w-full gap-4 px-6 py-4 border-t border-gray-100"
      style={{ right: !isDrawerOpen && -50 }}
    >
      <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
        <Button
          onClick={toggleDrawer}
          className="hover:bg-red-50 hover:border-red-100 hover:text-red-600 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-500 dark:hover:bg-gray-800 dark:hover:text-red-700 w-full h-12 text-red-500 bg-white"
          layout="outline"
        >
          {t("CancelBtn")}
        </Button>
      </div>

      <div className="md:flex-grow lg:flex-grow xl:flex-grow flex-grow-0">
        {isSubmitting ? (
          <Button disabled={true} type="button" className="w-full h-12">
            <img
              src={spinnerLoadingImage}
              alt="Loading"
              width={20}
              height={10}
            />{" "}
            <span className="ml-2 font-serif font-light">Processing</span>
          </Button>
        ) : (
          <Button type="submit" className="w-full h-12">
              {id ? (
                <span>
                  {t("UpdateBtn")} {title}
                </span>
              ) : (
                <span>Add {title}</span>
              )}
            </Button>
          
        )}
      </div>
    </div>
  );
};

export default DrawerButton;
