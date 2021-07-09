const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const { getConnection } = require("../database");

const getPoints = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = id;
    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) return res.status(400).json({ message: "This user doest not exist on our database" });
    res.status(200).json({ points: user.points });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const redimePoints = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { id, points } = req.body;
    const user_id = id;
    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) return res.status(400).json({ message: "This user doest not exist on our database" });
    if (!points || points <= 0) return res.status(400).json({ message: "Points is necessary" });
    const updatePoints = parseInt(user.points) - parseInt(points);
    if (updatePoints < 0) {
      return res.status(400).json({ message: "Insufficient points", points: user.points });
    }
    getConnection().get("users").find({ user_id }).assign({ points: updatePoints }).write();
    return res.status(200).json({ message: "Points has update", points: updatePoints });
  } catch (error) {
    return res.status(500).json({ error, message: "There was a server error" });
  }
};

const givePoints = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { points, id } = req.body;
    const user_id = id;

    if (typeof points !== "number") {
      return res.status(400).json({ message: `Points is NaN` });
    }

    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) {
      return res.status(409).json({ message: "This user does not exist on our database" });
    }

    user.points += points;

    getConnection().get("users").find({ user_id }).assign(user).write();

    res.status(200).json({ message: "Points have been updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const getInfo = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();

    const { name, email, username } = user;

    const info = {
      name,
      email,
      username,
    };

    res.status(200).json({ info });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const getPhoto = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();

    const { photo_url } = user;

    const photo = {
      photo_url,
    };

    res.status(200).json({ photo });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const updateUsername = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { username, id } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) {
      return res.status(409).json({ message: "This user does not exist on our database" });
    }

    user.username = username;

    getConnection().get("users").find({ user_id }).assign(user).write();

    res.status(200).json({ message: "Username has been updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const updateName = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, id } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) {
      return res.status(409).json({ message: "This user does not exist on our database" });
    }

    user.name = name;

    getConnection().get("users").find({ user_id }).assign(user).write();

    res.status(200).json({ message: "Name has been updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const updateEmail = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, id } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) {
      return res.status(409).json({ message: "This user does not exist on our database" });
    }

    user.email = email;

    getConnection().get("users").find({ user_id }).assign(user).write();

    res.status(200).json({ message: "Email has been updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id, password } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) {
      return res.status(409).json({ message: "This user does not exist on our database" });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Wrong password" });
    }

    getConnection().get("users").remove({ user_id }).write();

    res.status(200).json({ message: "Your account has been successfully deleted" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const updatePassword = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let { id, new_password, old_password } = req.body;
    const user_id = id;

    const user = getConnection().get("users").find({ user_id }).value();
    if (!user) {
      return res.status(409).json({ message: "This user does not exist on our database" });
    }

    const passwordIsValid = await bcrypt.compare(old_password, user.password);
    if (!passwordIsValid) {
      return res.status(401).json({ message: "Wrong old password" });
    }

    const salt = await bcrypt.genSalt(10);
    new_password = await bcrypt.hash(new_password, salt);

    user.password = new_password;

    getConnection().get("users").find({ user_id }).assign(user).write();

    res.status(200).json({ message: "Password has been updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

exports.getPoints = getPoints;
exports.redimePoints = redimePoints;
exports.givePoints = givePoints;
exports.getInfo = getInfo;
exports.getPhoto = getPhoto;
exports.updateUsername = updateUsername;
exports.updateName = updateName;
exports.updateEmail = updateEmail;
exports.deleteAccount = deleteAccount;
exports.updatePassword = updatePassword;
