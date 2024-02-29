"use client"
import React, { useState } from "react";
import { SIDENAV_ITEMS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";

function SideNavbar() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const pathname = usePathname();

  return (
    <div className="relative">
      <div className="md:hidden">
        {/* Mobile Navbar */}
        <button
          className="fixed top-4 right-4 z-50 p-3 bg-slate-800 text-white "
          onClick={toggleMenu}
        >
          {isOpen ? <AiOutlineClose className="h-6 w-6"/> : <GiHamburgerMenu className="h-6 w-6"/>}
        </button>
        {isOpen && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-40">
            <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white overflow-y-auto">
              <div className="p-6">
                <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4">
                  Expense Tracker
                </h1>
                <div className="my-4 border-b border-gray-100 pb-4">
                  {SIDENAV_ITEMS.map(({ title, path, icon: Icon }) => {
                    const isActive = pathname === path;
                    return (
                      <Link key={path} href={path}>
                        <div
                          className={`${
                            isActive ? "bg-slate-100" : ""
                          } flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg`}
                        >
                          <Icon
                            className={`text-2xl group-hover:text-white ${
                              isActive ? "text-sky-600" : " text-gray-600"
                            }`}
                          />
                          <h3
                            className={`text-base group-hover:text-white font-semibold ${
                              isActive ? "text-sky-600" : "text-gray-800"
                            }`}
                          >
                            {title}
                          </h3>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex md:flex-col md:h-screen md:justify-between"> {/* Adjusted breakpoint to md for tablets */}
        <div className="p-6">
          <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4">
            Expense Tracker
          </h1>
          <div className="my-4 border-b border-gray-100 pb-4">
            {SIDENAV_ITEMS.map(({ title, path, icon: Icon }) => {
              const isActive = pathname === path;
              return (
                <Link key={path} href={path}>
                  <div
                    className={`${
                      isActive ? "bg-slate-100" : ""
                    } flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-gray-900 p-2 rounded-md group cursor-pointer hover:shadow-lg`}
                  >
                    <Icon
                      className={`text-2xl group-hover:text-white ${
                        isActive ? "text-sky-600" : " text-gray-600"
                      }`}
                    />
                    <h3
                      className={`text-base group-hover:text-white font-semibold ${
                        isActive ? "text-sky-600" : "text-gray-800"
                      }`}
                    >
                      {title}
                    </h3>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideNavbar;

