import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layout/dashboardLayout/DashboardLayout";
import Dashboard from "../components/Dashboard/Dashboard";
import UserManagement from "../page/UserManagement/UserManagement";




import Profile from "../page/Settings/Profile";
import TermsCondition from "../page/Settings/TermsCondition";
import FAQ from "../page/Settings/FAQ";
import PrivacyPolicy from "../page/Settings/PrivacyPolicy";


import ForgetPass from "../Auth/ForgetPass";
import Verify from "../Auth/Verify";
import ResetPass from "../Auth/ResetPass";
import Notification from "../page/Notification/Notification";
import About from "../page/Settings/About";
import Login from "../Auth/Login";
import { Blog } from "../page/blog/Blog";
import { ManageTicket } from "../page/manageTicket/ManageTicket";
import { PartnerManage } from "../page/partnerManage/PartnerManage";
import { ContactUs } from "../page/Settings/ContactUs";
import { AddBlog } from "../page/blog/AddBlog";
import ProtectedRoute from "../protectedRoute/ProtectedRoute";
import { ServicesPricing } from "../page/service/ServicesPricing";


export const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
        <ProtectedRoute><DashboardLayout></DashboardLayout></ProtectedRoute>
      
    ),
    children: [
      {
        path: "/",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/dashboard/UserManagement",
        element: <UserManagement></UserManagement>,
      },
      {
        path: "/dashboard/blog",
        element: <Blog></Blog>
      },
      {
        path: "/dashboard/blog/add-blog",
        element: <AddBlog></AddBlog>
      },
      {
        path: "/dashboard/manageTicket",
        element: <ManageTicket></ManageTicket>
      },
      {
        path: "/dashboard/partnerManage",
        element: <PartnerManage></PartnerManage>
      },
      
      {
        path: "/dashboard/service-pricing",
        element: <ServicesPricing></ServicesPricing>
      },
      
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/profile",
        element: <Profile></Profile>,
      },
      {
        path: "/dashboard/Settings/contact-us",
        element: <ContactUs></ContactUs>
      },
      {
        path: "/dashboard/Settings/notification",
        element: <Notification></Notification>,
      },
      {
        path: "/dashboard/Settings/Terms&Condition",
        element: <TermsCondition></TermsCondition>,
      },
      {
        path: "/dashboard/Settings/FAQ",
        element: <FAQ></FAQ>,
      },
      {
        path: "/dashboard/Settings/feedback",
        element: <About></About>,
      },
      {
        path: "/dashboard/Settings/PrivacyPolicy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },
    ],
  },

  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/forgetpassword",
    element: <ForgetPass></ForgetPass>,
  },
  {
    path: "/verify",
    element: <Verify></Verify>,
  },
  {
    path: "/reset",
    element: <ResetPass></ResetPass>,
  },
]);
