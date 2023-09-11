import React, { useEffect, useState } from "react";
import styles from "../../styles/styles";
import { HiOutlineTicket } from "react-icons/hi";
import { BiUserCheck } from "react-icons/bi"
import { FaRupeeSign } from "react-icons/fa"
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";



const AdminDashboardMain = () => {
  const dispatch = useDispatch();
 
  const users = useSelector((state) => state.users.users);
  // const transaction = useSelector((state) => state.transactions.transactions)
  // console.log(transaction)
  let amount = 0
  // transaction&&
  // transaction.map((items) => {
  //   return amount += items.amount
  // })

  const columns = [
    { field: "id", headerName: "Order ID", minWidth: 150, flex: 0.7 },

    {
      field: "status",
      headerName: "Status",
      minWidth: 130,
      flex: 0.7,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Delivered"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Items Qty",
      type: "number",
      minWidth: 130,
      flex: 0.7,
    },

    {
      field: "total",
      headerName: "Total",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
    {
      field: "createdAt",
      headerName: "Order Date",
      type: "number",
      minWidth: 130,
      flex: 0.8,
    },
  ];

  const row = [];
  // adminOrders &&
  // adminOrders.forEach((item) => {
  //     row.push({
  //       id: item._id,
  //       itemsQty: item?.cart?.reduce((acc, item) => acc + item.qty, 0),
  //       total: item?.totalPrice + " $",
  //       status: item?.status,
  //       createdAt: item?.createdAt.slice(0,10),
  //     });
  //   });
  return (
    <>
      {
        // adminOrderLoading ? (
        //   <Loader />
        // ) : (
        <div className="w-full p-4">
          <h3 className="text-[22px] font-Poppins pb-2">Overview</h3>
          <div className="w-full block 800px:flex items-center justify-between">
            <div className="w-full mb-4 800px:w-[30%] min-h-[15vh] bg-white shadow rounded px-2 py-5">
              <div className="flex w-full justify-around">
                {/* <div className="flex flex-col">
                  <div className="flex items-center">
                    <HiUserGroup
                      size={30}
                      className="mr-2"
                      fill="#00000085"
                    />
                    <h3
                      className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                    >
                      Total User
                    </h3>
                  </div>
                  <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{users.length}</h5>
                </div> */}
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <BiUserCheck
                      size={30}
                      className="mr-2 bg-lime-400 rounded-md"
                      fill="#00000085"
                    />
                    <h3
                      className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                    >
                      Active User
                    </h3>
                  </div>
                  <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{users.length}</h5>

                </div>

              </div>
              <Link to="/admin/users" className="flex justify-center ">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Users</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[15vh] bg-white shadow rounded px-2 py-5">
              <div className="flex w-full justify-around">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <FaRupeeSign
                      size={25}
                      className="mr-2  rounded-md"
                      fill="#00000085"
                    />
                    <h3
                      className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                    >
                      Total Earning
                    </h3>
                  </div>
                  <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{amount}</h5>

                </div>

              </div>
              <Link to="#" className="flex justify-center ">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Transaction</h5>
              </Link>
            </div>

            <div className="w-full mb-4 800px:w-[30%] min-h-[15vh] bg-white shadow rounded px-2 py-5">
              <div className="flex w-full justify-around">
                <div className="flex flex-col">
                  <div className="flex items-center">
                    <HiOutlineTicket
                      size={30}
                      className="mr-2  rounded-md"
                      // fill="#00000085"
                    />
                    <h3
                      className={`${styles.productTitle} !text-[18px] leading-5 !font-[400] text-[#00000085]`}
                    >
                      Special Code
                    </h3>
                  </div>
                  <h5 className="pt-2 pl-[36px] text-[22px] font-[500]">{100}</h5>
                </div>
              </div>
              <Link to="/admin/generateCode" className="flex justify-center ">
                <h5 className="pt-4 pl-2 text-[#077f9c]">View Codes</h5>
              </Link>
            </div>
          </div>

          <br />
          {/* <h3 className="text-[22px] font-Poppins pb-2">Latest Orders</h3>
          <div className="w-full min-h-[45vh] bg-white rounded">
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={4}
              disableSelectionOnClick
              autoHeight
            />
          </div> */}
        </div>
        // )
      }
    </>
  );
};

export default AdminDashboardMain;