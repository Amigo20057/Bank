import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const createReport = createAsyncThunk(
	'/reportCreate',
	async reportData => {
		const { data } = await axios.post('/report', reportData)
		return data
	}
)

const initialState = {
	reports: {
		items: [],
		status: 'idle',
	},
}

const reportSlice = createSlice({
	name: 'reports',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(createReport.pending, state => {
				state.reports.status = 'loading'
			})
			.addCase(createReport.fulfilled, (state, action) => {
				state.reports.items.push(action.payload)
				state.reports.status = 'idle'
			})
			.addCase(createReport.rejected, state => {
				state.reports.status = 'error'
			})
	},
})

export const reportReducer = reportSlice.reducer
