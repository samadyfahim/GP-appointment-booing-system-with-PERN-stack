import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Sidebar from './pagesComponents/sideBar';
// import TopBar from './pagesComponents/topBar';
// import AppointmentForm from "./pages/appointmentReqForm";
import AppointmentReqTable from "./pages/appointmenReqTable";
import Appointments from "./pages/Appointments";
import Prescription from "./pages/Prescription";
import Schedualing from "./pages/Schedualing";
import History from "./pages/History";

import Dashboard from "./pages/dushboard";
import LogIn from "./pages/LogIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LogIn />}></Route>
      <Route path="/Dashboard" element={<Dashboard />}>
        <Route path="/Dashboard/Appointments" element={<Appointments />} />
        <Route path="/Dashboard/Prescription" element={<Prescription />} />
        <Route path="/Dashboard/Schedualing" element={<Schedualing />} />
        <Route path="/Dashboard/History" element={<History />}>
          <Route
            path="/Dashboard/History/Appointments"
            element={<Appointments />}
          />
          <Route
            path="/Dashboard/History/Prescriptions"
            element={<Prescription />}
          />
          <Route
            path="/Dashboard/History/requests"
            element={<AppointmentReqTable />}
          />
        </Route>
      </Route>
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
