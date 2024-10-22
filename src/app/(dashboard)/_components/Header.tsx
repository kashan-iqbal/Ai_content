import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import React from "react";
import Hamberger from "./Hamberger";

const Header = async () => {
  return (
    <div className="p-5 shadow-sm border-b-2 flex flex-col md:flex-row  items-center justify-between">
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
        <h2 className="bg-purple-500 p-2 rounded-full text-center ml-4 mb-3">
          join Membership just $9.99/Month
        </h2>
        <div className="h-full ">
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default Header;
