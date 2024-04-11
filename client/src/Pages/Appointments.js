import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import axiosWithAuth from "../middelware/axiosWithAuth";

function Appointments() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const axiosInstance = axiosWithAuth();
        const response = await axiosInstance.get("/api/user/appointments");
        console.log(response);

        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="overflow-x-auto">
      <Table hoverable={true}>
        <Table.Head>
          <Table.HeadCell>Appointment ID</Table.HeadCell>
          <Table.HeadCell>Patient Name</Table.HeadCell>
          <Table.HeadCell>Doctor's Name</Table.HeadCell>
          <Table.HeadCell>Appointment Date</Table.HeadCell>
          <Table.HeadCell>Appointment Status</Table.HeadCell>
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
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Appointments;
