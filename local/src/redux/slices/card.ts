import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchCard = createAsyncThunk('card/fetchCard', async () => {
	const { data } = await axios.get(`/card`)
	return data
})

const initialState = {
	card: {
		items: [],
		status: 'loading',
	},
}

const cardSlice = createSlice({
	name: 'card',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchCard.pending, state => {
				state.card.items = []
				state.card.status = 'loading'
			})
			.addCase(fetchCard.fulfilled, (state, action) => {
				state.card.items = action.payload
				state.card.status = 'idle'
			})
			.addCase(fetchCard.rejected, state => {
				state.card.items = []
				state.card.status = 'error'
			})
	},
})

export const cardReducer = cardSlice.reducer
