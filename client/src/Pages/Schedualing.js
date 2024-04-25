import { Button } from "flowbite-react";
import { BiSolidBookAdd } from "react-icons/bi";
import { TbBrandBooking } from "react-icons/tb";
import RequestAppointment from "./RequestedAppointment";
function Schedualing() {
  return (
    <div>
      <Button.Group>
        <Button color="gray">
          <TbBrandBooking className="mr-1 h-5 w-5 flex-auto" />
          Avalibale Appointments
        </Button>
        <Button color="gray">
          <BiSolidBookAdd className="mr-1 h-5 w-5 flex-auto" />
          Request Form
        </Button>
      </Button.Group>
      <div>
        <RequestAppointment />
      </div>
    </div>
  );
}
export default Schedualing;
