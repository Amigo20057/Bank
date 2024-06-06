export interface ICard {
	_id: any
	cardNumber: number
	balance: number
	month: string
	year: string
	cvv: number
}

export interface ITransferMoneyForm {
	cardNumberFirstUser: string
	cvv: string
	cardNumberSecondUser: string
	money: string
}
