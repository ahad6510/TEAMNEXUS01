const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  description: String,
  hectares: Number,
  co2Sequestered: { type: Number, default: 0 },
  images: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Project', ProjectSchema);
