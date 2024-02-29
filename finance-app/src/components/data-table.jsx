"use client";

import { useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { IoAddOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardFooter } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useRouter } from "next/navigation";

export function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    amount: "",
    category: "",
    description: "",
  });
  const [formDataErrors, setFormDataErrors] = useState({
    title: "",
    date: "",
    amount: "",
    category: "",
    description: "",
  });
  const [expenseFormData, setExpenseFormData] = useState({
    title: "",
    date: "",
    amount: "",
    category: "",
    description: "",
  });
  const [expenseFormDataErrors, setExpenseFormDataErrors] = useState({
    title: "",
    date: "",
    amount: "",
    category: "",
    description: "",
  });
  const router = useRouter();
  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 6,
      },
    },
  });
  const handleChange = (value, name) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleChangeExpense = (value, name) => {
    setExpenseFormData({
      ...expenseFormData,
      [name]: value,
    });
  };
  const handleAddIncome = async () => {
    const errors = {};
    let hasErrors = false;
    Object.keys(formData).forEach((key) => {
      if (formData[key].trim() === "") {
        errors[key] = true;
        hasErrors = true;
      }
    });
    setFormDataErrors(errors);
    if (!hasErrors) {
      let payload = formData;
      payload.type = "income";

      const response = await fetch("http://localhost:8080/add-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      router.refresh();
      setOpen(false);
    }
  };
  const handleAddExpense = async () => {
    const errors = {};
    let hasErrors = false;
    Object.keys(expenseFormData).forEach((key) => {
      if (expenseFormData[key].trim() === "") {
        errors[key] = true;
        hasErrors = true;
      }
    });
    setExpenseFormDataErrors(errors);
    if (!hasErrors) {
      let payload = expenseFormData;
      payload.type = "expense";

      const response = await fetch("http://localhost:8080/add-transaction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      router.refresh();
      setOpen(false);
    }
  };

  return (
    <div className="w-full">
      {/* Filters */}

      <div className="flex items-center py-4">
        <Input
          placeholder="Search based on Title..."
          value={table.getColumn("title")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="ml-auto text-white bg-blue-700 hover:bg-blue-800 hover:text-white"
            >
              <IoAddOutline className="mr-1" /> ADD
            </Button>
          </DialogTrigger>
          <DialogContent>
            <Tabs defaultValue="income" className="mt-5">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="income">Income</TabsTrigger>
                <TabsTrigger value="expense">Expense</TabsTrigger>
              </TabsList>
              <TabsContent value="income">
                <Card>
                  <CardContent className="space-y-2 mt-5">
                    <div className="space-y-1">
                      <Input
                        placeholder="Title"
                        value={formData.title}
                        onChange={(e) => handleChange(e.target.value, "title")}
                      />
                      <span
                        className={`${
                          formDataErrors.title ? "visible" : "invisible"
                        } text-red-500`}
                      >
                        Title is required
                      </span>
                    </div>
                    <div className="space-y-1">
                      <Select
                        value={formData.category}
                        onValueChange={(e) => handleChange(e, "category")}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="salary">Salary</SelectItem>
                          <SelectItem value="bussiness">Bussiness</SelectItem>
                          <SelectItem value="freeLance">Free Lance</SelectItem>
                          <SelectItem value="stocks">Stocks</SelectItem>
                        </SelectContent>
                      </Select>
                      <span
                        className={`${
                          formDataErrors.category ? "visible" : "invisible"
                        } text-red-500`}
                      >
                        Category is required
                      </span>
                    </div>

                    <div className="flex w-full items-center space-x-2">
                      <div className="w-full">
                        <Input
                          type="date"
                          placeholder="Date"
                          value={formData.date}
                          onChange={(e) => handleChange(e.target.value, "date")}
                        />
                        <span
                          className={`${
                            formDataErrors.date ? "visible" : "invisible"
                          } text-red-500`}
                        >
                          Date is required
                        </span>
                      </div>
                      <div className="w-full">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={formData.amount}
                          onChange={(e) =>
                            handleChange(e.target.value, "amount")
                          }
                        />
                        <span
                          className={`${
                            formDataErrors.amount ? "visible" : "invisible"
                          } text-red-500`}
                        >
                          Amount is required
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Input
                        placeholder="Description"
                        value={formData.description}
                        onChange={(e) =>
                          handleChange(e.target.value, "description")
                        }
                      />
                      <span
                        className={`${
                          formDataErrors.description ? "visible" : "invisible"
                        } text-red-500`}
                      >
                        Description is required
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className=" justify-center">
                    <Button
                      className="focus:outline-none text-white bg-green-700 hover:bg-green-800"
                      onClick={handleAddIncome}
                    >
                      Add Income
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="expense">
                <Card>
                  <CardContent className="space-y-2 mt-5">
                    <div className="space-y-1">
                      <Input
                        placeholder="Title"
                        value={expenseFormData.title}
                        onChange={(e) =>
                          handleChangeExpense(e.target.value, "title")
                        }
                      />
                      <span
                        className={`${
                          expenseFormDataErrors.title ? "visible" : "invisible"
                        } text-red-500`}
                      >
                        Title is required
                      </span>
                    </div>
                    <div className="space-y-1">
                      <Select
                        value={expenseFormData.category}
                        onValueChange={(e) =>
                          handleChangeExpense(e, "category")
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="rent">Rent</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="bills">Bills</SelectItem>
                          <SelectItem value="transportation">
                            Transportation
                          </SelectItem>
                          <SelectItem value="shopping">Shopping</SelectItem>
                        </SelectContent>
                      </Select>
                      <span
                        className={`${
                          expenseFormDataErrors.category
                            ? "visible"
                            : "invisible"
                        } text-red-500`}
                      >
                        Category is required
                      </span>
                    </div>
                    <div className="flex w-full items-center space-x-2">
                      <div className="w-full">
                        <Input
                          type="date"
                          placeholder="Date"
                          value={expenseFormData.date}
                          onChange={(e) =>
                            handleChangeExpense(e.target.value, "date")
                          }
                        />
                        <span
                          className={`${
                            expenseFormDataErrors.date ? "visible" : "invisible"
                          } text-red-500`}
                        >
                          Date is required
                        </span>
                      </div>
                      <div className="w-full">
                        <Input
                          type="number"
                          placeholder="Amount"
                          value={expenseFormData.amount}
                          onChange={(e) =>
                            handleChangeExpense(e.target.value, "amount")
                          }
                        />
                        <span
                          className={`${
                            expenseFormDataErrors.amount
                              ? "visible"
                              : "invisible"
                          } text-red-500`}
                        >
                          Amount is required
                        </span>
                      </div>
                    </div>
                    <div className="space-y-1">
                      <Input
                        placeholder="Description"
                        value={expenseFormData.description}
                        onChange={(e) =>
                          handleChangeExpense(e.target.value, "description")
                        }
                      />
                      <span
                        className={`${
                          expenseFormDataErrors.description
                            ? "visible"
                            : "invisible"
                        } text-red-500`}
                      >
                        Description is required
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className=" justify-center">
                    <Button
                      className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500"
                      onClick={handleAddExpense}
                    >
                      Add Expense
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table className="bg-white">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
