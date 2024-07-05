const express = require('express')
const router = express.Router()
const models = require("../models")

router.get("/", async (req, res) => {
  const listOfLocation = await models.Location.findAll({ order: [['id', 'DESC']] })
  res.json(listOfLocation)
})

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id
  const location = await models.Location.findByPk(id)
  res.json(location)
})

router.post("/", async (req, res) => {
  const post = req.body
  await models.Location.create(post)
  res.json(post)
})

router.put("/:id", async (req, res) => {
  const locationId = req.params.id
  const post = req.body
  await models.Location.update(post, { where: { id: locationId } })
  res.json(post)
})

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