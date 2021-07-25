const mongoose = require("mongoose");

const world = new mongoose.Schema({
  googleid:{
    type: String,
    required: true,
  },
  worldname: {
    type: String,
    required: true,
  },
  coords: {
    type: [
      {
        coordname: String,
        coord: {
          x: {
            type: Number,
            required: true,
          },
          y: {
            type: Number,
            required: true,
          },
        },
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("world", world);
