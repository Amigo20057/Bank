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

export const getMoneyTransfers = createAsyncThunk(
	'transfer/getMoneyTransfers',
	async () => {
		const { data } = await axios.get('/card/getMoneyTransfers')
		return data
	}
)

const initialState = {
	cards: {
		items: [],
		status: 'loading',
	},
	transfers: {
		items: [],
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
				state.transfers.status = 'loading'
			})
			.addCase(moneyTransfer.fulfilled, (state, action) => {
				state.transfers.status = 'succeeded'
			})
			.addCase(moneyTransfer.rejected, state => {
				state.transfers.status = 'failed'
			})

			.addCase(getMoneyTransfers.pending, state => {
				state.transfers.items = []
				state.transfers.status = 'loading'
			})
			.addCase(getMoneyTransfers.fulfilled, (state, action) => {
				state.transfers.items = action.payload
				state.transfers.status = 'idle'
			})
			.addCase(getMoneyTransfers.rejected, state => {
				state.transfers.items = []
				state.transfers.status = 'error'
			})
	},
})

export const cardReducer = cardSlice.reducer
