import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";
import Hamberger from "./Hamberger";

const Header = async () => {
  return (
    <div className=" p-4 md:p-5 shadow-sm border-b-2 flex flex-col md:flex-row  items-center justify-between">
      <div className="hidden md:block">
        <div className="flex items-center gap-2 rounded-xl outline outline-1 outline-black  p-2 max-w-lg border-solid  ">
          <Search />
          <input
            type="text"
            className="outline-none p-2"
            placeholder="search here..."
          />
        </div>
      </div>
      <div className="flex justify-between w-full">
        <div className="block md:hidden">
          <Hamberger />
        </div>
        <h2 className="bg-purple-500 p-[0.3] text-md rounded-full text-center mx-auto my-auto">
          join Membership just 100-Rs/Month
        </h2>
        <div className="h-full ">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
