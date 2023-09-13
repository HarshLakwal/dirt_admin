import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../server.js';
const initialState = {
    data: "",
    loading: false,
    error: ""
}

export const getVehicalByCategory = createAsyncThunk('vehicals', async (data) => {
    console.log(data)
    try {
        const res = await fetch(`${server}/get-vehicalBycategory/${data}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            },
            // body: JSON.stringify({category:data})
        })
        return await res.json()
    }
    catch (err) {
        return err
    }
})


const vehicalSlice = createSlice({
    name: "vehicals",
    initialState,
    reducers: {},
    extraReducers: {
        [getVehicalByCategory.pending]: (state, action) => {
            state.loading = true
        },
        [getVehicalByCategory.fulfilled]: (state, { payload }) => {
            console.log(payload)
            if (payload.message) {
                state.error = payload.message;
                state.loading = true;
            }
            else {
                state.error = ""
                state.loading = false;
                state.data = payload.category;
            }
        },
        [getVehicalByCategory.rejected]: (state, action) => {
            state.loading = false
        }
    }
});
export default vehicalSlice.reducer;