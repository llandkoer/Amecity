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

exports.createChallenge = createChallenge;
