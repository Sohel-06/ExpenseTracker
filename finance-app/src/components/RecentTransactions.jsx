import Image from "next/image";
import React from "react";

export default function RecentTransactions(props) {
  return (
    <div className="  flex flex-wrap justify-between gap-3 ">
      <section className="flex justify-between gap-3 ">
        <div className=" h-10 w-10 rounded-full bg-gray-100 ">
          <Image width={200} height={200} src={props.image} alt="avatar" />
        </div>
        <div className="text-sm">
          <p>{props.title}</p>
          <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[120px]  sm:w-auto  text-gray-400">
            {props.description}
          </div>
        </div>
      </section>
      <p className={props.type == "income" ? "text-green-500" : "text-red-500"}>
        {props.amount}
      </p>
    </div>
  );
}
