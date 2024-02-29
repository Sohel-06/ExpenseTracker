const express = require("express");
const { addTransaction,getTransactions,deleteTransaction, getInfo,getAggregateSum } = require("../controllers/transactions");
const router = new express.Router();


router.post('/add-transaction',addTransaction);
router.get('/get-transactions',getTransactions);
router.delete('/delete-transaction',deleteTransaction) ;
router.get('/get-info',getInfo);
router.get('/get-sum',getAggregateSum);


module.exports = router;
