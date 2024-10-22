"use client";
import { History, Home, Settings, BrickWallIcon } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import UseTrack from "./UseTrack";

const Sidenav = ({ setIsOpen }) => {
  const router = useRouter();
  const pathName = usePathname();

  const MenutList = [
    {
      name: "Home",
      icon: Home,
      pathName: "/menu", // Already correct
    },
    {
      name: "History",
      icon: History,
      pathName: "/history",
    },
    {
      name: "Billing",
      icon: BrickWallIcon,
      pathName: "/billing", // Ensure consistency with lowercase paths
    },
    {
      name: "Setting",
      icon: Settings,
      pathName: "/setting", // Ensure consistency with lowercase paths
    },
  ];

  const handleNavigation = (path) => {
    router.push(path);
    if (setIsOpen) {
      setIsOpen((prev) => !prev);
    }
  };

  const isExactActive = (menuPath) => pathName.includes(menuPath);
  // Function to check if the current path is active for nested routes
  const isNestedActive = (menuPath) =>
    pathName.startsWith(menuPath) && pathName !== "/dashboard";

  return (
    <div className="h-screen relative border p-5 shadow-sm">
      <div className="flex justify-center items-center">
        <Image
          src="/logo.svg"
          height={100}
          width={100}
          alt="logo"
          onClick={() => handleNavigation("/")}
          style={{ cursor: "pointer" }}
        />
      </div>
      <hr className="mt-7" />
      <div className="mt-5">
        {MenutList.map((m, i) => {
          return (
            <div
              key={i}
              onClick={() => handleNavigation(m.pathName)}
              className={`flex gap-2 mb-2 p-3 rounded-2xl cursor-pointer hover:bg-purple-500 hover:text-white ${
                isExactActive(m.pathName) ? "bg-purple-500 text-white" : ""
              }`}
            >
              <m.icon />
              <h1 className="ml-5 font-bold">{m.name}</h1>
            </div>
          );
        })}
      </div>
      <div className="bottom-20 rounded left-1 w-full absolute">
        <UseTrack />
      </div>
    </div>
  );
};

export default Sidenav;
