const express = require("express");
const User = require("../UserSchema");
const { hashGenarating } = require("../hashed");
const { hashValidator } = require("../hashed");
const { tokengenerating } = require("../Router/Token");
const verify =require("../auth")
const router = express.Router();
const surya = require("../Schema")
router.get("/get", async (req, res) => {
  const user = await User.find();
  res.json(user);
});
router.post("/Signin", async (req, res) => {
  const { email, password } = req.body;
  const hashedpassword = await hashGenarating(password);
  const user = await new User({
    email: email,
    password: hashedpassword,
  });
  await user.save();
  if (user) {
    const token = tokengenerating(user.email);
    res.json({
      email: email,
      token: token,
    });
  }
});
router.post("/Signup", async (req, res) => {
  const { email, password } = req.body;

  const Existinguser = await User.findOne({ email: email });

  if (!Existinguser) {
    return res.json("No user found");
  }

  const checkUser = await hashValidator(password, Existinguser.password);

  if (!checkUser) {
    return res.send("Password mismatched");
  }

  const token = tokengenerating(email);

  return res.json({
    email: email,
    token: token,
  });
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUser = await User.findByIdAndDelete(id);
    if (!deleteUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user" });
  }
});
router.get('/auth',verify,async (req,res)=>{
  const a = await surya.find();
  res.json(a);
})
module.exports = router;
