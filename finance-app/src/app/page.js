import React from "react";
import GraphicalView from "@/components/GraphicalView";
import CardsInfo from "@/components/CardsInfo";
import { CardContent } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import RecentTransactions from "@/components/RecentTransactions";

async function getData() {
  const res = await fetch("http://localhost:8080/get-sum", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getRecentTransactionsData() {
  const res = await fetch(
    "http://localhost:8080/get-transactions?page=1&limit=6",
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
async function getIncomeExpenseData(type) {
  const res = await fetch(`http://localhost:8080/get-info?type=${type}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}
const getImage = (img) => {
  switch (img) {
    case "salary":
      return "/salary.png";
    case "bussiness":
      return "/extra.png";
    case "freeLance":
      return "/personal.png";
    case "stocks":
      return "/interest.png";
    case "rent":
      return "/house.png";
    case "food":
      return "/food.png";
    case "bills":
      return "/bills.png";
    case "transportation":
      return "/transport.png";
    default:
      return "/shopping.png";
  }
};
const Home = async () => {
  const dataInfo = await getData();
  const recentTransactionsData = await getRecentTransactionsData();
  const incomeInfo = await getIncomeExpenseData("income");
  const expenseInfo = await getIncomeExpenseData("expense");
  const [data, recentTransactions, incomeData, expenseData] = await Promise.all(
    [dataInfo, recentTransactionsData, incomeInfo, expenseInfo]
  );
  let count = {};
  recentTransactionsData.forEach(function (item) {
    count[item.type] ? count[item.type]++ : (count[item.type] = 1);
  });
  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Dashboard" />
      <CardsInfo data={data} />
      <section className="grid grid-cols-1  gap-4 transition-all lg:grid-cols-2">
        <GraphicalView incomeData={incomeData} expenseData={expenseData} />
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent transactions</p>
            <p className="text-sm text-gray-400">
              You have {count.income} incomes and {count.expense} expenses
              recently.
            </p>
          </section>
          {recentTransactions.map((transaction) => (
            <RecentTransactions
              key={transaction._id}
              description={transaction.description}
              title={transaction.title}
              amount={transaction.amount}
              type={transaction.type}
              image={getImage(transaction.category)}
            />
          ))}
        </CardContent>
      </section>
    </div>
  );
};

export default Home;
