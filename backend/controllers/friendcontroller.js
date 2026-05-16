const Friends = require("../models/friends.js"); 

const getFriends = async (req, res) => {
  try {
    const ownerId = req.params.ownerId;

    const friends = await Friends.find({ friend_id: ownerId });

    res.status(200).json({
      success: true,
      data: friends
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



module.exports = { getFriends };
