/* eslint-disable no-unused-vars */
import { BsArrowLeftCircle, BsChevronDown, BsBackpack4, BsBagCheck } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { BiSolidPurchaseTagAlt } from "react-icons/bi";
import { RiDashboardLine } from "react-icons/ri";
import { useState } from "react";

export default function Layout() {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const menus = [
    { title: "Dashboard" },
    { title: "Products", icon: <BsBackpack4 /> },
    { title: "Category", icon: <MdCategory /> },
    { title: "Reseller", icon: <FaUsers /> },
    {
      title: "Transaction",
      icon: <FaSackDollar />,
      submenu: true,
      submenuItems: [{ title: "Sale" }, { title: "Purchase", icon: <BiSolidPurchaseTagAlt /> }],
    },
  ];
  return (
    <div className="flex">
      <div className={`bg-neutral-900 h-screen p-5 pt-8 text-white ${open ? "w-72" : "w-20"} duration-300 relative`}>
        <BsArrowLeftCircle className={`bg-white text-neutral-900 text-3xl rounded-full absolute -right-3 top-9 cursor-pointer ${!open && "rotate-180"}`} onClick={() => setOpen(!open)} />
        <div className="inline-flex">
          <BsBackpack4 className={`text-4xl cursor-pointer block float-left rounded mr-2 duration-500 ${!open && "rotate-[360deg]"}`} />
          <h1 className={`origin-left font-medium text-2xl duration-300 ${!open && "scale-0"}`}>ShafaShopy</h1>
        </div>
        <ul className="pt-2 mt-10">
          {menus.map((item, index) => (
            <>
              <li key={index} className="text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-gray-500 rounded-md mt-2">
                <span className="text-2xl block float-left">{item.icon ? item.icon : <RiDashboardLine />}</span>
                <span className={`text-base font-medium flex-1 ${!open && "hidden"}`}>{item.title}</span>
                {item.submenu && open && (
                  <BsChevronDown
                    className={`${subMenuOpen && "rotate-180"}`}
                    onClick={() => {
                      setSubMenuOpen(!subMenuOpen);
                    }}
                  />
                )}
              </li>
              {item.submenu && subMenuOpen && open && (
                <ul>
                  {item.submenuItems.map((subMenuItem, index) => (
                    <li key={index} className="text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-gray-500 rounded-md mt-2">
                      {subMenuItem.title}
                    </li>
                  ))}
                </ul>
              )}
            </>
          ))}
        </ul>
      </div>
      <div className="p-7">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
      </div>
    </div>
  );
}
