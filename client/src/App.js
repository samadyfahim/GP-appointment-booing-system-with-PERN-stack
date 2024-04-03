import './App.css';

import LogIn from './pages/LogIn';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Sidebar from './pagesComponents/sideBar';
// import TopBar from './pagesComponents/topBar';
import AppointmentForm from './pages/appointmentReqForm';


const App = () => {
  return (
      <Routes>
        <Route path="/" element={<LogIn />}></Route>
        <Route path="/home" element={<AppointmentForm /> }></Route>      
        {/* Add more routes as needed */}
      </Routes>
  );
};

export default App;
