import React from "react";
import Card from "./Card";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { GiExpense } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";

const CardsInfo = ({ data }) => {
  const incomeObj = data.find((item) => item.typeName === "income");
  const expenseObj = data.find((item) => item.typeName === "expense");
  const cardData = [
    {
      label: "Total Income",
      amount: `$${incomeObj.totalAmount}`,
      discription: `total ${incomeObj.count} transactions made`,
      icon: FaMoneyCheckAlt,
      className: "text-green-500",
    },
    {
      label: "Total Expense",
      amount: `$${expenseObj.totalAmount}`,
      discription: `total ${expenseObj.count} transactions made`,
      icon: GiExpense,
      className: "text-red-500",
    },
    {
      label: "Balance",
      amount: `$${incomeObj.totalAmount - expenseObj.totalAmount}`,
      icon: MdAccountBalance,
      className: "text-blue-500",
    },
    {
      label: "Total Transactions",
      amount: `${incomeObj.count + expenseObj.count}`,
      icon: AiOutlineTransaction,
      className: "text-sky-300",
    },
  ];
  return (
    <section className="grid w-full grid-cols-1 gap-4 gap-x-8 transition-all sm:grid-cols-2 xl:grid-cols-4">
      {cardData.map((d, i) => (
        <Card
          key={i}
          amount={d.amount}
          discription={d.discription}
          icon={d.icon}
          label={d.label}
          className={d.className}
        />
      ))}
    </section>
  );
};

export default CardsInfo;
