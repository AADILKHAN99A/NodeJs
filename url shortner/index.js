const express = require("express");
const router = require("./routes/url_routes");
const userRoute = require('./routes/user_routes');
const { connectToDb } = require("./connect");
const path = require('path');
const app = express();
const PORT = 8000;

connectToDb("mongodb://localhost:27017/short-url").then(() => {
  console.log("mongodb connected");
});
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
app.use(express.json());
app.use("/api", router);
app.use('/user',userRoute);
app.listen(PORT, () => console.log(`Server Started at PORT ${PORT}`));
