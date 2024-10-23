"use client";
import React, { useState } from "react";
import SearchSection from "../_components/SearchSection";
import TemplatesContent from "../_components/TemplatesContent";

const Dashboard = () => {
  const [handleSearch, setHandleSearch] = useState<string>("");
  const handleChange = (val: string) => {
    setHandleSearch(val);
  };

  return (
    <div>
      <SearchSection onChangeHandleInput={handleChange} />
      <TemplatesContent handleSearch={handleSearch} />
    </div>
  );
};

export default Dashboard;
