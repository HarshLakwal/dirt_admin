import React from 'react'
import AdminHeader from '../components/Layout/AdminHeader'
import AdminSideBar from '../components/Admin/Layout/AdminSideBar'
import PreviewUser from './PreviewUser'

const AdminDashboardPreviewUser = () => {
    return (
        <>
            <div>
                <AdminHeader />
                <div className="w-full flex">
                    <div className="flex items-start justify-between w-full">
                        <div className="w-[80px] 800px:w-[330px]">
                            <AdminSideBar active={2} />
                        </div>
                        <PreviewUser />
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminDashboardPreviewUser