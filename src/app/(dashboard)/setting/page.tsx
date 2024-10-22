import React from "react";
import { UserProfile } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex justify-center items-center">
      <UserProfile routing="hash" />
    </div>
  );
};

export default Page;
