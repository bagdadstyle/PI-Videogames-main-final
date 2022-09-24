const { Router } = require("express");
const { getPlatforms } = require("./funcs");

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.send(await getPlatforms());
  } catch (e) {
    res.status(404).send(`Error /Platforms: ${e.message}`);
  }
});

module.exports = router;
