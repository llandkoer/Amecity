const {getConnection} = require("../database");

const getPoints = async (req, res) => {
  try {
    const {user_id} = req.body;
    const user = getConnection().get("users").find({user_id : user_id}).value();
    if (!user)
      return res.status(400).json(
          {message : "This user doest not exist on our database"});
    res.status(200).json({points : user.points});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const redimePoints = async (req, res) => {
  try {
    const {user_id} = req.body;
    const user = getConnection().get("users").find({user_id : user_id}).value();
    if (!user)
      return res.status(400).json({message : "Token no valid"});
    if (!req.body.points || req.body.points <= 0)
      return res.status(400).json({message : "Imcomplete Data"});
    const updatePoints = parseInt(user.points) - parseInt(req.body.points);
    if (updatePoints < 0) {
      return res.status(400).json(
          {message : "Insufficient points", points : user.points});
    }
    getConnection()
        .get("users")
        .find({user_id : user_id})
        .assign({points : updatePoints})
        .write();
    return res.status(200).json(
        {message : "Points has update", points : updatePoints});
  } catch (error) {
    return res.status(500).json({error, message : "There was a server error"});
  }
};

exports.getPoints = getPoints;
exports.redimePoints = redimePoints;
