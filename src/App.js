import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  LoginPage,
  ActivationPage,
  BestSellingPage,
  EventsPage,
  FAQPage,
  ProfilePage,
  AdminAddSeriesPage,
} from "./routes/Routes.js";

import {
  AdminDashboardPage,
  AdminDashboardUsers,

  AdmimDashboardGenerateCode,
  AdminDashboardAddVehicals,
  AdminDashboardVehicals
} from "./routes/AdminRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedAdminRoute from "./routes/ProtectedAdminRoute";
import AdminDashboardPreviewUser from "./pages/AdminDashboardPreviewUser";

const App = () => {
  // const [stripeApikey, setStripeApiKey] = useState("");

  // async function getStripeApikey() {
  //   const { data } = await axios.get(`${server}/payment/stripeapikey`);
  //   setStripeApiKey(data.stripeApikey);
  // }
  // useEffect(() => {
  //   Store.dispatch(loadUser());
  //   Store.dispatch(loadSeller());
  //   Store.dispatch(getAllProducts());
  //   Store.dispatch(getAllEvents());
  //   getStripeApikey();
  // }, []);

  return (
    <BrowserRouter>
      {/* {stripeApikey && (
        <Elements stripe={loadStripe(stripeApikey)}>
          <Routes>
            <Route
              path="/payment"
              element={
                <ProtectedRoute>
                  <PaymentPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Elements>
      )} */}
      <Routes>
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
      
       
        {/* Admin Routes */}
        <Route path="/admin/preview-user/:id" element={<AdminDashboardPreviewUser />} />
        <Route
          path="/admin/dashboard"
          element={
            // <ProtectedAdminRoute>
              <AdminDashboardPage />
            // </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            // <ProtectedAdminRoute>
              <AdminDashboardUsers />
            // </ProtectedAdminRoute>
          }
        />
        <Route
          path="/admin/generateCode"
          element={
            // <ProtectedAdminRoute>
              <AdmimDashboardGenerateCode />
            // </ProtectedAdminRoute>
          }
        />
       <Route
          path="admin/add-vehicals"
          element={
            // <ProtectedAdminRoute>
              < AdminDashboardVehicals/>
            // </ProtectedAdminRoute>
          }
        />
        
        
        
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
};

export default App;
