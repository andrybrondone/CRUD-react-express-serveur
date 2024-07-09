const express = require('express')
const router = express.Router()
const models = require("../models")
const { fn, literal } = require('sequelize');
const axios = require('axios');

router.get("/", async (req, res) => {
  const limit = parseInt(req.query.limit) || 10
  const offset = parseInt(req.query.offset) || 0

  const listOfLocation = await models.Location.findAll({
    order: [['id', 'DESC']],
    limit,
    offset
  })

  const count = await models.Location.count()

  res.json({ locations: listOfLocation, totalPage: Math.ceil(count / limit) })
})

router.get("/statistic", async (req, res) => {
  try {
    const results = await models.Location.findAll({
      attributes: [
        [fn('SUM', literal('nb_jours * taux_journalier')), 'total_loyer'],
        [fn('MIN', literal('nb_jours * taux_journalier')), 'min_loyer'],
        [fn('MAX', literal('nb_jours * taux_journalier')), 'max_loyer']
      ],
      raw: true // Pour retourner les résultats comme un objet brut
    });

    const statistics = results[0];

    res.json({ min: statistics.min_loyer, max: statistics.max_loyer, total: statistics.total_loyer });
  } catch (error) {
    console.error('Erreur lors du calcul des statistiques:', error);
    res.status(500).json({ error: 'Erreur lors du calcul des statistiques' });
  }
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id
  const location = await models.Location.findByPk(id)
  res.json(location)
})

router.post("/", async (req, res) => {
  const { recaptchaToken, ...post } = req.body;

  // Vérifiez le token reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRETE_KEY;
  const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret: secretKey,
      response: recaptchaToken,
    },
  });

  if (!recaptchaResponse.data.success) {
    return res.json({ error: "error", message: 'Échec de la vérification reCAPTCHA' });
  } else {
    await models.Location.create(post);
    res.json(post);
  }
});

router.put("/:id", async (req, res) => {
  const locationId = req.params.id;
  const { recaptchaToken, ...post } = req.body;

  // Vérifiez le token reCAPTCHA
  const secretKey = process.env.RECAPTCHA_SECRETE_KEY;
  const recaptchaResponse = await axios.post(`https://www.google.com/recaptcha/api/siteverify`, null, {
    params: {
      secret: secretKey,
      response: recaptchaToken,
    },
  });

  if (!recaptchaResponse.data.success) {
    return res.json({ error: true, message: 'Échec de la vérification reCAPTCHA' });
  } else {
    await models.Location.update(post, { where: { id: locationId } });
    res.json(post);
  }
});

router.delete("/:id", async (req, res) => {
  const locationId = req.params.id
  await models.Location.destroy({
    where: {
      id: locationId
    }
  })
  res.json("Delete ok")
})

module.exports = router