const { validationResult } = require("express-validator");
const { nanoid } = require("nanoid");

const { getConnection } = require("../database");

const createPartner = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { name, photo_url, rewards } = req.body;

    if (!Array.isArray(rewards)) {
      return res.status(400).json({ message: "Rewards must exist and be an array" });
    }

    for (let i = 0; i < rewards.length; i++) {
      const element = rewards[i];
      if (typeof element !== "string") {
        return res.status(400).json({ message: `Rewards on index ${i} is not a string` });
      }
    }

    const partner = getConnection().get("partners").find({ name }).value();
    if (partner) {
      return res.status(409).json({ message: "Your partner already exist on our database" });
    }

    const partner_id = nanoid();

    const newPartner = {
      partner_id,
      name,
      photo_url,
      rewards,
    };
    getConnection().get("partners").push(newPartner).write();

    res.status(201).json({ message: "Partner has been created successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const updateRewards = async (req, res) => {
  try {
    const { rewards } = req.body;
    const { partner_id } = req.params;

    if (!Array.isArray(rewards)) {
      return res.status(400).json({ message: "Rewards must exist and be an array" });
    }

    for (let i = 0; i < rewards.length; i++) {
      const element = rewards[i];
      if (typeof element !== "string") {
        return res.status(400).json({ message: `Rewards on index ${i} is not a string` });
      }
    }

    const partner = getConnection().get("partners").find({ partner_id }).value();
    if (!partner) {
      return res.status(409).json({ message: "Your partner does not exist on our database" });
    }

    partner.rewards = rewards;
    getConnection().get("partners").find({ partner_id }).assign(partner).write();

    res.status(200).json({ message: "Partners rewards have been updated successfully" });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};

const getAll = async (req, res) => {
  try {
    const partners = getConnection().get("partners").value();

    res.status(200).json({ partners });
  } catch (error) {
    res.status(500).json({ error, message: "There was a server error" });
  }
};


exports.createPartner = createPartner;
exports.updateRewards = updateRewards;
exports.getAll = getAll;
