const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
  {
    displayName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    googleId: {
      type: String,
      required: true,
    },
    drawings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Drawing',
        required: true,
        default: [],
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', UserSchema)
