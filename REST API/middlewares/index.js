const fs = require("fs");

function logReqRes(fileName) {
  return app.use((req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${Date.now()} ${req.ip} ${req.method}: ${req.path}`,
      (err, data) => {
        next();
      }
    );
  });
}

module.exports = {
  logReqRes,
};
