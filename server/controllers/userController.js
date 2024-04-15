"use strict";
const bcrypt = require("bcryptjs");
const jwtTokens = require("../utils/jwtToken");
const {
  Appointment,
  Patient,
  Doctor,
  AppointmentStatus,
  User,
  Profile,
  Prescription
} = require("../models");
const { Sequelize } = require("sequelize"); 


// Function to create a new user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await findUserByEmail(email);
    if (userExists) {
      throw new Error("User with this email already exists");
    }
    console.log("read");
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to authenticate and login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authenticateUser(email, password);
    const tokens = generateTokens(user);
    setRefreshTokenCookie(res, tokens.refreshToken);
    res.status(200).json({ ok: true, ...tokens });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to update user password
exports.updatePassword = async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;
    const user = await authenticateUser(email, oldPassword);
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword; // Changed hash_password to password
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to get all users (protected route, requires authentication token)
exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: error.message });
  }
};

// Function to authenticate user by email and password
const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email);
  if (!user) {
    throw new Error("User does not exist");
  }
  const passwordMatch = await comparePassword(password, user.password); // Changed hash_password to password
  if (!passwordMatch) {
    throw new Error("Incorrect password");
  }
  return user;
};

// Function to generate JWT tokens for user
const generateTokens = (user) => {
  const { id, username, email } = user; // Changed userName to username
  return jwtTokens({ userId: id, username, email }); // Changed userName to username
};

// Function to set refresh token cookie
const setRefreshTokenCookie = (res, refreshToken) => {
  res.cookie("refresh_token", refreshToken, { httpOnly: true });
};

// Function to find user by email
const findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

// Function to compare password with hashed password
const comparePassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get user by ID
module.exports.getUserNameAndEmailById = async (req, res) => {
  try {
    const { userId } = req.user;
    const user = await User.findByPk(userId, {
      include: [
        {
          model: Profile,
          attributes: ["first_name", "last_name"],
        },
      ],
      attributes: ["email"],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const userInfo = {
      name: `${user.Profile.first_name} ${user.Profile.last_name}`,
      email: user.email,
    };

    res.json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Create a new user
exports.createUser = async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const user = await User.create({ username, password, email });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Update user by ID
exports.updateUserById = async (req, res) => {
  const { id } = req.params;
  const { username, password, email } = req.body;
  try {
    let user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user = await user.update({ username, password, email });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete user by ID
exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
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
        [Sequelize.Op.or]: [
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




exports.getPrescriptionsByUserId = async (req, res) => {
  try {
    const { userId } = req.user;

    // Find whether the user is a patient or a doctor
    const patient = await Patient.findOne({
      where: { user_id: userId },
      raw: true,
    });
    const doctor = await Doctor.findOne({
      where: { user_id: userId },
      raw: true,
    });

    let condition = {};
    if (patient && doctor) {
      // If the user is both patient and doctor, fetch prescriptions where user is either the patient or the doctor
      condition = {
        [Sequelize.Op.or]: [
          { patient_id: patient.id },
          { doctor_id: doctor.id },
        ],
      };
    } else if (patient) {
      // If the user is only a patient, fetch prescriptions where the user is the patient
      condition = { patient_id: patient.id };
    } else if (doctor) {
      // If the user is only a doctor, fetch prescriptions where the user is the doctor
      condition = { doctor_id: doctor.id };
    } else {
      // If the user is neither a patient nor a doctor, return an empty array of prescriptions
      return res.json([]);
    }

    // Fetch prescriptions based on the determined role
    const prescriptions = await Prescription.findAll({
      where: condition,
      include: [
        {
          model: Patient,
          include: [
            {
              model: User,
              include: [Profile],
            },
          ],
        },
        {
          model: Doctor,
          include: [
            {
              model: User,
              include: [Profile],
            },
          ],
        },
      ],
    });

    const formattedPrescriptions = prescriptions.map((prescription) => ({
      prescriptionId: prescription.id,
      patientName: prescription.Patient?.User?.Profile
        ? `${prescription.Patient.User.Profile.first_name} ${prescription.Patient.User.Profile.last_name}`
        : "Unknown",
      doctorName: prescription.Doctor?.User?.Profile
        ? `${prescription.Doctor.User.Profile.first_name} ${prescription.Doctor.User.Profile.last_name}`
        : "Unknown",
      medicationName: prescription.medication_name,
      dosage: prescription.dosage,
      frequency: prescription.frequency,
      duration: prescription.duration,
      prescriptionDate: prescription.prescription_date,
      notes: prescription.notes,
    }));

    res.json(formattedPrescriptions);
  } catch (error) {
    console.error("Error fetching prescriptions for user:", error);
    res.status(500).send(error.message);
  }
};
