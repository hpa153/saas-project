import { ReactNode } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import BackgroundPattern from "@/components/BackgroundPattern";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col flex-between min-h-screen w-full">
      <BackgroundPattern className="absolute inset-0 left-1/2 z-0 -translate-x-1/2 opacity-75" />
      <NavBar />
      {children}
      <Footer />
    </main>
  );
};

export default Layout;
