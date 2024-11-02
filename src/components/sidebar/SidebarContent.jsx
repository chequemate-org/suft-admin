import React, { useContext, useState } from "react";
import { NavLink, Route } from "react-router-dom";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { Button, WindmillContext } from "@windmill/react-ui";
import { IoLogOutOutline } from "react-icons/io5";

//internal import
import sidebar from "@/routes/sidebar";
// import SidebarSubMenu from "SidebarSubMenu";
import logoDark from "@/assets/img/logo/logo-dark.png";
import logoLight from "@/assets/img/logo/logo-light.png";
import { AdminContext } from "@/context/AdminContext";
import SidebarSubMenu from "@/components/sidebar/SidebarSubMenu";

const SidebarContent = () => {
  const { t } = useTranslation();
  const { mode } = useContext(WindmillContext);
  const { dispatch } = useContext(AdminContext);

  const handleLogOut = () => {
    dispatch({ type: "USER_LOGOUT" });
    Cookies.remove("adminInfo");
    window.location.replace(`https://getsuft.com/admin/login`);
  };

  return (
    <div className="py-4 text-gray-500 dark:text-gray-400">
      <a className=" text-gray-900 dark:text-gray-200" href="/dashboard">
        {mode === "dark" ? (
          <div className="">
            <svg width="150" height="60" viewBox="0 0 84 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50.169 25.4752V28.6775H49.2287C47.4496 28.6775 46.2805 28.0167 45.7977 26.746C44.8065 28.1946 43.3579 28.9824 41.5788 28.9824C38.6562 28.9824 36.6992 27.0255 36.6992 24.0266V15.716H40.0031V23.0608C40.0031 24.7127 41.0705 25.7801 42.6717 25.7801C44.3744 25.7801 45.5181 24.6873 45.5181 23.0099V15.716H48.822V24.3824C48.822 25.0686 49.2286 25.4752 49.9148 25.4752H50.169V25.4752Z" fill="#220E01"/>
              <path d="M64.2345 18.7404V24.0266C64.2345 25.0432 64.8699 25.6531 65.9627 25.6531H67.2334V28.6775H65.4544C62.5063 28.6775 60.9306 27.2542 60.9306 24.5857V18.7404H55.5173V29.0587C55.5173 31.956 53.8399 33.5063 50.6377 33.5063H49.7227V30.4819H50.3326C51.5271 30.4819 52.2133 29.8211 52.2133 28.6775V18.7404H50.1801V15.716H52.2133V14.674C52.2133 11.7767 53.9161 10.2264 57.0929 10.2264H58.5162V13.2508H57.4233C56.2289 13.2508 55.5173 13.9115 55.5173 15.0552V15.716H60.0665C60.7526 15.716 61.1084 15.3602 61.1084 14.674V12.2596H64.2345V15.716H67.2334V18.7404H64.2345Z" fill="#220E01"/>
              <path d="M16 24.0115L18.9133 23.3179C18.9133 23.3179 19.8844 31.1977 26.4601 31.1977C29.7064 31.1977 31.7318 29.089 31.7318 26.6474C31.7318 22.5965 26.3491 20.9872 26.3491 15.6878C26.3491 12.6636 28.7352 10 32.6474 10C38.6682 10 39.445 14.9942 39.445 14.9942L36.6983 15.7156C36.6983 15.7156 36.1433 12.7191 32.9803 12.7191C31.0936 12.7191 29.8173 13.9953 29.8173 15.6878C29.8173 19.267 35.1999 21.2092 35.1999 26.4532C35.1999 30.4207 31.9537 34 26.3769 34C16.9989 34 16 24.0115 16 24.0115Z" fill="#220E01"/>
              <path d="M25.4613 18.8536C25.1581 18.353 24.8185 17.8311 24.3708 17.2725C24.3704 17.272 24.37 17.2716 24.3697 17.2711C24.0968 16.931 23.4938 16.477 22.5205 17.2578C18.7844 20.2545 19.8799 27.0004 24.111 29.0674C29.0252 31.4681 32.2497 25.9491 28.1631 22.4348C26.7477 21.2176 26.2173 20.1017 25.4613 18.8536Z" fill="#FF8D00"/>
            </svg>

          </div>
          
          
          // <img src={logoLight} alt="kachabazar" width="135" className="pl-6" />
        ) : (
          <div className="">
            <svg width="150" height="60" viewBox="0 0 84 44" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M50.169 25.4752V28.6775H49.2287C47.4496 28.6775 46.2805 28.0167 45.7977 26.746C44.8065 28.1946 43.3579 28.9824 41.5788 28.9824C38.6562 28.9824 36.6992 27.0255 36.6992 24.0266V15.716H40.0031V23.0608C40.0031 24.7127 41.0705 25.7801 42.6717 25.7801C44.3744 25.7801 45.5181 24.6873 45.5181 23.0099V15.716H48.822V24.3824C48.822 25.0686 49.2286 25.4752 49.9148 25.4752H50.169V25.4752Z" fill="#220E01"/>
              <path d="M64.2345 18.7404V24.0266C64.2345 25.0432 64.8699 25.6531 65.9627 25.6531H67.2334V28.6775H65.4544C62.5063 28.6775 60.9306 27.2542 60.9306 24.5857V18.7404H55.5173V29.0587C55.5173 31.956 53.8399 33.5063 50.6377 33.5063H49.7227V30.4819H50.3326C51.5271 30.4819 52.2133 29.8211 52.2133 28.6775V18.7404H50.1801V15.716H52.2133V14.674C52.2133 11.7767 53.9161 10.2264 57.0929 10.2264H58.5162V13.2508H57.4233C56.2289 13.2508 55.5173 13.9115 55.5173 15.0552V15.716H60.0665C60.7526 15.716 61.1084 15.3602 61.1084 14.674V12.2596H64.2345V15.716H67.2334V18.7404H64.2345Z" fill="#220E01"/>
              <path d="M16 24.0115L18.9133 23.3179C18.9133 23.3179 19.8844 31.1977 26.4601 31.1977C29.7064 31.1977 31.7318 29.089 31.7318 26.6474C31.7318 22.5965 26.3491 20.9872 26.3491 15.6878C26.3491 12.6636 28.7352 10 32.6474 10C38.6682 10 39.445 14.9942 39.445 14.9942L36.6983 15.7156C36.6983 15.7156 36.1433 12.7191 32.9803 12.7191C31.0936 12.7191 29.8173 13.9953 29.8173 15.6878C29.8173 19.267 35.1999 21.2092 35.1999 26.4532C35.1999 30.4207 31.9537 34 26.3769 34C16.9989 34 16 24.0115 16 24.0115Z" fill="#220E01"/>
              <path d="M25.4613 18.8536C25.1581 18.353 24.8185 17.8311 24.3708 17.2725C24.3704 17.272 24.37 17.2716 24.3697 17.2711C24.0968 16.931 23.4938 16.477 22.5205 17.2578C18.7844 20.2545 19.8799 27.0004 24.111 29.0674C29.0252 31.4681 32.2497 25.9491 28.1631 22.4348C26.7477 21.2176 26.2173 20.1017 25.4613 18.8536Z" fill="#FF8D00"/>
            </svg>


          </div>
          
          // <img src={logoDark} alt="kachabazar" width="135" className="pl-6" />
        )}
      </a>
      <ul className="">
        {sidebar.map((route) =>
          route.routes ? (
            <SidebarSubMenu route={route} key={route.name} />
          ) : (
            <li className="relative" key={route.name}>
              <NavLink
                exact
                to={route.path}
                target={`${route?.outside ? "_blank" : "_self"}`}
                className="px-6 py-4 inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-emerald-700 dark:hover:text-gray-200"
                // activeClassName="text-emerald-500 dark:text-gray-100"
                activeStyle={{
                  color: "#0d9e6d",
                }}
                rel="noreferrer"
              >
                <Route path={route.path} exact={route.exact}>
                  <span
                    className="absolute inset-y-0 left-0 w-1 bg-emerald-500 rounded-tr-lg rounded-br-lg"
                    aria-hidden="true"
                  ></span>
                </Route>
                <route.icon className="w-5 h-5" aria-hidden="true" />
                <span className="ml-4">{t(`${route.name}`)}</span>
              </NavLink>
            </li>
          )
        )}
      </ul>
      <span className="lg:fixed bottom-0 px-6 py-6 w-64 mx-auto relative mt-3 block">
        <Button onClick={handleLogOut} size="large" className="w-full">
          <span className="flex items-center">
            <IoLogOutOutline className="mr-3 text-lg" />
            <span className="text-sm">{t("LogOut")}</span>
          </span>
        </Button>
      </span>
    </div>
  );
};

export default SidebarContent;
