import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchCard = createAsyncThunk('card/fetchCard', async id => {
	const { data } = await axios.get(`/card/${id}`)
	return data
})

const initialState = {
	cards: {
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
				state.cards.items = []
				state.cards.status = 'loading'
			})
			.addCase(fetchCard.fulfilled, (state, action) => {
				state.cards.items = action.payload
				state.cards.status = 'idle'
			})
			.addCase(fetchCard.rejected, state => {
				state.cards.items = []
				state.cards.status = 'error'
			})
	},
})

export const cardReducer = cardSlice.reducer
