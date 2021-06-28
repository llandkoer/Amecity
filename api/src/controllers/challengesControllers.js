const { nanoid } = require("nanoid");

const { getConnection } = require("../database");

const { validationResult } = require("express-validator");

const createChallenge = async (req, res) => {
    try { 
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    
        let { title, img, description, points, focus, requeriments} = req.body;
        const challenge = getConnection().get("challenges").find({ title }).value();
        if (challenge) {
            return res
            .status(409)
            .json({ message: "Challenge already exist on our database"});
        }

        const challenge_id = nanoid();
        
        const newChallenge = {
            challenge_id,
            title,
            img,
            description,
            points,
            focus,
            requeriments,
        }
        getConnection().get("challenges").push(newChallenge).write();

        res.status(201).json({ message: "Challenge has been created successfully" });

    } catch (error) {
        res.status(500).json({ error, message: "There was a server error" });
    }
}

exports.createChallenge = createChallenge;