const { Router } = require('express');
const router = Router();
const { check, body, validationResult } = require('express-validator');

const Manga = require('../models/Manga');

const verifyToken = require('../controllers/verifyToken');

// *******************   CRUD (GET)   ******************* \\

router.get('/', verifyToken, async (req, res) => {
  const mangas = await Manga.find({}, { date: 0 });
  console.log(req.get('X-AccESS-ToKeN'));
  console.log(mangas);
  res.json(mangas);
});

router.get(
  '/:id',
  [
    check('id').isMongoId(),
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
      }
      next();
    },
  ],
  async (req, res) => {
    console.log(123);

    const mangas = await Manga.findById(req.get('id'));
    res.json(mangas);
  }
);

// *******************   CRUD (GET)   ******************* \\

// *******************   CRUD (POST)   ******************* \\

router.post(
  '/',
  verifyToken,
  body('title', 'Title is required').notEmpty(),
  async (req, res) => {
    const { title, author } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newManga = new Manga({ title, author });
    await newManga.save();
    res.json('Manga Uploaded successfully');
    res.send(console.log('Manga Uploaded successfully', 201, newManga));
  }
);

// // *******************   CRUD (POST)   ******************* \\

// // *******************   CRUD (PUT)   ******************* \\

router.put(
  '/:id',
  verifyToken,
  body('title', 'Title is required').notEmpty(),
  async (req, res) => {
    const { title, author } = req.body;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const manga = await Manga.findByIdAndUpdate(
      req.params.id,
      { title, author },
      { date: 0 }
    ); //Sigue mostrando la fecha y debo correggir
    res.json('Manga modified successfully');
    console.log(
      'Manga modified successfully \n \n' + 'Status Code',
      200,
      ' \n\n ',
      manga,
      '\n \n was replaced for \n \n',
      req.body
    );
  }
);

// // *******************  CRUD (PUT)  ******************* \\

// // *******************  CRUD (DELETE)  ******************* \\

router.delete('/:id', verifyToken, async (req, res) => {
  await Manga.findByIdAndDelete(req.params.id);
  res.json('Manga deleted succesfully');
  s;
  res.send(console.log('Manga deleted succesfully \n \n', 204));
});

// *******************  CRUD (DELETE)  ******************* \\

module.exports = router;
