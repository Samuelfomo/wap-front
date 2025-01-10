const express = require('express');
const path = require('path');
const cors = require('cors');
const Login = require('./src-services/routes/login')

const app = express();
const port = process.env.PORT || 3002;
const host = process.env.HOST || 'http://localhost';

// app.use(cors());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

app.use('/login', Login);

app.use(express.static(path.join(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running at ${host}:${port}`);
});
