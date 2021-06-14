const { getConnection } = require("../database");

const getPoints = async (req, res) => {
  try {
    const { id } = req.body;
    const user = getConnection().get("users").find({ user_id: id }).value();
    if (!user) return res.status(400).json({ message: "Token no valid" });
    res.status(200).json({ points: user.points });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const redimePoints = async (req, res) => {
  try {
    const { id } = req.body;
    const user = getConnection().get("users").find({ user_id: id }).value();
    if (!req.headers.points || req.headers.points <= 0)
      return res.status(400).json({ message: "Imcomplete Data" });
    const updatePoints = parseInt(user.points) - parseInt(req.headers.points);
    if (updatePoints < 0)
      return res
        .status(400)
        .json({ message: "Insufficient points", points: user.points });
    getConnection()
      .get("users")
      .find({ user_id: id })
      .assign({ points: updatePoints })
      .write();
    if (!user) return res.status(400).json({ message: "Token no valid" });
    return res
      .status(200)
      .json({ message: "Points has update", points: updatePoints });
  } catch (error) {
    return res.status(500).json({ error, message: "There was a server error" });
  }
};

exports.getPoints = getPoints;
exports.redimePoints = redimePoints;
