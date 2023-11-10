const User = require("../models/User");
const Data = require("../models/Data");

class DataController {
  // [POST] /data/update
  async update(req, res) {
    try {
      const { user_id, name, account, password } = req.body;

      const userExists = await User.exists({ _id: user_id });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      const newData = new Data({ user_id, name, account, password });
      await newData.save();

      res
        .status(201)
        .json({ message: "Data created successfully", data: newData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  //[GET] /data/all/:id
  async getAllByUserID(req, res) {
    try {
      const { id } = req.params;

      const userExists = await User.exists({ _id: id });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      const allData = await Data.find({ user_id: id });

      res.status(200).json({ data: allData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new DataController();
