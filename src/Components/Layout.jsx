// /* eslint-disable no-unused-vars */
// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from "./Sidebar";

// const links = [
//   { name: "Dashboard", path: "/" },
//   { name: "Books", path: "/books" },
//   { name: "Members", path: "/members" },
//   { name: "Lendings", path: "/lendings" },
//   { name: "Returns", path: "/returns" },
//   { name: "Officers", path: "/officers" },
// ];

// const Dashboard = () => <div>Dashboard</div>;
// const Books = () => <div>Ini halaman Books</div>;
// const Members = () => <div>Members</div>;
// const Lendings = () => <div>Lendings</div>;
// const Returns = () => <div>Returns</div>;
// const Officers = () => <div>Officers</div>;

// function Layout() {
//   return (
//     <Router>
//       <div className="flex">
//         <Sidebar links={links} />
//         <div className="flex-1 p-4">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/books" element={<Books />} />
//             <Route path="/members" element={<Members />} />
//             <Route path="/lendings" element={<Lendings />} />
//             <Route path="/returns" element={<Returns />} />
//             <Route path="/officers" element={<Officers />} />
//           </Routes>
//         </div>
//       </div>
//     </Router>
//   );
// }

// export default Layout;
