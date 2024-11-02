import React, { lazy } from "react";
import { ToastContainer } from "react-toastify";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import AccessibleNavigationAnnouncer from "@/components/AccessibleNavigationAnnouncer";
import PrivateRoute from "@/components/login/PrivateRoute";
import Dashboard from "./pages/Dashboard";
const Layout = lazy(() => import("@/layout/Layout"));
const Login = lazy(() => import("@/pages/Login"));
const SignUp = lazy(() => import("@/pages/SignUp"));
const ForgetPassword = lazy(() => import("@/pages/ForgotPassword"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/forgot-password" component={ForgetPassword} />
          <Route path="/reset-password/:token" component={ResetPassword} />
          <Route path="/dashboard" component={Layout} />
          {/* <Route path="/product/details/:id" element={<ProductDetails />}/> */}
          {/* <Route path="/product/:id" element={<ProductDetails />} /> */}

          {/* <PrivateRoute>
            <Route path="/dashboard" component={Layout} />
          </PrivateRoute> */}
          <Layout>
            <Route path="/" component={Layout} />
          </Layout>
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  );
};

export default App;
