const { getConnection } = require("../database");

const getPoints = async (req, res) => {
    try {
        const {id} = req.body;
        console.log(id)
        const user = getConnection().get("users").find({ user_id: id }).value();
        console.log(user)
        if(!user) return res.status(400).json({ message: "Token no valid" })
        res.status(200).json({points:user.points})
    } catch (error) {
        res.status(500).json({ error, message: "There was a server error" });
    }
}
exports.getPoints = getPoints;