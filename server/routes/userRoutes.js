const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

// Define routes
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUserById);
router.delete("/:id", UserController.deleteUserById);

router.get("/users", UserController.getUsers);
router.post("/newUser", UserController.createUser);
router.post("/login", UserController.loginUser);

module.exports = router;
