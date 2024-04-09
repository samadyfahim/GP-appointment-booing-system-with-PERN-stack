import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  FaClinicMedical,
  FaCommentMedical,
  FaHireAHelper,
} from "react-icons/fa";
import {
  MdOutlineMedicationLiquid,
  MdWorkHistory,
  MdContactPhone,
} from "react-icons/md";
import { HiViewBoards } from "react-icons/hi";
import { GrSchedule } from "react-icons/gr";
import { IoSettings, IoLogOut } from "react-icons/io5";

function SidebarComponent() {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/Dashboard" icon={FaClinicMedical}>
            Home
          </Sidebar.Item>
          <Sidebar.Item href="Dashboard/Appointments" icon={HiViewBoards}>
            Appointments
          </Sidebar.Item>
          <Sidebar.Item
            href="Dashboard/Prescription"
            icon={MdOutlineMedicationLiquid}
          >
            Prescription
          </Sidebar.Item>
          <Sidebar.Item href="Dashboard/Schedualing" icon={GrSchedule}>
            Schedualing
          </Sidebar.Item>
          <Sidebar.Item href="Dashboard/History" icon={MdWorkHistory}>
            History
          </Sidebar.Item>
          <Sidebar.Item href="Dashboard/Inbox" icon={FaCommentMedical}>
            Inbox
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        <Sidebar.ItemGroup>
          <Sidebar.Item href="/" icon={IoLogOut}>
            Sign Out
          </Sidebar.Item>
          <Sidebar.Item href="Dashboard/Settings" icon={IoSettings}>
            Settings
          </Sidebar.Item>
          <Sidebar.Item href="Dashboard/Contact" icon={MdContactPhone}>
            Contact
          </Sidebar.Item>
          <Sidebar.Item href="Dashboard/Help" icon={FaHireAHelper}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
export default SidebarComponent;
