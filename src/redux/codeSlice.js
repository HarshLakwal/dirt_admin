import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../server.js';
import { toast } from "react-toastify";
const initialState = {
    codes: "",
    loading: false,
    error: "",
    message: ""
}

export const generateCodes = createAsyncThunk('generateCodes', async () => {
    try {
        const res = await fetch(`${server}/generate-code`, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(data)
        })
        return await res.json()
    }
    catch (err) {
        return err
    }
})
export const getAllCodes = createAsyncThunk('getcodes', async () => {
    try {
        const res = await fetch(`${server}/get-allcode`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify(data)
        })

        return await res.json()
    }
    catch (err) {
        return err
    }
})
const generateCodeSlice = createSlice({
    name: "code",
    initialState,
    reducers: {},
    extraReducers: {
        [generateCodes.pending]: (state, action) => {
            state.loading = true
        },
        [generateCodes.fulfilled]: (state, { payload }) => {
            
            if (payload.message) {
                state.error = payload.message;
                state.loading = true;
                toast.error(payload.message)
            }
            else {
                state.error = "";
                state.loading = false;
                state.message = payload.result;
                toast.success("codes generated successfully");
            }
        },
        [generateCodes.rejected]: (state, action) => {
            state.loading = false
        }
    }
});
const getCodeSlice = createSlice({
    name: "getcodes",
    initialState,
    reducers: {},
    extraReducers: {
        [getAllCodes.pending]: (state, action) => {
            state.loading = true
        },
        [getAllCodes.fulfilled]: (state, { payload }) => {
           

            if (payload.message) {
                state.error = payload.message;
                state.loading = true;
                toast.error(payload.message)
            }
            else {
                state.error = "";
                state.loading = false;
                state.codes = payload.result[0].codes;
            }
        },
        [getAllCodes.rejected]: (state, action) => {
            state.loading = false
        }
    }
});
export const codeSlice = generateCodeSlice.reducer;
export const getCodesSlice = getCodeSlice.reducer