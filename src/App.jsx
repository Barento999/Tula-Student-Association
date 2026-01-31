import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import StudentRegistration from "./pages/StudentRegistration";
import Materials from "./pages/Materials";
import Volunteer from "./pages/Volunteer";
import Activities from "./pages/Activities";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import StudentDashboard from "./pages/StudentDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <AppProvider>
      <Router>
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
              <Route path="/materials" element={<Materials />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/activities" element={<Activities />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;
