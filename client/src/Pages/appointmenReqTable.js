import React, { useState, useEffect } from "react";
import axiosWithAuth from "../middelware/axiosWithAuth";
import { Button, Table } from "flowbite-react";
import ModalView from "../pagesComponents/modalView";

function AppointmentReqTable() {
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    const fetchAppointmentRequests = async () => {
      try {
        const axiosInstance = axiosWithAuth();
        const response = await axiosInstance.get(
          "/api/appointment/appointmentRequests"
        );
        setAppointmentRequests(response.data);
      } catch (error) {
        console.error("Error fetching appointment requests:", error);
      }
    };

    fetchAppointmentRequests();
  }, []);

  const handleShowModal = (description) => {
    setSelectedAppointment(description);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedAppointment(null);
  };

  return (
    <div className="overflow-x-auto">
      <h1 className="text-center text-4xl font-bold">
        All Appointment Requests
      </h1>
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Name</Table.HeadCell>
          <Table.HeadCell>Last Name</Table.HeadCell>
          <Table.HeadCell>Date of Birth</Table.HeadCell>
          <Table.HeadCell>Email</Table.HeadCell>
          <Table.HeadCell>Phone Number</Table.HeadCell>
          <Table.HeadCell>Preferred Date</Table.HeadCell>
          <Table.HeadCell>Preferred Time</Table.HeadCell>
          <Table.HeadCell>Severity</Table.HeadCell>
          <Table.HeadCell>Status</Table.HeadCell>
          <Table.HeadCell>Description</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {appointmentRequests.map((appointmentRequest) => (
            <Table.Row
              key={appointmentRequest.id}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{appointmentRequest.name}</Table.Cell>
              <Table.Cell>{appointmentRequest.last_name}</Table.Cell>
              <Table.Cell>
                {new Date(
                  appointmentRequest.date_of_birth
                ).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{appointmentRequest.email}</Table.Cell>
              <Table.Cell>{appointmentRequest.phone_number}</Table.Cell>
              <Table.Cell>
                {new Date(appointmentRequest.prefer_date).toLocaleDateString()}
              </Table.Cell>
              <Table.Cell>{appointmentRequest.prefer_time}</Table.Cell>
              <Table.Cell>{appointmentRequest.severity}</Table.Cell>
              <Table.Cell>{appointmentRequest.status}</Table.Cell>
              <Table.Cell>
                <Button
                  color="gray"
                  onClick={() =>
                    handleShowModal(appointmentRequest.description)
                  }
                >
                  View Description
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
      <ModalView
        description={selectedAppointment}
        showModal={showModal}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default AppointmentReqTable;
