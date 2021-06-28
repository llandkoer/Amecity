const { validationResult } = require("express-validator");

const { getConnection } = require("../database");

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

exports.givePoints = givePoints;
