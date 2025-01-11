const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const fs = require('fs');
const https = require('https');

// Initialize Express
const app = express();

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(cors()); // Handle CORS

// PostgreSQL Pool Setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'form', // Ensure this database exists
  password: '8997', // Replace with your PostgreSQL password
  port: 5432,
});

// Test the connection to PostgreSQL
pool.connect((err, client, release) => {
  if (err) {
    console.error('Error acquiring client', err.stack);
  } else {
    console.log('Database connected');
    release();
  }
});

// Registration Route
app.post('/register', async (req, res) => {
  console.log('Received request:', req.body);

  const { name, dob, gender, classvalue, mobile, email } = req.body;

  try {
    // Check if mobile or email already exists
    const existingUser = await pool.query(
      'SELECT * FROM student WHERE mobile = $1 OR email = $2',
      [mobile, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Mobile number or email already exists. Please use a different one.',
      });
    }

    // Insert new user into the database
    const result = await pool.query(
      'INSERT INTO student (name, dob, gender, classvalue, mobile, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, dob, gender, classvalue, mobile, email]
    );

    // Respond with the newly created user
    res.status(201).json({
      success: true,
      message: 'User registered successfully.',
      user: result.rows[0],
    });
  } catch (error) {
    console.error('Error saving data:', error.stack || error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.',
    });
  }
});

// Read the certificates for HTTPS
const privateKey = fs.readFileSync('localhost-key.pem', 'utf8');
const certificate = fs.readFileSync('localhost.pem', 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Start HTTPS Server
https.createServer(credentials, app).listen(5024, () => {
  console.log('Server running on https://localhost:5024');
});
 