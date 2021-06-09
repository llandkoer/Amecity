// const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

// const { config } = require("../config/config");

const { getConnection } = require("../database");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { name, email, username, is_admin, password } = req.body;

    const user = getConnection().get("users").find({ email, username }).value();
    if (user) {
      return res
        .status(409)
        .json({ message: "Email or username already exist on our database" });
    }

    const user_id = nanoid();

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const newUser = {
      user_id,
      name,
      email,
      username,
      is_admin,
      password,
    };
    getConnection().get("users").push(newUser).write();

    res.status(201).json({ message: "User has been created successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

// const loginUser = async (req, res) => {};

exports.createUser = createUser;
// exports.loginUser = loginUser;
