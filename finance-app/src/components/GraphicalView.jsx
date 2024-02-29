"use client"
import React from 'react';
import { MoreVertical } from "lucide-react";
import { CardContent } from './Card';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import SideBySideChart from './SideBySideChart';
import BarChart from './BarChart'

const GraphicalView = ({incomeData,expenseData}) => {
    const [chartType, setChartType] = React.useState("barChart");
    let dataIncome = [];
    incomeData.forEach(function (item) {
      dataIncome.push(item.totalIncome);
    });
    let dataExpense = [];
    expenseData.forEach(function (item) {
      dataExpense.push(item.totalIncome);
    });
    let data=[];
    for(let i = 0;i<dataExpense.length;i++){
        data.push(dataIncome[i] - dataExpense[i]);
    }
 
    return (
      <CardContent>
        <div className="flex items-center ">
          <p className="p-4 font-semibold">{new Date().getFullYear()} Year Overview</p>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MoreVertical className="ml-auto cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuRadioGroup
                value={chartType}
                onValueChange={setChartType}
              >
                <DropdownMenuRadioItem value="barChart">
                  View Income vs Expense Bar Chart
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="linChart">
                  View Balance Line Chart
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {chartType === "barChart" ? <SideBySideChart dataIncome={dataIncome}dataExpense={dataExpense}/> : <BarChart data={data}/>}
      </CardContent>
    );
}

export default GraphicalView
