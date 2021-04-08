const { Router } = require("express");
const router = Router();

const Manga = require('../models/Manga');

router.get("/", async (req, res) => {
  const mangas = await Manga.find();
  res.json(mangas);
});

router.post("/", async (req, res) => {
  console.log(req.body);
  res.send("received")
})

module.exports = router;