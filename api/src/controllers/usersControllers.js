const { getConnection } = require("../database");
const { validationResult } = require("express-validator");

const getPoints = async (req, res) => {
  try {
    const { id } = req.body;
    const user_id = id;
    const user = getConnection().get("users").find({ user_id }).value();
    if (!user)
      return res
        .status(400)
        .json({ message: "This user doest not exist on our database" });
    res.status(200).json({ points: user.points });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const redimePoints = async (req, res) => {
  try {
    const { user_id } = req.body;
    const user = getConnection()
      .get("users")
      .find({ user_id: user_id })
      .value();
    if (!user) return res.status(400).json({ message: "Token no valid" });
    if (!req.body.points || req.body.points <= 0)
      return res.status(400).json({ message: "Imcomplete Data" });
    const updatePoints = parseInt(user.points) - parseInt(req.body.points);
    if (updatePoints < 0) {
      return res
        .status(400)
        .json({ message: "Insufficient points", points: user.points });
    }
    getConnection()
      .get("users")
      .find({ user_id: user_id })
      .assign({ points: updatePoints })
      .write();
    return res
      .status(200)
      .json({ message: "Points has update", points: updatePoints });
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
      return res
        .status(409)
        .json({ message: "This user does not exist on our database" });
    }

    user.points += points;

    getConnection().get("users").find({ user_id }).assign(user).write();

    res.status(200).json({ message: "Points have been updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

exports.getPoints = getPoints;
exports.redimePoints = redimePoints;
exports.givePoints = givePoints;
