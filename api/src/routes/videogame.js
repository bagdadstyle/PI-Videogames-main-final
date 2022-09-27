const { Router } = require("express");
const { getGameParams, gamePost } = require("./funcs");
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

router.put("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { name, description, releaseDate, rating } = req.body;
    await Videogame.update(
      { name, description, releaseDate, rating },
      { where: { id: id } }
    );
    res.send("Actualizado");
  } catch (e) {
    res.status(404).json({ msg: `${e} /catch put` });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    await Videogame.destroy({
      where: { id },
    });
    res.send("Eliminado");
  } catch (e) {
    res.status(400).send({ msg: `${e} /delete` });
  }
});

module.exports = router;