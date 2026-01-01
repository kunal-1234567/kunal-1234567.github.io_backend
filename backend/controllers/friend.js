const Friends = require("../models/friends");
const jwtverify = require("../middlewares/authmiddleware.js");

const addfriend = async (req, res) => {
  const { name,  email } = req.body;

  try {
    if (!name || !email) {
      return res.status(400).json({ message: "Enter both name and email" });
    }
    await jwtverify.verifyToken(req, res, () => {});
    const existingFriend = await Friends.find({ "email" : email, "friend_id": req.user.id });
    if (existingFriend.length > 0) {
      return res.status(500).json({ message: "Frined already exists" });
    }
    
    const newUser = new Friends({
    name,
    email,
    friend_id: req.user.id
    });
    await newUser.save();
    res.status(201).json({
      message: "friend added successfully",
      
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {addfriend};