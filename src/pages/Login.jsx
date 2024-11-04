import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@windmill/react-ui";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useTranslation } from "react-i18next";

// Internal imports
import Error from "@/components/form/others/Error";
import LabelArea from "@/components/form/selectOption/LabelArea";
import InputArea from "@/components/form/input/InputArea";
import ImageLight from "@/assets/img/login-office.jpeg";
import ImageDark from "@/assets/img/login-office-dark.jpeg";
import useLoginSubmit from "@/hooks/useLoginSubmit";
import CMButton from "@/components/form/button/CMButton";

const Login = () => {
  const { t } = useTranslation();
  const { onSubmit, register, errors, loading } = useLoginSubmit();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <div className="">
                <svg
                  width="140"
                  height="80"
                  viewBox="0 0 84 44"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M50.169 25.4752V28.6775H49.2287C47.4496 28.6775 46.2805 28.0167 45.7977 26.746C44.8065 28.1946 43.3579 28.9824 41.5788 28.9824C38.6562 28.9824 36.6992 27.0255 36.6992 24.0266V15.716H40.0031V23.0608C40.0031 24.7127 41.0705 25.7801 42.6717 25.7801C44.3744 25.7801 45.5181 24.6873 45.5181 23.0099V15.716H48.822V24.3824C48.822 25.0686 49.2286 25.4752 49.9148 25.4752H50.169V25.4752Z"
                    fill="#220E01"
                  />
                  <path
                    d="M64.2345 18.7404V24.0266C64.2345 25.0432 64.8699 25.6531 65.9627 25.6531H67.2334V28.6775H65.4544C62.5063 28.6775 60.9306 27.2542 60.9306 24.5857V18.7404H55.5173V29.0587C55.5173 31.956 53.8399 33.5063 50.6377 33.5063H49.7227V30.4819H50.3326C51.5271 30.4819 52.2133 29.8211 52.2133 28.6775V18.7404H50.1801V15.716H52.2133V14.674C52.2133 11.7767 53.9161 10.2264 57.0929 10.2264H58.5162V13.2508H57.4233C56.2289 13.2508 55.5173 13.9115 55.5173 15.0552V15.716H60.0665C60.7526 15.716 61.1084 15.3602 61.1084 14.674V12.2596H64.2345V15.716H67.2334V18.7404H64.2345Z"
                    fill="#220E01"
                  />
                  <path
                    d="M16 24.0115L18.9133 23.3179C18.9133 23.3179 19.8844 31.1977 26.4601 31.1977C29.7064 31.1977 31.7318 29.089 31.7318 26.6474C31.7318 22.5965 26.3491 20.9872 26.3491 15.6878C26.3491 12.6636 28.7352 10 32.6474 10C38.6682 10 39.445 14.9942 39.445 14.9942L36.6983 15.7156C36.6983 15.7156 36.1433 12.7191 32.9803 12.7191C31.0936 12.7191 29.8173 13.9953 29.8173 15.6878C29.8173 19.267 35.1999 21.2092 35.1999 26.4532C35.1999 30.4207 31.9537 34 26.3769 34C16.9989 34 16 24.0115 16 24.0115Z"
                    fill="#220E01"
                  />
                  <path
                    d="M25.4613 18.8536C25.1581 18.353 24.8185 17.8311 24.3708 17.2725C24.3704 17.272 24.37 17.2716 24.3697 17.2711C24.0968 16.931 23.4938 16.477 22.5205 17.2578C18.7844 20.2545 19.8799 27.0004 24.111 29.0674C29.0252 31.4681 32.2497 25.9491 28.1631 22.4348C26.7477 21.2176 26.2173 20.1017 25.4613 18.8536Z"
                    fill="#FF8D00"
                  />
                </svg>
              </div>
              <h1 className="mb-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <form onSubmit={onSubmit}>
                <LabelArea label="Email" />
                <InputArea
                  required={true}
                  register={register}
                  label="Email"
                  name="email"
                  type="email"
                  autoComplete="username"
                  placeholder="john@doe.com"
                />
                <Error errorName={errors.email} />
                <div className="mt-6"></div>
                <LabelArea label="Password" />
                <div className="relative">
                  <InputArea
                    required={true}
                    register={register}
                    label="Password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="***************"
                    className="pr-10"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                  >
                    {showPassword ? (
                      <FiEyeOff className="w-5 h-5" />
                    ) : (
                      <FiEye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <Error errorName={errors.password} />

                {loading ? (
                  <CMButton
                    disabled={loading}
                    type="submit"
                    className={`bg-emerald-600 rounded-md mt-4 h-12 w-full`}
                  />
                ) : (
                  <Button
                    disabled={loading}
                    type="submit"
                    className="mt-4 h-12 w-full"
                  >
                    {t("LoginTitle")}
                  </Button>
                )}
                <hr className="my-10" />
              </form>

              <p className="mt-4">
                <Link
                  className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                  to="/forgot-password"
                >
                  {t("ForgotPassword")}
                </Link>
              </p>
              {/* <p className="mt-1">
                <Link
                  className="text-sm font-medium text-emerald-500 dark:text-emerald-400 hover:underline"
                  to="/signup"
                >
                  {t("CreateAccountTitle")}
                </Link>
              </p> */}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Login;
