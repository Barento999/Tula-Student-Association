import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect } from "react";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import StudentRegistration from "./pages/StudentRegistration";
import StudentLogin from "./pages/StudentLogin";
import ForgotPassword from "./pages/ForgotPassword";
import Materials from "./pages/Materials";
import Volunteer from "./pages/Volunteer";
import Activities from "./pages/Activities";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Donation from "./pages/Donation";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import VolunteerProfile from "./pages/VolunteerProfile";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Scroll to top component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <AppProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route
                path="/student-registration"
                element={<StudentRegistration />}
              />
              <Route path="/student-login" element={<StudentLogin />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route
                path="/materials"
                element={
                  <ProtectedRoute>
                    <Materials />
                  </ProtectedRoute>
                }
              />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/donation" element={<Donation />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/student-profile" element={<StudentProfile />} />
              <Route path="/volunteer-profile" element={<VolunteerProfile />} />
              <Route path="/sys-auth-portal" element={<AdminLogin />} />
              <Route path="/sys-dashboard-mgmt" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
          <ScrollToTopButton />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
