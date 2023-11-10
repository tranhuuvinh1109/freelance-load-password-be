const RootRoute = require("./RootRoute");
const AuthRoute = require("./AuthRoute");
const DataRoute = require("./DataRoute");
const FirebaseRoute = require("./FirebaseRoute");

function routes(app) {
  app.use("/", RootRoute);
  app.use("/auth", AuthRoute);
  app.use("/data", DataRoute);
  app.use("/realtime", FirebaseRoute);
}

module.exports = routes;
