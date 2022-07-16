const Drawing = require('../models/Drawing')

const getAllDrawings = async (_req, res) => {
  const drawings = await Drawing.find()
    .sort({ createdAt: -1 })
    .populate('artist')
    .populate('owner')
  return res.json(drawings)
}

const getDrawingById = async (req, res) => {
  const drawing = await Drawing.findById(req.params.id)
    .populate('artist')
    .populate('owner')
  return res.json(drawing)
}

const createDrawing = async (req, res) => {
  const userId = req.user._id
  const { src } = req.body

  if (!src) return res.status(400).json({ error: 'Missing required fields' })

  const drawing = await Drawing.create({
    artist: userId,
    owner: userId,
    src,
  })

  return res.json(drawing)
}

module.exports = {
  getAllDrawings,
  getDrawingById,
  createDrawing,
}
