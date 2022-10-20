const { Router } = require("express");
const { getGameParams, gamePost } = require("../utils/utils");
const { Videogame, Genre } = require("../db");

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
      res.status(201).send("Juego creado");
    }
  } catch (e) {
    res.status(404).json({ msg: `${e} /catch post` });
  }
});
module.exports = router;
