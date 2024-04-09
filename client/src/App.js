import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from './pagesComponents/sideBar';
// import TopBar from './pagesComponents/topBar';
// import AppointmentForm from "./pages/appointmentReqForm";
import Dashboard from "./pages/dushboard";
import LogIn from "./pages/LogIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />}></Route>
      <Route path="/home" element={<Dashboard />}></Route>
      {/* Add more routes as needed */}
    </Routes>
  );
};

// function App() {
//   return (
//     <div>
//       <Dashboard />
//     </div>
//   );
// }

export default App;
