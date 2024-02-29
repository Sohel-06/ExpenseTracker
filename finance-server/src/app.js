const express=require("express");
const connect = require("./db/connection");
const financeRoutes=require("./routes/transactions")
require("dotenv").config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.listen(port, () => {
  console.log(`connection is setup at ${port}`);
});
connect();
app.use(financeRoutes);