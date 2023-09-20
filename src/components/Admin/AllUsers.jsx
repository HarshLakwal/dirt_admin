import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { AiOutlineDelete, AiOutlineEye } from "react-icons/ai";
import { Button } from "@material-ui/core";
import styles from "../../styles/styles";
import { RxCross1 } from "react-icons/rx";
import { FcApproval, FcCancel } from 'react-icons/fc'
import { makeStyles } from '@material-ui/core'
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { getAllUsers } from "../../redux/userSlice.js";
import moment from "moment/moment";
const useStyles = makeStyles({
  header: {
    '& .MuiDataGrid-columnHeaderTitleContainer': {
      justifyContent: 'center'
    },
    '& .MuiDataGrid-cell': {
      display: 'flex',
      justifyContent: 'center'
    },
    '& .MuiDataGrid-root .MuiDataGrid-cell--textLeft.MuiDataGrid-cell--withRenderer': {
      display: 'flex',
      justifyContent: 'center '
    }
  }
});

const AllUsers = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await axios.get(`${server}/deactive-user/${id}`, { withCredentials: true })
      .then((res) => {
        toast.success(res.data.message);
      });
  };
  const columns = [
    { field: "SNo", headerName: "SNo.", minWidth: 40, flex: 0.4 },

    {
      field: "name",
      headerName: "name",
      type: "text",
      minWidth: 50,
      flex: 0.4,
    },
    {
      field: "email",
      headerName: "Email",
      type: "text",
      minWidth: 250,
      flex: 0.7,
    },
    {
      field: "document",
      headerName: "Document",
      type: "text",
      minWidth: 100,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            <span>
              ({
                params.row.document ?
                  <FcApproval size={20} />
                  : <FcCancel size={20} />}
              )
            </span>
          </>
        );
      },
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      type: "text",
      minWidth: 40,
      flex: 0.5,
    },
    {
      field: " ",
      flex: 0.7,
      minWidth: 10,
      headerName: "DeActive User",
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
  users &&
    users.map((item, index) => {
      row.push({
        id: item._id,
        SNo: index + 1,
        name: item.name,
        email: item.email,
        document: item.verifiedUser,
        createdAt: moment(item.createdAt).format('DD/MM/YYYY'),
        joinedAt: item.createdAt.slice(0, 10),
      });
    });
  return (
    <div className="w-full flex justify-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Users</h3>
        <div className="w-full min-h-[45vh] bg-white rounded">
          <DataGrid
            rows={row}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            autoHeight
          // className={classes.header}

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
  );
};

export default AllUsers;