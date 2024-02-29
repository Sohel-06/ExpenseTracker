import { FaMoneyCheckAlt } from "react-icons/fa";
import { AiOutlineTransaction } from "react-icons/ai";
import { RiDashboardLine } from "react-icons/ri";
import { GiExpense } from "react-icons/gi";
import { MdAccountBalance } from "react-icons/md";


export const SIDENAV_ITEMS= [
  {
    title: 'Dashboard',
    path: '/',
    icon:  RiDashboardLine,
  },
  {
    title: 'Transactions',
    path: '/Transactions',
    icon:  AiOutlineTransaction ,
  },
];

export const cardData= [
    {
      label: "Total Income",
      amount: "$45,231.89",
      discription: "+20.1% from last month",
      icon: FaMoneyCheckAlt,
      className:"text-green-500",
    },
    {
      label: "Total Expense",
      amount: "+2350",
      discription: "+180.1% from last month",
      icon: GiExpense,
      className:"text-red-500"
    },
    {
      label: "Balance",
      amount: "+12,234",
      discription: "+19% from last month",
      icon: MdAccountBalance,
      className:"text-blue-500"
    },
    {
        label: "Total Transactions",
        amount: "+12,234",
        discription: "+19% from last month",
        icon: AiOutlineTransaction,
        className:"text-sky-300"
      },
    
  ];

  export const recentTransactionData = [
    {
      title: "salary",
      description: "this month salary",
      amount: "+$1,999.00",
      type:"income",
      image:"/salary.png"
    },
    {
        title: "stocks",
      description: "money earned in stocks",
      amount: "+$1,999.00",
      type:"income",
      image:"/interest.png"
    },
    {
        title: "credit card bill",
      description: "credit bill jan",
      amount: "-$39.00",
      type:"expense",
      image:"/house.png"
    },
    {
        title: "shopping",
      description: "marraiage shopping",
      amount: "-$299.00",
      type:"expense",
      image:"/food.png",

    },
    {
        title: "fuel",
      description: "bike fuel",
      amount: "-$39.00",
      type:"expense",
      image:"/transport.png"
    }
  ];

  export const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "october",
    "November",
    "December",
  ];