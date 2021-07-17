const {validationResult} = require("express-validator");
const {nanoid} = require("nanoid");

const {getConnection} = require("../database");

const createProvider = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({errors : errors.array()});
    }

    const {name, location, phone_number, provides} = req.body;

    if (!Array.isArray(provides)) {
      return res.status(400).json({message : "Provides must be an array."});
    }

    const providesValid =
        provides.every((element) => typeof element === "string");
    if (!providesValid) {
      return res.status(400).json(
          {message : "Provides must be an array of strings."});
    }

    const provider = getConnection().get("providers").find({name}).value();
    if (provider) {
      return res.status(409).json(
          {message : "Your provider already exist on our database"});
    }

    const newProvider = {
      id : nanoid(),
      name,
      location,
      phone_number,
      provides,
    };

    getConnection().get("providers").push(newProvider).write();

    res.status(201).json({message : "Provider has been created successfully"});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

const getAll = async (req, res) => {
  try {
    const providers = getConnection().get("providers").value();

    res.status(200).json({providers});
  } catch (error) {
    res.status(500).json({error, message : "There was a server error"});
  }
};

exports.createProvider = createProvider;
exports.getAll = getAll;
