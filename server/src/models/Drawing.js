const mongoose = require('mongoose')

const DrawingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    src: {
      type: String,
      required: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    likers: {
      type: Array,
      default: [],
    },
    inTrade: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Drawing', DrawingSchema)
