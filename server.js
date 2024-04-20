const express = require('express');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const path = require('path');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const secretKey = 'secret_key_here'; // Cambia esto por tu clave secreta

function generateToken(email) {
  return jwt.sign({ email }, secretKey, { expiresIn: '1h' });
}

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (email === 'mirandaruiz499@gmail.com' && password === 'hola') { // Cambia esto por tus credenciales
    const token = generateToken(email);
    
    // Set the cookie containing the token
    res.cookie('token', token, { httpOnly: true });
    
    // Redirect the user to the dashboard
    res.redirect('/dashboard');
  } else {
    res.status(401).send('Invalid email or password. Please try again.');
  }
});

app.get('/dashboard', (req, res) => {
  // Check if the 'token' cookie is present
  if (req.cookies.token) {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
  } else {
    // Show a message to the user if no cookie is present
    res.send('Token not found. Please login first.');
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
