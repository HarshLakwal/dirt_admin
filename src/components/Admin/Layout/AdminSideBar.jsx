import React from "react";
import { RxDashboard } from "react-icons/rx";
import { CiMoneyBill } from "react-icons/ci";
import { Link } from "react-router-dom";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BiMoviePlay, BiBarcodeReader } from "react-icons/bi"
import { AiOutlineCar } from 'react-icons/ai'
import { MdOutlineSubscriptions, MdOutlineCategory } from "react-icons/md";

const AdminSideBar = ({ active }) => {
  return (

    <div className="w-full h-[90vh] bg-white shadow-sm sticky top-0 left-0 z-10">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "#8DD253" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 1 ? "text-[#8DD253]" : "text-[#555]"
              }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/users" className="w-full flex items-center">
          <HiOutlineUserGroup
            size={30}
            color={`${active === 2 ? "#8DD253" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 2 ? "text-[#8DD253]" : "text-[#555]"
              }`}
          >
            Users
          </h5>
        </Link>
      </div>




      <div className="w-full flex items-center p-4">
        <Link to="/admin/generateCode" className="w-full flex items-center">
          <BiBarcodeReader
            size={30}
            color={`${active === 3 ? "#8DD253" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 3 ? "text-[#8DD253]" : "text-[#555]"
              }`}
          >
            Generate Code
          </h5>
        </Link>
      </div>
      <div className="w-full flex items-center p-4">
        <Link
          to="/admin/add-vehicals"
          className="w-full flex items-center"
        >
          <AiOutlineCar
            size={30}
            color={`${active === 4 ? "#8DD253" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 text-[18px] font-[400] ${active === 4 ? "text-[#8DD253]" : "text-[#555]"
              }`}
          >
            Vehicals
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSideBar;
