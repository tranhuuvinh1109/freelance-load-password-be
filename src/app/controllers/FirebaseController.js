const User = require("../models/User");
const Data = require("../models/Data");
const admin = require("firebase-admin");
// const firebase = require('firebase');
const serviceAccount = require("../../sevice.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL:
    "https://realtime-cnn-default-rtdb.asia-southeast1.firebasedatabase.app",
});
const database = admin.database();

class FirebaseController {
  // [POST] /realtime/update
  async update(req, res) {
    try {
      const { user_id, data } = req.body;
      database.ref(`password/user_${user_id}`).update(data);

      res.status(201).json({ message: "Data created successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = new FirebaseController();
