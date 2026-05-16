const Friends = require("../models/friends.js");
const jwtverify = require("../middlewares/authmiddleware.js");

const addfriend = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Enter both name and email" });
    }

   

    const existingFriend = await Friends.findOne({
      email: email,
      friend_id: req.user.id
    });

    if (existingFriend) {
      return res.status(400).json({ message: "Friend already exists" });
    }

    await Friends.create({
      name,
      email,
      friend_id: req.user.id
    });

    return res.status(201).json({
      message: "friend added successfully"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addfriend };