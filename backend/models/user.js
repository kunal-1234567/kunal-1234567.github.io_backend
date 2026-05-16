const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); 

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  dob:{
    type: Date, required: true
  },
  mobile:{
    type: String, required: true
  }
},{ timestamps: true });





userSchema.pre("save", async function () {
  // This number 10 indicates the salt rounds for hashing
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", userSchema);
