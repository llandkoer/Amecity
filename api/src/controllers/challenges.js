const {getConnection} = require("../database");

const getAllChallenges = async (req, res) => {
  try {
    const challenges = await getConnection().get("challenges");
    res.status(200).json({challenges : challenges});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const takeChallenge =
    async (req, res) => {
  console.log(req.user)
  try {
    const {user_id, challenge_id} = req.body;

    const user = getConnection().get("users").find({user_id : user_id}).value();
    if (!user)
      return res.status(400).json({message : "Token no valid"});

    const challenge = getConnection()
                          .get("challenges")
                          .find({challenge_id : challenge_id})
                          .value();
    if (!challenge)
      return res.status(400).json({message : "Challenge no valid"});

    const isMyChallenge = getConnection()
                              .get("detailChallenges")
                              .find({challenge_id : challenge_id})
                              .value();
    if (isMyChallenge)
      return res.status(400).send({message : "Challenge already taken"});

    const takeChallenge = {
      user_id : user.user_id,
      challenge_id : challenge.challenge_id,
      status : "doing"
    };

    getConnection().get("detailChallenges").push(takeChallenge).write();

    res.status(200).json({message : "Good luck!"})
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
}

                        exports.getAllChallenges = getAllChallenges;
exports.takeChallenge = takeChallenge;