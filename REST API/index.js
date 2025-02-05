const express = require("express");
const { type } = require("os");
const { timeStamp } = require("console");
const userRouter = require("./routes/user");
const app = express();
const PORT = 8000;
const { connectMongoDb } = require("./connections");
const { logReqRes } = require("./middlewares");

/// Connections
connectMongoDb("mongodb://127.0.0.1:27017/testSystem");

/// Middleware

app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use((req, res, next) => {
  console.log("Hello from Middleware 2");
  next();
});

app.use("/api/users", userRouter);

// Routes

app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));
