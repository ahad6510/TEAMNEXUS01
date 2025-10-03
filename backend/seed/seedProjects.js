require('dotenv').config();
const connect = require('../config/db');
const Project = require('../models/Project');

async function seed() {
  await connect(process.env.MONGO_URI || 'mongodb://localhost:27017/bluecarbon');
  await Project.deleteMany({});
  const data = [
    { name: "Sundarbans Restoration", location: "West Bengal, India", description: "Reforesting 5,000 hectares.", hectares: 5000, co2Sequestered: 350000 },
    { name: "Andaman Seagrass Project", location: "Andaman & Nicobar", description: "Seagrass restoration.", hectares: 1200, co2Sequestered: 72000 },
    { name: "Vembanad Salt Marsh", location: "Kerala", description: "Conserving salt marsh ecosystems.", hectares: 400, co2Sequestered: 20000 }
  ];
  await Project.insertMany(data);
  console.log('Seeded projects.');
  process.exit(0);
}
seed().catch(console.error);
