require("dotenv").config();
const { Router } = require("express");
const { API_KEY } = process.env;
const { getGameParams, gamePost, isValidBody } = require("./funcs");

const router = Router();

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    res.json(await getGameParams(id));
  } catch (e) {
    res.status(404).send({ msg: `${e}` });
  }
});
router.post("/", async (req, res) => {
  try {
    if (req.body) {
      await gamePost(req.body);
      res.send("Juego creado");
    }
  } catch (e) {
    res.status(404).json({ msg: `${e} catch post` });
  }
});

module.exports = router;
