import { Button } from "flowbite-react";
import { BiSolidBookAdd } from "react-icons/bi";
import { HiViewBoards } from "react-icons/hi";
import { GrSchedule } from "react-icons/gr";
import { Link } from "react-router-dom"; // Import Link
import { Outlet } from "react-router-dom";

function History() {
  return (
    <div>
      <Button.Group>
        <Link to="/Dashboard/History/Appointments">
          {" "}
          <Button color="gray">
            <HiViewBoards className="mr-1 h-5 w-5 flex-auto" />
            Appointments
          </Button>
        </Link>
        <Link to="/Dashboard/History/Prescriptions">
          {" "}
          <Button color="gray">
            <GrSchedule className="mr-1 h-5 w-5 flex-auto" />
            Prescriptions
          </Button>
        </Link>
        <Link to="/Dashboard/History/requests">
          {" "}
          <Button color="gray">
            <BiSolidBookAdd className="mr-1 h-5 w-5 flex-auto" />
            Requests
          </Button>
        </Link>
      </Button.Group>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
export default History;
