const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

const { config } = require("../config/config");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { name, email, username, password } = req.body;

    const isAdmin = false;

    // "SELECT" to see if it already exists
    const user;

    if (user.length !== 0) {
      return res.status(409).json({ message: "Username or email already exist on our database" });
    }

    // Create User ID
    const user_id = nanoid();


    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    // "INSERT" in DB if everything is ok


    res.status(201).json({ message: "User has been created successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const loginUser = async (req, res) => {};

exports.createUser = createUser;
exports.loginUser = loginUser;
