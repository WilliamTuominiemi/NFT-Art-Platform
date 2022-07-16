const express = require('express')
const drawingController = require('../controllers/drawingController')
const isAuth = require('../middleware/isAuth')

const router = express.Router()

router.get('/', drawingController.getAllDrawings)
router.get('/:id', drawingController.getDrawingById)
router.post('/', isAuth, drawingController.createDrawing)

module.exports = router
