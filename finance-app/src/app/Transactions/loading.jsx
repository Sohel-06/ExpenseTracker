import React from "react";

function loading() {
  return (
    <div class=" w-full h-full flex flex-col justify-center items-center">
      <div
        class="w-12 h-12 rounded-full animate-spin
                    border-4 border-solid border-green-500 border-t-transparent"
      ></div>
      <h2 class="text-center text-xl font-semibold">Loading...</h2>
    </div>
  );
}

export default loading;
