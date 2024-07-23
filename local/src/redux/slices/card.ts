import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from '../../axios'
import { FormDelete } from '../../types/authTypes'
import { ITransferMoneyForm } from '../../types/cardTypes'

export const fetchCard = createAsyncThunk('card/fetchCard', async () => {
	const { data } = await axios.get('/card/card')
	return data
})

export const createCard = createAsyncThunk(
	'card/createCard',
	async newCardData => {
		const { data } = await axios.post('/card/create', newCardData)
		return data
	}
)

export const deleteCard = createAsyncThunk(
	'card/deleteCard',
	async (params: FormDelete) => {
		const { data } = await axios.post('/card/delete', params)
		return data
	}
)

export const moneyTransfer = createAsyncThunk(
	'transfer/moneyTransfer',
	async (transferData: ITransferMoneyForm) => {
		const { data } = await axios.patch('/card/moneyTransfer', transferData)
		return data
	}
)

const initialState = {
	cards: {
		items: [],
		status: 'loading',
	},
	transfer: {
		status: 'idle',
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

			.addCase(deleteCard.pending, state => {
				state.cards.status = 'loading'
			})
			.addCase(deleteCard.fulfilled, (state, action) => {
				state.cards.items = state.cards.items.filter(
					card => card._id !== action.payload._id
				)
				state.cards.status = 'idle'
			})
			.addCase(deleteCard.rejected, state => {
				state.cards.status = 'error'
			})

			.addCase(moneyTransfer.pending, state => {
				state.transfer.status = 'loading'
			})
			.addCase(moneyTransfer.fulfilled, (state, action) => {
				state.transfer.status = 'succeeded'
			})
			.addCase(moneyTransfer.rejected, state => {
				state.transfer.status = 'failed'
			})
	},
})

export const cardReducer = cardSlice.reducer
