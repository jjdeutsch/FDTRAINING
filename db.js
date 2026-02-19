const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('fire_training.db');

// Members table
db.run(`
CREATE TABLE IF NOT EXISTS members (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  rank TEXT,
  email TEXT,
  certification TEXT,
  certification_expiry TEXT
)`);

// Trainings table
db.run(`
CREATE TABLE IF NOT EXISTS trainings (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT,
  hours INTEGER,
  date TEXT,
  instructor TEXT
)`);

// Attendance table
db.run(`
CREATE TABLE IF NOT EXISTS attendance (
  id TEXT PRIMARY KEY,
  member_id TEXT,
  training_id TEXT,
  status TEXT
)`);

module.exports = db;
