const appointmentService = require('../services/appointmentService');
const {
  Appointment,
  Patient,
  Doctor,
  AppointmentStatus,
  User,
  Profile,
} = require("../models");


// Get all appointments
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get appointment by ID
exports.getAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_datetime, status_id, provider_id } = req.body;
  try {
    const appointment = await Appointment.create({ patient_id, doctor_id, appointment_datetime, status_id, provider_id });
    res.status(201).json(appointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.updateAppointmentStatus = async (req, res) => {
  const { patient_id } = req.params;
  const { status_name } = req.body; // Assuming status_name is provided in the request body
  try {
    const result = await updateAppointmentStatusForPatient(patient_id, status_name);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to update appointment statuses' });
  }
};

// Delete appointment by ID
exports.deleteAppointmentById = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByPk(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    await appointment.destroy();
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


// Get appointments for a specific user
exports.getUserAppointments = async (req, res) => {
  const { userId } = req.params; // Assuming userId is passed as a parameter
  try {
    const appointments = await Appointment.findAll({
      where: { userId }, // Query appointments where userId matches
    });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};


exports.getAppointmentsWithDetails = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
            include: [
                {
                    model: Patient,
                    include: [
                        {
                            model: User,
                            include: [Profile] // Assuming each user has one profile
                        }
                    ]
                },
                {
                    model: Doctor,
                    include: [
                        {
                            model: User,
                            include: [Profile] // Doctor's user and profile
                        }
                    ]
                },
                {
                    model: AppointmentStatus
                }
            ]
        });

        return res.json(appointments);
    } catch (error) {
        console.error('Error fetching appointments:', error);
        return res.status(500).send(error.message);
    }
};




exports.getAppointmentsWithDetailsByUserId = async (req, res) => {
  try {
    const { userId } = req.user;

    const patient = await Patient.findOne({
      where: { user_id: userId },
      raw: true,
    });
    const doctor = await Doctor.findOne({
      where: { user_id: userId },
      raw: true,
    });

    if (!patient && !doctor) {
      return res.status(404).send("User does not have appointments.");
    }

    // Build the condition based on available profiles
    let condition = {};
    if (patient && doctor) {
      condition = {
        [sequelize.Op.or]: [
          { patient_id: patient.id },
          { doctor_id: doctor.id },
        ],
      };
    } else if (patient) {
      condition = { patient_id: patient.id };
    } else if (doctor) {
      condition = { doctor_id: doctor.id };
    }

    // Fetch appointments based on the built condition
    const appointments = await Appointment.findAll({
      where: condition,
      include: [
        {
          model: Patient,
          include: [{ model: User, include: [Profile] }],
        },
        {
          model: Doctor,
          include: [{ model: User, include: [Profile] }],
        },
        { model: AppointmentStatus },
      ],
    });

    return res.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments for user:", error);
    return res.status(500).send(error.message);
  }
};



