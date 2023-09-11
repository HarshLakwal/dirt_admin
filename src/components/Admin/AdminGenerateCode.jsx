import { Button } from '@material-ui/core';
import { DataGrid } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux'
import { generateCodes, getAllCodes } from '../../redux/codeSlice.js'

const AdminGenerateCode = () => {
    const dispatch = useDispatch()
    const generate = () => {
        // dispatch(generateCodes())
    }
    useEffect(() => {
        dispatch(getAllCodes())
    }, [])
    const allCodes = useSelector((state) => state.getcodes)
    const columns = [
        { field: "id", headerName: "SNo.", minWidth: 80, flex: 0.3 },

        {
            field: "code",
            headerName: "Code",
            minWidth: 130,
            flex: 0.7,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                    ? "greenColor"
                    : "redColor";
            },
        },
        {
            field: "expire",
            headerName: "Expire",
            minWidth: 150,
            flex: 0.7,
        },

        {
            field: " ",
            flex: 0.5,
            minWidth: 10,
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button >
                            <AiOutlineDelete size={20} />
                        </Button>
                    </>
                );
            },
        },
    ];

    const row = [];
    allCodes.codes &&
        allCodes.codes.map((item, index) => {
            row.push({
                id: index + 1,
                code: item.code,
                expire: item.isExpire
            });
        });
    return (
        <>
            <div className='flex-col w-full justify-center' style={{ padding: "2rem 1rem", height: "100vh - 15vh" }}>
                <h3 className="text-[22px] font-Poppins pb-2">Generate Code</h3>
                <div className='flex justify-start mb-4'>
                    <button className='p-2 border-2 rounded-[7px]' onClick={generate}>Generate code</button>
                </div>
                <DataGrid
                    rows={row}
                    columns={columns}
                    pageSize={5}
                    disableSelectionOnClick
                    autoHeight
                />
            </div>

        </>
    )
}

export default AdminGenerateCode