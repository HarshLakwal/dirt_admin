import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../server.js';
import { toast } from "react-toastify";
import axios from 'axios';

const initialState = {
    message: "",
    users: "",
    loading: "",
}

export const getAllUsers = createAsyncThunk('Users', async () => {
    try {
        const res = await fetch(`${server}/get-users`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            },
        })
        return await res.json()
    }
    catch (err) {
        return err
    }
});
export const getUser = createAsyncThunk('User', async (userId) => {
    try {
        const res = await fetch(`${server}/get-user`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            },
             body: JSON.stringify(userId)
        })
        return await res.json()
    }
    catch (err) {
        return err
    }
});
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Users: (state, action) => {
        //     state.users = localStorage.getItem('users');
        // }
    },
    extraReducers: {
        [getAllUsers.pending]: (state, action) => {
            state.loading = true
        },
        [getAllUsers.fulfilled]: (state, payload) => {
           
            if(payload.payload.message){
                state.loading = false
                state.users = payload.payload.result
                state.message = payload.payload.message
                state.error = ""
            }
            else{
                state.error = payload.payload.message
            }
            
        },
        [getAllUsers.rejected]: (state, action) => {
            state.loading = true
        }
    }
});

export const { Users } = userSlice.actions;
export default userSlice.reducer;