"use client";
import NavBar from "@/components/NavBar";
import TitlePage from "@/components/TitlePage";
import React from "react";

function page() {
  return (
    <>
      <div className="w-full">
        <NavBar />
        <div className="sm:w-10/12 w-11/12  mx-auto flex flex-col">
          <TitlePage title="Pagos" />
          <div>xdxd</div>
        </div>
      </div>
    </>
  );
}

export default page;
