import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Browse from "./Browse.js";
import Login from "./Login.js";

const Body = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </Router>
  );
};

export default Body;
// import { createBrowserRouter } from "react-router-dom";
// import Browse from "./Browse.js";
// import Login from "./Login.js";
// import { RouterProvider } from "react-router-dom";

// const Body = () => {
//   const appRouter = createBrowserRouter([
//     {
//       path: "/",
//       element: <Login />,
//     },
//     {
//       path: "/browse",
//       element: <Browse />,
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={appRouter} />
//     </div>
//   );
// };

// export default Body;
