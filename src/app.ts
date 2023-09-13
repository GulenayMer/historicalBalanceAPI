import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../swagger.json";
import axios from "axios";
import { getHistoricalBalance } from "./services/getHistoricalBalances";
import { Transaction, Balance } from './types'

const app = express();
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const API_KEY = process.env.API_KEY ;
const API_BASE_URL = process.env.API_BASE_URL;

let initialBalance = 0;

/* 1) Current date is 30-06-22 and transactions total on that day is -32
	that means total balance was 132 on 29-06-22
	2) Based on this I need to calculate current balances for the each day 
	from currentDate till toDate, from there to fromDate.
 */

/* --- Balances Endpoint ---- */
app.get("/balances", async (req, res) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/balances`, {
			headers: {
			'x-api-key': `${API_KEY}`,
		},
		});
		const balances = response.data;
		initialBalance += balances.amount / 100;
		return res.json(balances);
	} catch (error) {
		return res.status(500).json({ error: "Server Error: Failed to fetch balances" });
	}
});

/* ------- Transactions Endpoint ------ */
app.get("/transactions", async (req, res) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/transactions`, {
			headers: {
				'x-api-key': `${API_KEY}`,
		},
	});
		const transactions = response.data;
		return res.json(transactions);
	} catch (error) {
		return res.status(500).json({ error: "Server Error: Failed to fetch transactions"});
	}
}); 


/* ------- Historical Balances Endpoint ------ */
app.get("/historical-balances", async (req, res) => {
	try {
		const { from, to, sort } = req.query;
		const fromDate: string = String(from);
		const toDate: string = String(to);
		const sortDesc: string = String(sort);

		const transactionsResponse = await axios.get(`${API_BASE_URL}/transactions`, {
			headers: {
				'x-api-key': `${API_KEY}`,
			},
		});
		const allTransactions: Transaction[] = transactionsResponse.data.transactions;

		const filteredTransactions: Transaction[] = allTransactions.filter( (item: Transaction) => {
			const itemDate: Date = new Date(item.date);
			const todate2: Date = new Date(toDate);
			todate2.setHours(23, 59, 59, 999); 
			return itemDate >= new Date(fromDate) && itemDate <= todate2;
		});


		const historicalBalances: Balance[] = getHistoricalBalance(fromDate, toDate, filteredTransactions);

		if (sortDesc === 'desc') {
			const desc = historicalBalances.sort((a: Balance, b: Balance) => {
				const dateA = new Date(a.date.split('/').reverse().join('-')); 
				const dateB = new Date(b.date.split('/').reverse().join('-'));
			
				return dateB.getTime() - dateA.getTime();
			});
		
			return res.json(desc);
		}
	} catch (error) {
		return res.status(500).json({ error: "Server Error: Failed to fetch historical balances" });
	}
});


/* interface DailyBalances {
	[date: string]: number;
}
  const dailyBalances: DailyBalances = {} */

/* --- Balances Endpoint ---- */
/* app.get("/balances", async (req, res) => {
try {
    const response = await axios.get(`${API_BASE_URL}/balances`, {
    headers: {
		'x-api-key': `${API_KEY}`,
    },
    });
	
	const balances = response.data;
	initialBalance += balances.amount / 100;
	dailyBalances[balances.date] = initialBalance;
    return res.json(dailyBalances);
} catch (error) {
    return res.status(500).json({ error: "Server Error: Failed to fetch balances" });
}
}); */

/* app.get("/transactions", async (req, res) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/transactions`, {
		headers: {
			'x-api-key': `${API_KEY}`,
		},
	});
	const transactions: Transaction[] = response.data;
	console.log(response.data);
	
	transactions.forEach(transaction => {
		const transactionDate = transaction.date;
		const transactionAmount = transaction.amount / 100;
		initialBalance += transactionAmount;
		
		dailyBalances[transactionDate] = initialBalance;
	});

	return res.json(dailyBalances);
	} catch (error) {
	return res.status(500).json({ error: "Server Error: Failed to fetch transactions" });
	}
  }); */
export default app;