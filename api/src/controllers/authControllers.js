const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

const { config } = require("../config/config");
const { getConnection } = require("../database");

const createUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { name, email, username, is_admin, password } = req.body;
    const points = 20;

    const user = getConnection().get("users").find({ email, username }).value();
    if (user) {
      return res
        .status(409)
        .json({ message: "Email or username already exist on our database" });
    }

    const user_id = nanoid();

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const photo_url = "https://i.imgur.com/0U1bbu2.jpeg";

    const newUser = {
      user_id,
      name,
      email,
      username,
      points,
      is_admin,
      password,
      photo_url,
    };
    getConnection().get("users").push(newUser).write();

    res.status(201).json({ message: "User has been created successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    const user = getConnection().get("users").find({ username }).value();

    if (!user) {
      return res
        .status(404)
        .json({ token: null, message: "Username does not exist" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ token: null, message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.user_id, admin: user.is_admin },
      config.jwt.secretKey,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

exports.createUser = createUser;
exports.loginUser = loginUser;
