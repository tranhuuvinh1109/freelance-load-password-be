const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthController {
  // [POST] /auth/login
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.SECRET_KEY,
        { expiresIn: "72h" }
      );

      res.status(200).json({
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            gender: user.gender,
            address: user.address,
            phone: user.phone,
            type: user.type,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
          token,
          message: "Sign In successfully!",
        },
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // [POST] /auth/register
  async register(req, res) {
    try {
      console.log("register", req.body);
      const { username, email, password } = req.body;
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      const result = {
        _id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        avatar: newUser.avatar,
        gender: newUser.gender,
        address: newUser.address,
        phone: newUser.phone,
        type: newUser.type,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      };
      res.status(201).json({ data: result, message: "Success" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // [GET] /auth/me
  async me(req, res) {
    const token = req.header("Authorization");

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

      const user = await User.findById(decodedToken.userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            gender: user.gender,
            address: user.address,
            phone: user.phone,
            type: user.type,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
      });
    } catch (error) {
      res.status(403).json({ message: "Forbidden", error });
    }
  }
  // [GET] /auth/user/:id
  async getUserById(req, res) {
    console.log(11, req.body);
    const userId = req.params.id;

    try {
      const user = await User.findById(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({
        data: {
          user: {
            _id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            gender: user.gender,
            address: user.address,
            phone: user.phone,
            type: user.type,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
          },
        },
        massage: "Done",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new AuthController();
