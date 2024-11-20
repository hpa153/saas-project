import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col flex-between min-h-screen w-full bg-brand-50">
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
