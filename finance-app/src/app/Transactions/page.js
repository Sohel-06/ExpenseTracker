import PageTitle from "@/components/PageTitle";
import { User, columns } from "./columns";
import { DataTable } from "@/components/data-table";

async function getAllTransactions() {
  const res = await fetch(
    "http://localhost:8080/get-transactions?page=1&limit=600",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data;
}

export default async function Page() {
  const data = await getAllTransactions();

  return (
    <div className="flex flex-col gap-5 w-full">
      <PageTitle title="Transaction History" />
      <DataTable columns={columns} data={data} />
    </div>
  );
}
