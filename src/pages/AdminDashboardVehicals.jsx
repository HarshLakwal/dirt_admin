import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import Vehicals from '../components/Admin/Vehicals'

const AdminDashboardVehicals = () => {
    return (
        <>
            <div>
                <AdminHeader />
                <div className="w-full flex">
                    <div className="flex items-start justify-between w-full">
                        <div className="w-[80px] 800px:w-[330px]">
                            <AdminSideBar active={4} />
                        </div>
                       <Vehicals/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboardVehicals