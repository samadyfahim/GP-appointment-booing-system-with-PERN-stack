const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const appointmentController = require("../controllers/AppointmentController");


const { authenticateToken } = require("../middleware/authenticateToken");

// Define routes
router.get("/", UserController.getAllUsers);
router.get(
  "/user/nameAndEmail",
  authenticateToken,
  UserController.getUserNameAndEmailById
);
router.get(
  "/user/appointments",
  authenticateToken,
  UserController.getAppointmentsWithDetailsByUserId
);

router.get(
  "/user/prescription",
  authenticateToken,
  UserController.getPrescriptionsByUserId
);

router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

router.get("/users", UserController.getUsers);
router.post("/newUser", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;
