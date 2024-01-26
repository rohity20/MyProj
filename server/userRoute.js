const router = require('express').Router();
const UserModel = require('./userModel');
const JWT = require('jsonwebtoken');

// Auth Middleware
const requireSignIn = async (req, res, next) => {
  try {
    const decode = JWT.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};


//Protected User Route
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

// All Users
router.get('/api/getAllUser', async (req, res) => {
  try {
    // console.log("get user");
    const user = await UserModel.find();
    // console.log(user);
    res.status(200).json(user)

  } catch (error) {
    console.log(error);
  }
})

// Register
router.post('/api/createUser', async (req, res) => {
  try {
    console.log("createuser");

    const user = new UserModel({

      name: req.body.name,

      email: req.body.email,

      password: req.body.password,

      dob: req.body.dob,

    })
    const User = await user.save();
    console.log(User);
    res.status(200).json(User)

  } catch (error) {
    console.log(error);

  }
})

// Login
router.post('/api/getUser', async (req, res) => {

  try {
    const email = req.body.email;
    const password = req.body.password;
    
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Invalid email or password",
      });
    }
   
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not registerd",
      });
    }
  
    if (password != user.password) {
      return res.status(200).send({
        success: false,
        message: "Invalid Password",
      });
    }
   
    const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(200).send({
      success: true,
      message: "login successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login",
      error,
    });
  }
})

module.exports = router;