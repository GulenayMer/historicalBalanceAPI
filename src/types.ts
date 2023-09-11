export interface Transaction {
	amount: number;
	currency: string;
	date: string;
	status: string;
}

export interface Balance {
	amount: number;
	currency: string;
	date: string;
}