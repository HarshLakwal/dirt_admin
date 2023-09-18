import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { imageURL, server } from '../../server';
import { toast } from 'react-toastify';
import { getVehicalByCategory } from '../../redux/vehicalSlice';
import { RxCross1 } from 'react-icons/rx';
import styles from "../../styles/styles";
import { DataGrid } from '@material-ui/data-grid';
import { Button } from '@material-ui/core';
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Vehicals = () => {
    const dispatch = useDispatch();
    const [selectCategory, setSelectCategory] = useState("UTVMavericks")
    const [open, setOpen] = useState(false);
    const [userId, setUserId] = useState("");
    const vehical = useSelector((state) => state.vehical);
    console.log(selectCategory)
    useEffect(() => {
        dispatch(getVehicalByCategory(selectCategory));
    }, [selectCategory]);

    const handleDelete = async (id) => {
        await axios
            .get(`${server}/deactive-user/${id}`, { withCredentials: true })
            .then((res) => {
                toast.success(res.data.message);
            });
    };
    const columns = [
        { field: "SNo", headerName: "SNo.", minWidth: 40, flex: 0.4 },
        {
            field: "img ",
            flex: 0.7,
            minWidth: 10,
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <img src={`${imageURL}/${params.row.img}`} alt="img" width={80} />
                    </>
                );
            },
        },
        {
            field: "name",
            headerName: "Name",
            minWidth: 50,
            flex: 0.4,
        },
        {
            field: "price",
            headerName: "Price",
            type: "text",
            minWidth: 250,
            flex: 0.7,
        },
        {
            field: " ",
            flex: 0.7,
            minWidth: 10,
            headerName: "Action",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Button onClick={() => setUserId(params.id) || setOpen(true)}>
                            <AiOutlineDelete size={20} />
                        </Button>
                        <Link to={`/admin/preview-user/${params.id}`}>
                            <Button>
                                <AiOutlineEye size={20} />
                            </Button>
                        </Link>
                    </>
                );
            },
        },
    ];

    const row = [];
    vehical.data &&
        vehical.data.map((item, index) => {
            row.push({
                id: item._id,
                SNo: index + 1,
                img: item.vehicalImg,
                name: item.vehicalName,
                price: item.vehicalPrice
            });
        });
    return (
        <>
            <div className="w-full flex justify-center pt-5">
                <div className="w-[97%]">
                    <h3 className="text-[22px] font-Poppins pb-2">All Vehicals</h3>
                    <div class="dropdown inline-block relative z-10 mb-4">
                        <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                            <span class="mr-1">Dropdown</span>
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </button>
                        <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
                            <li class=""><a class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={(event) => setSelectCategory(event.target.textContent)}>UTVMavericks</a></li>
                            <li class=""><a class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={(event) => setSelectCategory(event.target.textContent)}>DirtBikes</a></li>
                            <li class=""><a class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={(event) => setSelectCategory(event.target.textContent)}>ATVRaptors</a></li>
                            <li class=""><a class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" onClick={(event) => setSelectCategory(event.target.textContent)}>UTVPolaris</a></li>
                        </ul>

                    </div>
                    <div className="w-full min-h-[45vh] bg-white rounded">
                        <DataGrid
                            rows={row}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                            autoHeight
                        />
                    </div>
                    {open && (
                        <div className="w-full fixed top-0 left-0 z-[999] bg-[#00000039] flex items-center justify-center h-screen">
                            <div className="w-[95%] 800px:w-[40%] min-h-[20vh] bg-white rounded shadow p-5">
                                <div className="w-full flex justify-end cursor-pointer">
                                    <RxCross1 size={25} onClick={() => setOpen(false)} />
                                </div>
                                <h3 className="text-[25px] text-center py-5 font-Poppins text-[#000000cb]">
                                    Are you sure you wanna delete this user?
                                </h3>
                                <div className="w-full flex items-center justify-center">
                                    <div
                                        className={`${styles.button} text-white text-[18px] !h-[42px] mr-4`}
                                        onClick={() => setOpen(false)}
                                    >
                                        cancel
                                    </div>
                                    <div
                                        className={`${styles.button} text-white text-[18px] !h-[42px] ml-4`}
                                        onClick={() => setOpen(false) || handleDelete(userId)}
                                    >
                                        confirm
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Vehicals