import React, { useState, useEffect } from "react";
import { Table } from "flowbite-react";
import axiosWithAuth from "../middelware/axiosWithAuth";

function Prescription() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axiosWithAuth().get("/api/user/prescription");
        setPrescriptions(response.data);
      } catch (error) {
        console.error("Error fetching prescriptions:", error);
      }
    };

    fetchPrescriptions();
  }, []);

  return (
    <div className="overflow-x-auto">
      <h1 class="text-center text-4xl font-bold"> All Prescription </h1>
      <Table>
        <Table.Head>
          <Table.HeadCell>Prescription ID</Table.HeadCell>
          <Table.HeadCell>Patient Name</Table.HeadCell>
          <Table.HeadCell>Doctor Name</Table.HeadCell>
          <Table.HeadCell>Medication Name</Table.HeadCell>
          <Table.HeadCell>Dosage</Table.HeadCell>
          <Table.HeadCell>Frequency</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>Prescription Date</Table.HeadCell>
          <Table.HeadCell>Notes</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {prescriptions.map((prescription) => (
            <Table.Row
              key={prescription.prescriptionId}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <Table.Cell>{prescription.prescriptionId}</Table.Cell>
              <Table.Cell>{prescription.patientName}</Table.Cell>
              <Table.Cell>{prescription.doctorName}</Table.Cell>
              <Table.Cell>{prescription.medicationName}</Table.Cell>
              <Table.Cell>{prescription.dosage}</Table.Cell>
              <Table.Cell>{prescription.frequency}</Table.Cell>
              <Table.Cell>{prescription.duration}</Table.Cell>
              <Table.Cell>
                {prescription.prescriptionDate
                  ? new Date(prescription.prescriptionDate).toLocaleDateString()
                  : "N/A"}
              </Table.Cell>
              <Table.Cell>{prescription.notes}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}

export default Prescription;
