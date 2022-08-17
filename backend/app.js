const express = require('express');
const app = express(); // start express app
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config();

const sauceRoutes = require('./routes/sauce');
const userRoutes = require('./routes/user');

// connection à la base de données mongoDB
mongoose
  .connect(
    `mongodb+srv://${process.env.SECRET_DB_NAME}:${process.env.SECRET_DB_PASSWORD}@${process.env.SECRET_DB_HOST}/?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

// configuration headers pour empêcher erreurs CORS (accès à l'API)
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json()); // nous donnes accès au corps de la requête

app.use(helmet()); // helmet middleware pour sécurisé les headers

// définition de nos routes
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
