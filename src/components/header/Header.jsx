import { Avatar, Badge, WindmillContext } from "@windmill/react-ui";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Scrollbars } from "react-custom-scrollbars-2";
import {
  FiTrash2,
  FiGrid,
  FiLogOut,
  FiMenu,
  FiSun,
  FiMoon,
  FiBell,
  FiSettings,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import cookies from "js-cookie";
import { useTranslation } from "react-i18next";

//internal import
import de from "@/assets/img/de.svg";
import en from "@/assets/img/us.svg";
import ellipse from "@/assets/img/icons/ellipse.svg";
import { AdminContext } from "@/context/AdminContext";
import { SidebarContext } from "@/context/SidebarContext";
import useNotification from "@/hooks/useNotification";
import useUtilsFunction from "@/hooks/useUtilsFunction";
import NotFoundTwo from "@/components/table/NotFoundTwo";
import NotificationServices from "@/services/NotificationServices";

const Header = () => {
  const { toggleSidebar, handleLanguageChange, setNavBar, navBar } =
    useContext(SidebarContext);
  const { state, dispatch } = useContext(AdminContext);
  const { adminInfo } = state;
  const { mode, toggleMode } = useContext(WindmillContext);
  const pRef = useRef();
  const nRef = useRef();

  const currentLanguageCode = cookies.get("i18next") || "en";
  const { t } = useTranslation();
  const { updated, setUpdated } = useNotification();
  const { showDateTimeFormat } = useUtilsFunction();

  const [data, setData] = useState([]);
  const [totalDoc, setTotalDoc] = useState(0);
  const [totalUnreadDoc, setTotalUnreadDoc] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("adminInfo");
    window.location.replace(`https://suft-admin.onrender.com/login`);
  };

  const handleNotificationOpen = async () => {
    setNotificationOpen(!notificationOpen);
    setProfileOpen(false);
    await handleGetAllNotifications();
  };

  const handleProfileOpen = () => {
    setProfileOpen(!profileOpen);
    setNotificationOpen(false);
  };

  const handleNotificationStatusChange = async (id) => {
    try {
      await NotificationServices.updateStatusNotification(id, {
        status: "read",
      });

      const getAllRes = await NotificationServices.getAllNotification();
      setData(getAllRes?.notifications);
      setTotalUnreadDoc(getAllRes?.totalUnreadDoc);
      window.location.reload(false);
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  const handleNotificationDelete = async (id) => {
    try {
      await NotificationServices.deleteNotification(id);
      const getAllRes = await NotificationServices.getAllNotification();
      setData(getAllRes?.notifications);
      setTotalUnreadDoc(getAllRes?.totalUnreadDoc);
      setTotalDoc(getAllRes?.totalDoc);
    } catch (err) {
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  const handleGetAllNotifications = async () => {
    try {
      const res = await NotificationServices.getAllNotification();
      setData(res?.notifications);
      setTotalUnreadDoc(res?.totalUnreadDoc);
      setTotalDoc(res?.totalDoc);
      setUpdated(false);
    } catch (err) {
      setUpdated(false);
      notifyError(err?.response?.data?.message || err?.message);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!pRef?.current?.contains(e.target)) {
        setProfileOpen(false);
      }
      if (!nRef?.current?.contains(e.target)) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [pRef, nRef]);

  useEffect(() => {
    handleGetAllNotifications();
  }, [updated]);

  return (
    <>
      <header className="dark:bg-gray-800 z-30 py-4 bg-white shadow-sm">
        <div className="text-emerald-500 dark:text-emerald-500 container flex items-center justify-between h-full px-6 mx-auto">
          <button
            type="button"
            onClick={() => setNavBar(!navBar)}
            className="lg:block outline-0 focus:outline-none hidden"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 18 18"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden focus:outline-none p-1 mr-5 -ml-1 rounded-md"
            onClick={toggleSidebar}
            aria-label="Menu"
          >
            <FiMenu className="w-6 h-6" aria-hidden="true" />
          </button>
          <span></span>

          <ul className="flex items-center justify-end flex-shrink-0 space-x-6">
            <li className="changeLanguage">
              <div className="dropdown">
                <button className="dropbtn focus:outline-none">
                  {currentLanguageCode === "de" ? (
                    <img src={de} width={16} alt="lang" className="mx-2" />
                  ) : (
                    <img src={en} className="mx-2" alt="lang" width={16} />
                  )}
                  {currentLanguageCode === "de" ? (
                    <span className="dark:text-gray-400 text-gray-700">
                      GERMAN
                    </span>
                  ) : (
                    <span className="dark:text-gray-400 text-gray-700">
                      ENGLISH
                    </span>
                  )}
                </button>

                <div className="dropdown-content">
                  <div
                    onClick={() => handleLanguageChange("en")}
                    className="focus:outline-none cursor-pointer"
                  >
                    <img src={en} width={16} alt="lang" /> English
                  </div>
                  <div
                    onClick={() => handleLanguageChange("de")}
                    className="focus:outline-none cursor-pointer"
                  >
                    <img src={de} width={16} alt="lang" /> German
                  </div>
                </div>
              </div>
            </li>

            {/* Theme toggler */}
            <li className="flex">
              <button
                className="focus:outline-none rounded-md"
                onClick={toggleMode}
                aria-label="Toggle color mode"
              >
                {mode === "dark" ? (
                  <FiSun className="w-5 h-5" aria-hidden="true" />
                ) : (
                  <FiMoon className="w-5 h-5" aria-hidden="true" />
                )}
              </button>
            </li>

            {/* Notifications menu */}
            <li className="relative inline-block text-left" ref={nRef}>
              <button
                className="focus:outline-none relative align-middle rounded-md"
                onClick={handleNotificationOpen}
              >
                <FiBell
                  className="text-emerald-500 w-5 h-5"
                  aria-hidden="true"
                />
                <span className="absolute top-0 right-0 z-10 inline-flex items-center justify-center w-5 h-5 p-1 text-xs font-medium leading-none text-red-100 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 rounded-full">
                  {totalUnreadDoc}
                </span>
              </button>

              {notificationOpen && (
                <div className="md:right-0 -right-3 top-2 dark:bg-gray-800 focus:outline-none absolute origin-top-right bg-white rounded-md shadow-lg">
                  <div
                    className={`${
                      data?.length === 0
                        ? "h-40"
                        : data?.length <= 2
                        ? "h-40"
                        : data?.length <= 3
                        ? "h-56"
                        : "h-330"
                    } md:w-400 w-300`}
                  >
                    <Scrollbars>
                      {data?.length === 0 ? (
                        <NotFoundTwo title="No new notification" />
                      ) : (
                        <ul className="dark:border-gray-700 block text-sm border-t border-gray-100 rounded-md">
                          {data?.map((value, index) => {
                            return (
                              <li
                                key={index + 1}
                                className={`flex justify-between items-center font-serif font-normal text-sm py-3 border-b border-gray-100 dark:border-gray-700 px-3 transition-colors duration-150 hover:bg-gray-100 ${
                                  value.status === "unread" && "bg-gray-50"
                                }`}
                              >
                                <Link
                                  to={`/notification`}
                                  onClick={() =>
                                    handleNotificationStatusChange(value._id)
                                  }
                                  className="focus:outline-none flex items-center"
                                >
                                  <img
                                    className="object-cover w-8 h-8 mx-2 rounded-full"
                                    src={ellipse}
                                    alt="img"
                                  />
                                  <div className="flex flex-col">
                                    <p className="dark:text-gray-400 mb-1 text-gray-700">
                                      {value?.title?.length > 30
                                        ? `${value?.title?.slice(0, 30)}`
                                        : value?.title}
                                    </p>
                                    <span className="dark:text-gray-400 font-serif text-xs font-light text-gray-500">
                                      {showDateTimeFormat(value?.createdAt)}
                                    </span>
                                  </div>
                                </Link>

                                <div className="flex items-center justify-end">
                                  <Badge type={value?.status}>
                                    {value?.status}
                                  </Badge>
                                  <button
                                    onClick={() =>
                                      handleNotificationDelete(value._id)
                                    }
                                    className="focus:outline-none px-2"
                                  >
                                    <FiTrash2
                                      className="dark:text-gray-400 text-gray-700"
                                      aria-hidden="true"
                                    />
                                  </button>
                                </div>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </Scrollbars>
                  </div>
                </div>
              )}
            </li>

            {/* Profile menu */}
            <li className="relative inline-block text-left" ref={pRef}>
              <button
                className="focus:outline-none align-middle rounded-full"
                onClick={handleProfileOpen}
              >
                <Avatar
                  className="align-middle"
                  src={adminInfo?.avatar || ellipse}
                  alt={adminInfo?.name}
                  aria-hidden="true"
                />
              </button>

              {profileOpen && (
                <ul className="top-2 dark:bg-gray-800 dark:border-gray-700 absolute right-0 z-20 block w-56 p-2 space-y-2 text-sm bg-white border border-gray-100 rounded-md shadow-md">
                  <li className="hover:bg-gray-100 hover:text-emerald-500 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 justify-between py-2 pl-4 font-serif font-medium text-gray-500 transition-colors duration-150">
                    <Link
                      to="/dashboard"
                      className="focus:outline-none flex items-center text-sm"
                    >
                      <FiGrid className="w-4 h-4 mr-3" aria-hidden="true" />
                      <span>{t("Dashboard")}</span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 hover:text-emerald-500 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 justify-between py-2 pl-4 font-serif font-medium text-gray-500 transition-colors duration-150">
                    <Link
                      to="/setting"
                      className="focus:outline-none flex items-center text-sm"
                    >
                      <FiSettings className="w-4 h-4 mr-3" aria-hidden="true" />
                      <span>{t("Settings")}</span>
                    </Link>
                  </li>
                  <li className="hover:bg-gray-100 hover:text-emerald-500 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-200 justify-between py-2 pl-4 font-serif font-medium text-gray-500 transition-colors duration-150">
                    <Link
                      to="/profile"
                      className="focus:outline-none flex items-center text-sm"
                    >
                      <FiSettings className="w-4 h-4 mr-3" aria-hidden="true" />
                      <span>
                        <span>{t("Edit Profile")}</span>
                      </span>
                    </Link>
                  </li>

                  <li className="hover:bg-gray-100 hover:text-emerald-500 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 justify-between py-2 pl-4 font-serif font-medium text-gray-500 transition-colors duration-150">
                    <button
                      onClick={handleLogOut}
                      className="focus:outline-none w-full text-left"
                    >
                      <span className="flex items-center text-sm">
                        <FiLogOut
                          className="w-4 h-4 mr-3"
                          aria-hidden="true"
                        />
                        <span>{t("Log out")}</span>
                      </span>
                    </button>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>
      </header>
    </>
  );
};

export default Header;
