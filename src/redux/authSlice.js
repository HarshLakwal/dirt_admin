import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../server.js';
import { toast } from "react-toastify";
const initialState = {
    result: "",
    adminToken: "",
    admin: "",
    loading: false,
    error: ""
}

export const loginAdmin = createAsyncThunk('loginAdmin', async (data) => {
    try {
        const res = await fetch(`${server}/login`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })
        return await res.json()
    }
    catch (err) {
        return err
    }
})

const authSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem('token')
        },
        addAdmin: (state, action) => {
            state.admin = localStorage.getItem('admin')
        }
    },
    extraReducers: {
        [loginAdmin.pending]: (state, action) => {
            state.loading = true
        },
        [loginAdmin.fulfilled]: (state, { payload }) => {
            if (payload.message) {
                state.error = payload.message;
                state.loading = true;
                toast.error(payload.message)
            }
            else {
                state.error = ""
                state.loading = false;
                state.result = payload.result;
                state.admin = payload.admin
                state.adminToken = payload.adminToken
                localStorage.setItem('adminToken', payload.adminToken);
                localStorage.setItem('role', payload.admin.role)
                toast.success("LogIn Success...")
            }
        },
        [loginAdmin.rejected]: (state, action) => {
            state.loading = false
        }
    }
});
export const { addToken, addAdmin } = authSlice.actions;
export default authSlice.reducer;