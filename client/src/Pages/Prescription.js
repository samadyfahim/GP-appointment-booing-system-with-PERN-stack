"use client";

import { Table } from "flowbite-react";

function Prescription() {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>Medication Name</Table.HeadCell>
          <Table.HeadCell>dosage</Table.HeadCell>
          <Table.HeadCell>frequency</Table.HeadCell>
          <Table.HeadCell>duration</Table.HeadCell>
          <Table.HeadCell>prescription Date</Table.HeadCell>
          <Table.HeadCell>notes</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              {'Apple MacBook Pro 17"'}
            </Table.Cell>
            <Table.Cell>Medication Name</Table.Cell>
            <Table.Cell>dosage</Table.Cell>
            <Table.Cell>frequency</Table.Cell>
            <Table.Cell>duration</Table.Cell>
            <Table.Cell>prescription Date</Table.Cell>
            <Table.Cell>notes</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}

export default Prescription;
