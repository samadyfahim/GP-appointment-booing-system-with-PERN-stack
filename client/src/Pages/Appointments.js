import React, { useState, useEffect } from "react";
import { Table, Button } from "flowbite-react";
import axiosWithAuth from "../middelware/axiosWithAuth";
import ConfirmModal from "../pagesComponents/ConfirmModal";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const axiosInstance = axiosWithAuth();
        const response = await axiosInstance.get("/api/user/appointments");
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async () => {
    try {
      const axiosInstance = axiosWithAuth();
      await axiosInstance.put(
        `/api/appointment/appointments/${selectedAppointment.id}`,
        {
          status: "cancel",
        }
      );
      const updatedAppointments = appointments.map((appointment) => {
        if (appointment.id === selectedAppointment.id) {
          return { ...appointment, AppointmentStatus: { status: "cancel" } };
        }
        return appointment;
      });
      setAppointments(updatedAppointments);
    } catch (error) {
      console.error("Error canceling appointment:", error);
    }
    setShowConfirmModal(false);
  };

  const handleShowConfirmModal = (appointment) => {
    setSelectedAppointment(appointment);
    setShowConfirmModal(true);
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-4xl font-bold">All Appointments </h1>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Appointment ID</Table.HeadCell>
          <Table.HeadCell>Patient Name</Table.HeadCell>
          <Table.HeadCell>Doctor's Name</Table.HeadCell>
          <Table.HeadCell>Appointment Date</Table.HeadCell>
          <Table.HeadCell>Appointment Status</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell> {/* Add Action column */}
        </Table.Head>
        <Table.Body className="divide-y">
          {appointments.map((appointment) => (
            <Table.Row
              key={appointment.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{appointment.id}</Table.Cell>
              <Table.Cell>{`${appointment.Patient.User.Profile.first_name} ${appointment.Patient.User.Profile.last_name}`}</Table.Cell>
              <Table.Cell>{`${appointment.Doctor.User.Profile.first_name} ${appointment.Doctor.User.Profile.last_name}`}</Table.Cell>
              <Table.Cell>
                {new Date(appointment.appointment_datetime).toLocaleString()}
              </Table.Cell>
              <Table.Cell>{appointment.AppointmentStatus.status}</Table.Cell>
              <Table.Cell>
                {appointment.AppointmentStatus.status !== "cancel" && (
                  <Button
                    color={"gray"}
                    onClick={() => handleShowConfirmModal(appointment)}
                  >
                    Cancel
                  </Button>
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={handleCloseConfirmModal}
        onConfirm={handleCancelAppointment}
        message="Are you sure you want to cancel this appointment?"
      />
    </div>
  );
}

export default Appointments;
