const {nanoid} = require("nanoid");
const {validationResult} = require("express-validator");

const {getConnection} = require("../database");

const createChallenge = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors : errors.array()});
    }

    let {title, photo_url, description, points, focus, requirements} = req.body;

    if (!Array.isArray(requirements)) {
      return res.status(400).json({message : "Requirements must be an array"});
    }

    if (requirements.length < 1) {
      return res.status(400).json({message : "Requirements must not be empty"});
    }

    for (let i = 0; i < requirements.length; i++) {
      const element = requirements[i];
      if (typeof element !== "string") {
        return res.status(400).json(
            {message : `Requirements on index ${i} is not a string`});
      }
    }

    if (typeof points !== "number") {
      return res.status(400).json({message : `Points is NaN`});
    }

    const challenge = getConnection().get("challenges").find({title}).value();
    if (challenge) {
      return res.status(409).json(
          {message : "Challenge already exist on our database"});
    }

    const challenge_id = nanoid();

    const newChallenge = {
      challenge_id,
      title,
      photo_url,
      description,
      points,
      focus,
      requirements,
    };
    getConnection().get("challenges").push(newChallenge).write();

    res.status(201).json({message : "Challenge has been created successfully"});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const getAllChallenges = async (req, res) => {
  try {
    const challenges = await getConnection().get("challenges").value();
    res.status(200).json({challenges});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const takeChallenge = async (req, res) => {
  try {
    const {id} = req.body;
    const {challenge_id} = req.params;
    const user_id = id;

    const user = getConnection().get("users").find({user_id}).value();
    if (!user)
      return res.status(400).json(
          {message : "This user does not exist on our database"});

    const challenge =
        getConnection().get("challenges").find({challenge_id}).value();
    if (!challenge)
      return res.status(400).json(
          {message : "This challenge does not exist on our database"});

    const isMyChallenge =
        getConnection().get("detail_challenges").find({challenge_id}).value();
    if (isMyChallenge)
      return res.status(400).send({message : "Challenge already taken"});

    const challengeTaken = {
      detail_id : nanoid(),
      user_id,
      challenge_id : challenge.challenge_id,
      status : "doing",
    };

    getConnection().get("detail_challenges").push(challengeTaken).write();

    res.status(200).json({message : "Good luck!"});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const achieveChallenge = async (req, res) => {
  try {
    const {id} = req.body;
    const {challenge_id} = req.params;
    const user_id = id;

    const user = await getConnection().get("users").find({user_id}).value();
    if (!user)
      return res.status(400).json(
          {message : "This user does not exist on our database"});

    const challenge =
        await getConnection().get("challenges").find({challenge_id}).value();
    if (!challenge)
      return res.status(400).json(
          {message : "This challenge does not exist on our database"});

    const isMyChallenge = await getConnection()
                              .get("detail_challenges")
                              .find({challenge_id})
                              .value();
    if (!isMyChallenge)
      return res.status(400).send({message : "Challenge hasn't been taken"});
    if (isMyChallenge.status !== "doing")
      return res.status(400).send({message : "Challenge is already done"});

    await getConnection()
        .get("detail_challenges")
        .find({challenge_id})
        .assign({status : "done"})
        .write();

    res.status(200).json({message : "Well done!"});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const getAchieved = async (req, res) => {
  try {
    const {id} = req.body;
    const user_id = id;

    const achievedChallenges = [];

    const detailChallenges =
        await getConnection().get("detail_challenges").value();

    for (let i = 0; i < detailChallenges.length; i++) {
      const element = detailChallenges[i];
      if (element.status === "done" && element.user_id === user_id) {
        achievedChallenges.push(element);
      }
    }

    if (achievedChallenges.length === 0)
      return res.status(400).json({message : "No achieved challenges to show"});

    res.status(200).json({achievedChallenges});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const getCurrent = async (req, res) => {
  try {
    const {id} = req.body;
    const user_id = id;

    const currentChallenges = [];

    const detailChallenges =
        await getConnection().get("detail_challenges").value();

    for (let i = 0; i < detailChallenges.length; i++) {
      const element = detailChallenges[i];
      if (element.status === "doing" && element.user_id === user_id) {
        currentChallenges.push(element);
      }
    }

    if (currentChallenges.length === 0)
      return res.status(400).json(
          {message : "No challenges in progress to show"});

    res.status(200).json({currentChallenges});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

exports.createChallenge = createChallenge;
exports.getAllChallenges = getAllChallenges;
exports.takeChallenge = takeChallenge;
exports.achieveChallenge = achieveChallenge;
exports.getAchieved = getAchieved;
exports.getCurrent = getCurrent;
