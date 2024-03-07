/* eslint-disable no-unused-vars */
import { BsArrowLeftCircle } from "react-icons/bs";
import { FcSalesPerformance } from "react-icons/fc";
import { useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(true);
  return (
    <div className="flex">
      <div className={`bg-neutral-900 h-screen p-5 pt-8 text-white ${open ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftCircle className={`bg-white text-neutral-900 text-3xl rounded-full absolute -right-3 top-9 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
        <div className="inline-flex">
          <FcSalesPerformance className={`text-4xl cursor-pointer block float-left rounded mr-2 duration-500 ${!open && "rotate-[360deg]"}`} />
          <h1 className={`origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>ShafaShopy</h1>
        </div>
      </div>
      <div className="p-7">
        <h1 className="text-2xl font-semibold">Home Page</h1>
      </div>
    </div>
  );
}
