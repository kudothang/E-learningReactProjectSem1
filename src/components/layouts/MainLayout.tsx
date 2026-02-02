import { Outlet } from "react-router";
import Footer from "./header/Footer";
import Header from "./header/Header";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Header/>
      <main className="flex-1 bg-white flex justify-center">
        <div className="w-full max-w-7xl">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;

