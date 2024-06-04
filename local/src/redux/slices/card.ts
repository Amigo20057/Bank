import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchCard = createAsyncThunk('card/fetchCard', async () => {
	const { data } = await axios.get('/card')
	return data
})

export const createCard = createAsyncThunk(
	'card/createCard',
	async newCardData => {
		const { data } = await axios.post('/createCard', newCardData)
		return data
	}
)

const initialState = {
	cards: {
		items: [],
		status: 'loading',
	},
}

const cardSlice = createSlice({
	name: 'cards',
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
			.addCase(createCard.pending, state => {
				state.cards.status = 'loading'
			})
			.addCase(createCard.fulfilled, (state, action) => {
				state.cards.items.push(action.payload)
				state.cards.status = 'idle'
			})
			.addCase(createCard.rejected, state => {
				state.cards.status = 'error'
			})
	},
})

export const cardReducer = cardSlice.reducer
