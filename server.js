const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const db = require('./db');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Serve frontend (optional for single deploy)
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Members routes
app.get('/members',(req,res)=>db.all("SELECT * FROM members",(err,rows)=>res.json(rows)));
app.post('/members',(req,res)=>{
  const { name, rank, email, certification, certification_expiry } = req.body;
  const id = uuidv4();
  db.run(`INSERT INTO members (id,name,rank,email,certification,certification_expiry) VALUES (?,?,?,?,?,?)`,
    [id,name,rank,email,certification,certification_expiry],
    err => err ? res.status(500).json({error:err.message}) : res.json({id,name,rank,email,certification,certification_expiry})
  );
});

// Trainings routes
app.get('/trainings',(req,res)=>db.all("SELECT * FROM trainings",(err,rows)=>res.json(rows)));
app.post('/trainings',(req,res)=>{
  const { title, category, hours, date, instructor } = req.body;
  const id = uuidv4();
  db.run(`INSERT INTO trainings (id,title,category,hours,date,instructor) VALUES (?,?,?,?,?,?)`,
    [id,title,category,hours,date,instructor],
    err => err ? res.status(500).json({error:err.message}) : res.json({id,title,category,hours,date,instructor})
  );
});

// Attendance routes
app.get('/attendance',(req,res)=>db.all("SELECT * FROM attendance",(err,rows)=>res.json(rows)));
app.post('/attendance',(req,res)=>{
  const { member_id, training_id, status } = req.body;
  const id = uuidv4();
  db.run(`INSERT INTO attendance (id,member_id,training_id,status) VALUES (?,?,?,?)`,
    [id,member_id,training_id,status],
    err => err ? res.status(500).json({error:err.message}) : res.json({id,member_id,training_id,status})
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>console.log(`Backend running on port ${PORT}`));
