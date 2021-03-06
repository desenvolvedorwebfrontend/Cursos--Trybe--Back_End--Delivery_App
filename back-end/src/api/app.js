const express = require('express');
const cors = require('cors');

const loginRoutes = require('./routes/LoginRoutes');
const usersRoutes = require('./routes/UsersRoutes');
const productsRoutes = require('./routes/ProductsRoutes');
const salesRoutes = require('./routes/SalesRoutes');
const sellerRoutes = require('./routes/SellerRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', usersRoutes);
app.use('/login', loginRoutes);
app.use('/', productsRoutes);
app.use('/sales', salesRoutes);
app.use('/seller', sellerRoutes);

module.exports = app;