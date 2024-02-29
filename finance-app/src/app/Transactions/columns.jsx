"use client";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { MdDelete } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Image from "next/image";


export const columns = [
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <section className="flex gap-3 items-center">
        <div className=" h-10 w-10 rounded-full bg-red-100 ">
          <Image width={200} height={200} src={row.getValue("type")=='income'?'/extra.png':'/bills.png'} alt="avatar" />
        </div>
        <div className="capitalize">{row.getValue("type")}</div>
      </section>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("category")}</div>
    ),
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("title")}</div>
      
    ),
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("description")}</div>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount)
 
      return <div className={row.getValue("type")=="income"?"text-green-500":"text-red-500"}>{formatted}</div>
    },
  },
  {
    accessorKey: "a",
    header: () => <div className="text-left">Actions</div>,
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();
      const handleDelete = async (id) => {
        const response = await fetch(
          `http://localhost:8080/delete-transaction?id=${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        router.refresh();
        console.log(response.json());
      };
      return (
        <div className="space-x-2">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800"
              >
                <MdDelete className="mr-1" /> Delete
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your transaction and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="focus:outline-none text-white bg-green-700 hover:bg-green-800">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800"
                  onClick={() => handleDelete(user._id)}
                >
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );
    },
  },
];
