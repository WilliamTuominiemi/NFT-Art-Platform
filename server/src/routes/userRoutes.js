const express = require("express");
const userController = require("../controllers/userController");
const isAuth = require("../middleware/isAuth");

const router = express.Router();

router.get("/", isAuth, userController.getUser);
router.get("/:id", userController.getUserById);

module.exports = router;
