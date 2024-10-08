import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import "./App.css";
import FeedBackPage from "./components/FeedBackPage";
import ReviewsPage from "./components/ReviewsPage";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import GenerateOtp from "./components/GenerateOtp";

// Lazy load components
const Header = lazy(() => import("./components/header"));
const Hero = lazy(() => import("./components/hero"));
const Login = lazy(() => import("./components/login"));
const Tours = lazy(() => import("./components/Tours"));
const SignUp = lazy(() => import("./components/signup"));
const TourDetails = lazy(() => import("./components/TourDetails"));
const EditProfile = lazy(() => import("./components/EditProfile"));
const BookingsPage = lazy(() => import("./components/BookingsPage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

function App() {
  const location = useLocation();

  return (
    <main className="h-[400v min-h-[100vh] font-sans bg-[#161931]">
      {/* Conditionally render Header only on the homepage */}
      <Suspense fallback={<div>Loading...</div>}>
        {location.pathname === "/" && <Header />}
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tours" element={<Tours />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tours/:id" element={<TourDetails />} />
          <Route path="/users/me" element={<EditProfile />} />
          <Route path="/my-tours" element={<BookingsPage />} />
          <Route path="/bookmarks" element={<Tours />} />
          <Route path="/tours/:tourId/reviews" element={<FeedBackPage />} />
          <Route path="/reviews/my-reviews" element={<ReviewsPage />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/reset-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<ForgotPassword />} />
          <Route path="/forgot-password" element={<GenerateOtp />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      <Toaster richColors position="bottom-center" />
    </main>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
