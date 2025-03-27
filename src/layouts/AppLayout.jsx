import React from "react";
import "../App.css";
import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container  mx-auto ">
        <Header />
        <Outlet />
      </main>
      <footer className="p-6 text-center bg-[#241C31] mt-10">
        Made with Sanjay Singh Kanwasi with ❤️
      </footer>
    </div>
  );
};

export default AppLayout;
