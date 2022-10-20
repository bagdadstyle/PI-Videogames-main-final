const { Router } = require("express");
const { getGenres } = require("./../utils/utils");

const router = Router();

router.get("/", async (req, res) => {
  try {
    res.send(await getGenres());
  } catch (e) {
    res.status(404).json({ msg: e });
  }
});

module.exports = router;
