const appointmentService = require('../services/appointmentService');
const ReminderService = require("../services/appointmentService");

const {
  Appointment,
  Patient,
  Doctor,
  AppointmentStatus,
  User,
  Profile,
  ContactInformation
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


// Create a new appointment
exports.createAppointment = async (req, res) => {
  const { patient_id, doctor_id, appointment_datetime, status_id } = req.body;
  try {
    const appointment = await Appointment.create({ patient_id, doctor_id, appointment_datetime, status_id });
    res.status(201).json(appointment);
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



// Function to send appointment reminders to patients
exports.sendAppointmentReminders = async () => {
  try {
    // Fetch upcoming appointments
    const upcomingAppointments = await Appointments.findAll({
      where: {
        appointment_datetime: {
          [Sequelize.Op.gte]: new Date(),
        },
      },
      include: [
        {
          model: Patient,
          include: [
            {
              model: User,
              include: ContactInformation,
            },
          ],
        },
      ],
    });
    // Send reminders for each appointment
    upcomingAppointments.forEach((appointment) => {
      const { patient } = appointment;
      const { email, phone } = patient.user.contactInformation;
      const appointmentDateTime = new Date(appointment.appointment_datetime);

      // Schedule reminders for one day and one hour before the appointment
      // Assuming you have functions to format the reminder messages
      const oneDayBefore = new Date(appointmentDateTime);
      oneDayBefore.setDate(oneDayBefore.getDate() - 1);
      scheduleReminder(oneDayBefore, () => {
        ReminderService.sendSMSReminder(phone, formatSMSReminder(appointment));
        ReminderService.sendEmailReminder(
          email,
          "Appointment Reminder",
          formatEmailReminder(appointment)
        );
      });

      const oneHourBefore = new Date(appointmentDateTime);
      oneHourBefore.setHours(oneHourBefore.getHours() - 1);
      scheduleReminder(oneHourBefore, () => {
        ReminderService.sendSMSReminder(
          phone,
          "Your appointment is scheduled in one hour."
        );
        ReminderService.sendEmailReminder(
          email,
          "Appointment Reminder",
          "Dear patient, Your appointment is scheduled in one hour."
        );
      });
    });
  } catch (error) {
    console.error("Error sending appointment reminders:", error);
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
                            include: [Profile]
                        }
                    ]
                },
                {
                    model: Doctor,
                    include: [
                        {
                            model: User,
                            include: [Profile]
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



