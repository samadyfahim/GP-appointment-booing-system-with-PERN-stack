// ModalView.js
import React from "react";
import { Modal, Button } from "flowbite-react";

const ModalView = ({ description, showModal, onClose }) => {
  return (
    <Modal show={showModal} onClose={onClose}>
      <Modal.Header>Appointment Description</Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onClose}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalView;
