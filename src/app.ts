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
	const transactions: Transaction[] = transactionsResponse.data.transactions;

	const filteredTransactions: Transaction[] = transactions.filter((transaction: Transaction) => {
		const transactionDate: Date = new Date(transaction.date);
		return transactionDate >= new Date(fromDate) && transactionDate <= new Date(toDate);
	});

	const historicalBalances: Balance[] = getHistoricalBalance(fromDate, toDate, filteredTransactions);

	const desc = historicalBalances.sort((a: Balance, b: Balance) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return res.json(desc);

	} catch (error) {
	  return res.status(500).json({ error: "Server Error: Failed to fetch historical balances" });
	}
  });
  
 


export default app;
