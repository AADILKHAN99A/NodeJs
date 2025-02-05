const express = require("express");
const {
  handleGenerateNewShortURL,
  handleGetUrl,
  handleGetAnalytics,
} = require("../controllers/url_controller");

const router = express.Router();
router.post("/", handleGenerateNewShortURL);
router.get("/:shorId", handleGetUrl);
router.get("/analytics/:shortId", handleGetAnalytics);
router.get("/test/help", (req,res) => {

  
  return res.render("home");
});

module.exports = router;
