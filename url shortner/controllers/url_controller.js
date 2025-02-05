const shortId = require("shortid");
const URL = require("../models/url_model");

async function handleGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "Url is missing" });

  const shortid = shortId();
  await URL.create({
    shortId: shortid,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.status(200).json({ id: shortid });
}

async function handleGetUrl(req, res) {



  const shortid = req.params.shortId;

  const entry = await URL.findOneAndUpdate(
    {
      shortid,
    },
    {
      $push: {
        visitHistory: {
          timestaps: Date.now(),
        },
      },
    }
  );

  return res.redirect(entry.redirectURL);
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}   

module.exports = {
  handleGenerateNewShortURL,
  handleGetUrl,
  handleGetAnalytics
};
