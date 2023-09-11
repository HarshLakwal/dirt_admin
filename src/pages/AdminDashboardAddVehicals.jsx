import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import AddVehicals from '../components/Admin/AddVehicals'

const AdminDashboardAddVehicals = () => {
  return (
    <div>
    <AdminHeader />
    <div className="w-full flex">
        <div className="flex items-start justify-between w-full">
            <div className="w-[80px] 800px:w-[330px]">
                <AdminSideBar active={4} />
            </div>
            <AddVehicals />
        </div>
    </div>
</div>
  )
}

export default AdminDashboardAddVehicals