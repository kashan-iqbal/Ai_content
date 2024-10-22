"use client";
import React, { useState } from "react";
import { createUsageContext } from "../(context)/creditUsageContext";
import Sidenav from "./_components/Sidenav";
import Header from "./_components/Header";
import { updateCreditContext } from "../(context)/updateCredit";
import { BreadcrumbWithCustomSeparator } from "./_components/BreadCrums";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [creditUseage, setCreditUsage] = useState<number>(100);
  const [updateContext, setUpdateContext] = useState();
  return (
    <updateCreditContext.Provider value={{ updateContext, setUpdateContext }}>
      <createUsageContext.Provider value={{ creditUseage, setCreditUsage }}>
        <div>
          <div className="md:w-64   hidden md:block fixed  ">
            <Sidenav />
          </div>
          <div className="md:ml-64">
            <Header />
            <BreadcrumbWithCustomSeparator />
            <div>{children} </div>
          </div>
        </div>
      </createUsageContext.Provider>
    </updateCreditContext.Provider>
  );
};

export default Layout;
