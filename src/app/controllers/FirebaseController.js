const User = require("../models/User");
const Data = require("../models/Data");
const axios = require("axios");

class FirebaseController {
  // [POST] /realtime/update
  async update(req, res) {
    try {
      const { user_id, data } = req.body;
      const updateObject = {};
      data.forEach((element, index) => {
        updateObject[index] = element;
      });
      axios
        .post("https://server-deploy-xr7n.onrender.com/api/realtime/", {
          user_id,
          data: updateObject,
        })
        .then((response) => {
          console.log("Response:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });

      res.status(201).json({ message: "Data created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new FirebaseController();
