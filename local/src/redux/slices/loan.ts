import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const takeLoan = createAsyncThunk(
	'loan/takeLoan',
	async (loanData, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/card/takeLoan', loanData)
			return data
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const repayLoan = createAsyncThunk(
	'loan/repayLoan',
	async (loanData, { rejectWithValue }) => {
		try {
			const { data } = await axios.post('/card/repayLoan', loanData)
			return data
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

const initialState = {
	status: 'idle',
	error: null,
}

const loanSlice = createSlice({
	name: 'loan',
	initialState,
	reducers: {
		resetLoanStatus: state => {
			state.status = 'idle'
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(takeLoan.pending, state => {
				state.status = 'loading'
			})
			.addCase(takeLoan.fulfilled, state => {
				state.status = 'succeeded'
			})
			.addCase(takeLoan.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
					? action.payload.message
					: 'Failed to take loan'
			})
			.addCase(repayLoan.pending, state => {
				state.status = 'loading'
			})
			.addCase(repayLoan.fulfilled, state => {
				state.status = 'succeeded'
			})
			.addCase(repayLoan.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.payload
					? action.payload.message
					: 'Failed to repay loan'
			})
	},
})

export const { resetLoanStatus } = loanSlice.actions

export const loanReducer = loanSlice.reducer
