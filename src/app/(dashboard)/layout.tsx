"use client";
import React, { useState } from "react";
import Sidenav from "./_components/Sidenav";
import Header from "./_components/Header";
import { BreadcrumbWithCustomSeparator } from "./_components/BreadCrums";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [creditUseage, setCreditUsage] = useState<number>(100);
  const [updateContext, setUpdateContext] = useState();
  return (
    <div>
      <div className="md:w-64   hidden md:block fixed  ">
        <Sidenav setIsOpen={() => {}} />
      </div>
      <div className="md:ml-64">
        <Header />
        <BreadcrumbWithCustomSeparator />
        <div>{children} </div>
      </div>
    </div>
  );
};

export default Layout;
