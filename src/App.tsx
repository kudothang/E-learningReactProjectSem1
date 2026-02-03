import "./App.css";
// Import từ react-router-dom
import { Routes, Route } from "react-router";
import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./pages/HomePage";
import CoursePage from "./pages/CoursePage";
import CourseDetail from "./pages/CourseDetail";

function App() {
  return (
    
      <Routes>
        {/* MainLayout cần có Outlet bên trong */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/courses" element={<CoursePage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
        </Route>
      </Routes>
   
  );
}

export default App;