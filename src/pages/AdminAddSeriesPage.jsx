import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import AdminHeader from "../components/Layout/AdminHeader";
import AdminSideBar from "../components/Admin/Layout/AdminSideBar";
import AddSeriesVideo from "../components/Admin/AdminAddSeries.jsx";

const AdminAddSeries = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [searchParams] = useSearchParams();
  const eventData = searchParams.get("isEvent");

  return (
    <div>
      <AdminHeader />
      <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
          <div className="w-[80px] 800px:w-[330px]">
            <AdminSideBar active={5} />
          </div>
          <div className="w-full justify-center flex">
            <AddSeriesVideo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAddSeries;
