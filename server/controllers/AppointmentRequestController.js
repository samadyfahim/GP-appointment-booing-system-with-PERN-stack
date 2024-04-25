const { AppointmentRequest, Patient, AppointmentStatus } = require("../models");

exports.createAppointmentRequest = async (req, res) => {
  console.log(req.user);
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing in headers" });
    }
    const patient = await Patient.findOne({ where: { user_id: userId } });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const receivedStatus = await AppointmentStatus.findOne({
      where: { status: "Recieved" },
    });
    if (!receivedStatus) {
      return res.status(404).json({ error: "Status 'received' not found" });
    }

    const {
      name,
      last_name,
      date_of_birth,
      email,
      phone_number,
      prefer_time,
      prefer_date,
      description,
      severity,
    } = req.body;

    const appointmentRequest = await AppointmentRequest.create({
      name,
      last_name,
      date_of_birth,
      email,
      phone_number,
      prefer_time,
      prefer_date,
      description,
      severity,
      patient_id: patient.id,
      status_id: receivedStatus.id,
    });

    res.status(201).json(appointmentRequest);
  } catch (error) {
    console.error("Error creating appointment request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllAppointmentRequests = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(400).json({ error: "User ID is missing in headers" });
    }
    const patient = await Patient.findOne({ where: { user_id: userId } });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const appointmentRequests = await AppointmentRequest.findAll({
      where: { patient_id: patient.id },
      include: [AppointmentStatus],
    });
    const formattedAppointments = appointmentRequests.map(
      (appointmentRequest) => ({
        id: appointmentRequest.id,
        name: appointmentRequest.name,
        last_name: appointmentRequest.last_name,
        date_of_birth: appointmentRequest.date_of_birth,
        email: appointmentRequest.email,
        phone_number: appointmentRequest.phone_number,
        prefer_date: appointmentRequest.prefer_date,
        prefer_time: appointmentRequest.prefer_time,
        description: appointmentRequest.description,
        severity: appointmentRequest.severity,
        status: appointmentRequest.AppointmentStatus.status,
      })
    );
    res.status(200).json(formattedAppointments);
  } catch (error) {
    console.error("Error fetching appointment requests:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
