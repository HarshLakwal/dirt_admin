import React from 'react'

import { AiOutlineLogout } from 'react-icons/ai'
import { Link } from 'react-router-dom'

const AdminHeader = () => {
  const logout = () => {
    localStorage.clear()
  }
  // const { user } = useSelector((state) => state.user);
  return (
    <div className="w-full h-[80px] bg-white shadow sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div>
        <Link to="/admin/dashboard">
          <img
            src='https://dirt-backend.onrender.com/uploads/Dirt-logo2.png'
            alt=""
            width={100}
            className=' inline-block'
          />
        </Link>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          {/* <Link to="/dashboard/cupouns" className="800px:block hidden">
            <AiOutlineGift
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}
          {/* <Link to="/dashboard-events" className="800px:block hidden">
            <MdOutlineLocalOffer
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}
          {/* <Link to="/dashboard-products" className="800px:block hidden">
            <FiShoppingBag
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />
          </Link> */}
          {/* <Link to="/dashboard-orders" className="800px:block hidden">
            <FiPackage color="#555" size={30} className="mx-5 cursor-pointer" />
          </Link> */}

         

          <Link to="/" onClick={logout} data-tooltip-target="tooltip-default">
            <AiOutlineLogout
              color="#555"
              size={30}
              className="mx-5 cursor-pointer"
            />

          </Link>

        </div>
      </div>
    </div>
  )
}

export default AdminHeader