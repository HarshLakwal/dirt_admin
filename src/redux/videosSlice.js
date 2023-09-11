import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { server } from '../server.js';

const initialState = {
    msg: "",
    videoData: "",
    loading: false,
    error: ""
}

export const getkidsCategoryMovieVideos = createAsyncThunk('getKidsMovieVideos', async (data) => {
    try {
        const res = await fetch(`${server}/getTitleMovies?title=${data}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        })
        return await res.json()
    }
    catch (err) {
        return err
    }
})

export const getSeriesTitleVideos = createAsyncThunk('getSeriesVideos', async (data) => {
    try {
        const res = await fetch(`${server}/getTitleSeries?title=${data}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json",
            }
        })
        return await res.json()
    }
    catch (err) {
        return err
    }
})

const kidsMovieSlice = createSlice({
    name: 'kidsMovieVideos',
    initialState,
    reducers: {},
    extraReducers: {
        [getkidsCategoryMovieVideos.pending]: (state, action) => {
            state.loading = true
        },
        [getkidsCategoryMovieVideos.fulfilled]: (state, payload) => {
            if (payload.payload.categories) {
                state.loading = false
                state.videoData = payload.payload.categories ? payload.payload.categories : payload.payload.categories[0].data
                state.msg = payload.payload.status
                state.error = ""
            }
            else {
                state.error = payload.payload.message
            }
        },
        [getkidsCategoryMovieVideos.rejected]: (state, action) => {
            state.loading = true
        }
    }
});

const seriesMovieSlice = createSlice({
    name: 'series',
    initialState,
    reducers: {},
    extraReducers: {
        [getSeriesTitleVideos.pending]: (state, action) => {
            state.loading = true
        },
        [getSeriesTitleVideos.fulfilled]: (state, payload) => {
            if (payload.payload.categories) {
                state.loading = false
                state.videoData = payload.payload.categories ? payload.payload.categories : payload.payload.categories[0].data
                state.msg = payload.payload.status
                state.error = ""
            }
            else {
                state.error = payload.payload.message
            }
        },
        [getSeriesTitleVideos.pending]: (state, action) => {
            state.loading = true
        }
    }
})
export const kidsSlice = kidsMovieSlice.reducer
export const seriesSlice = seriesMovieSlice.reducer