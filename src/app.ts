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

/* --- Balances Endpoint ---- */
app.get("/balances", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/balances`, {
      headers: {
		'x-api-key': `${API_KEY}`,
      },
    });
	const balances = response.data;
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
		//console.log("🚀 ~ file: app.ts:59 ~ app.get ~ transactionsResponse:", transactionsResponse.data)
		const allTransactions: Transaction[] = transactionsResponse.data.transactions;

		const filteredTransactions: Transaction[] = allTransactions.filter( (item: Transaction) => {
			const itemDate: Date = new Date(item.date);
			//console.log("🚀 ~ file: app.ts:67 ~ itemDate:", itemDate);
			const todate2: Date = new Date(toDate);
			todate2.setHours(23, 59, 59, 999); // I am setting the time to (23:59:59), otherwise it excludes 'toDate'
			return itemDate >= new Date(fromDate) && itemDate <= todate2;
		});
		//console.log("🚀 ~ file: app.ts:69 ~ app.get ~ filteredTransactions:", filteredTransactions)

		const historicalBalances: Balance[] = getHistoricalBalance(fromDate, toDate, filteredTransactions);
		//console.log("🚀 ~ file: app.ts:75 ~ app.get ~ historicalBalances:", historicalBalances)

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


export default app;