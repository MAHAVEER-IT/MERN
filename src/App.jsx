import { useEffect, useState } from "react";
import AddTransaction from "./components/AddTransaction";
import TransactionList from "./components/TransactionList";
import "./App.css";
import Balance from "./components/Balance";
import IncomeExpense from "./components/IncomeExpense";

function App() {
  const [transactions, setTransactions] = useState([]);

  useEffect(()=>{
    fetch('https://mern-back-end-1z43.onrender.com/api/expensesAll').then(res=>res.json()).then(data=>console.log(data))
  })

  const onAddTransaction = (data) => {
    axios
      .post("https://mern-back-end-1z43.onrender.com/api/expenses", data)
      .then((res) => {
        setTransactions([...transactions, res.data]); // Add the newly created transaction to the state
      })
      .catch((err) => console.error("Error adding transaction:", err));
  };

  const onDeleteTransaction = (id) => {
    console.log("Deleting transaction with ID:", id);
    axios
      .delete(`https://mern-back-end-1z43.onrender.com/api/expensesdeletebyId/:${id}`)
      .then(() => {
        console.log("Transaction deleted successfully");
        setTransactions(transactions.filter((transaction) => transaction.id !== id)); 
      })
      .catch((err) => console.error("Error deleting transaction:", err));
  };

  useEffect(()=>{
    fetch('https://mern-back-end-1z43.onrender.com/api/expensesAll').then(res=>res.json()).then(data=>console.log(data))
  }, []);
  

  return (
    <>
    <div className="container">
      <h1>EXPENSE TRACKER</h1>
      <Balance transactions = {transactions}/>
      <IncomeExpense transactions = {transactions} />
      <TransactionList
        transactions={transactions}
        onDelete={onDeleteTransaction}
      />
      <AddTransaction onAdd={onAddTransaction} />
    </div>
    </>
  );
}

export default App;

