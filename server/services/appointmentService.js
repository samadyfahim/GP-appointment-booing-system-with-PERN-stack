const {
  Appointment,
  Doctor,
  User,
  Profile,
  AppointmentStatus,
} = require("../models");

// Function to extract appointment details
const extractAppointmentDetails = (appointment) => {
  const patientName =
    appointment.Patient.User.Profile.first_name +
    " " +
    appointment.Patient.User.Profile.last_name;
  const doctorName =
    appointment.Doctor.User.Profile.first_name +
    " " +
    appointment.Doctor.User.Profile.last_name; // Get doctor's name
  const appointmentStatus = appointment.AppointmentStatus
    ? appointment.AppointmentStatus.status
    : null; // Extract appointment status
  return {
    id: appointment.id,
    appointment_datetime: appointment.appointment_datetime,
    patient_name: patientName,
    doctor_name: doctorName,
    appointment_status: appointmentStatus,
  };
};

// Get appointments for a patient with a specific status
// i have saperate function in case add want to extract more details. but not nececerly
exports.getAppointmentForPatientsWithStatus = async (patientId, statusName) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        patient_id: patientId,
        "$AppointmentStatus.status$": statusName,
      },
      include: [
        {
          model: User,
          include: [{ model: Profile }],
        },
        {
          model: Doctor,
          include: [{ model: User, include: [{ model: Profile }] }],
        },
        { model: AppointmentStatus },
      ],
    });

    // Map appointments to extract appointment details
    const appointmentsWithDetails = appointments.map(extractAppointmentDetails);

    return appointmentsWithDetails;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching appointments");
  }
};

// Get appointments for a patient with doctor's name and appointment status
exports.getAppointments = async (patientId) => {
  try {
    const appointments = await Appointment.findAll({
      where: { patient_id: patientId },
      include: [
        {
          model: Doctor,
          include: [{ model: User, include: [{ model: Profile }] }],
        },
        { model: AppointmentStatus },
      ],
    });
    const appointmentsWithDetails = appointments.map(extractAppointmentDetails);
    res.json(appointmentsWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.getAppointmentsForDoctorWithStatus = async (doctorId, statusName) => {
  try {
    const appointments = await Appointment.findAll({
      where: {
        doctor_id: doctorId,
        "$AppointmentStatus.status$": statusName, // Filter by appointment status name
      },
      include: [
        {
          model: Doctor,
          include: [{ model: User, include: [{ model: Profile }] }],
        },
        {
          model: Patient,
          include: [{ model: User, include: [{ model: Profile }] }],
        },
        { model: AppointmentStatus },
      ],
    });

    // Map appointments to extract appointment details
    const appointmentsWithDetails = appointments.map(extractAppointmentDetails);

    return appointmentsWithDetails;
  } catch (error) {
    console.error(error);
    throw new Error("Error fetching appointments");
  }
};

exports.updateAppointmentStatusForPatient = async (patient_id, status_name) => {
  try {
    // Find the status ID based on the provided status name
    const status = await AppointmentStatus.findOne({ where: { status_name } });
    if (!status) {
      throw new Error("Status not found");
    }

    // Find all appointments for the specified patient
    const appointments = await Appointment.findAll({ where: { patient_id } });

    // Update the status of each appointment
    await Promise.all(
      appointments.map(async (appointment) => {
        appointment.status_id = status.id;
        await appointment.save();
      })
    );

    return { message: "Appointment statuses updated successfully" };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update appointment statuses");
  }
};
