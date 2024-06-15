export interface Loan {
	_id: string
	amount: number
}

export interface Card {
	_id: string
	cardNumber: string
	balance: number
	loans: Loan[]
}

export interface FormLoan {
	cardNumber: string
	loan: string
	money: string
	cvv: string
}
