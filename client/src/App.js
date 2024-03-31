import './App.css';

import LogIn from './pages/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './pagesComponents/sideBar';
// import TopBar from './pagesComponents/topBar';
import AppointmentForm from './appointmentReqForm';


// function App() {
//   return (
//      <LogIn />
//     //  <AppointmentForm />
//   );
// }
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LogIn />} />
        <Route path="/home" element={<AppointmentForm />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
