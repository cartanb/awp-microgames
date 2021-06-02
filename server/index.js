const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

//logging middleware
app.use(morgan('dev'));

//static middleware
app.use(express.static(path.join(__dirname, '../public/')));
app.use(express.static(path.join(__dirname, '../games/jump-demo/assets/')));

//body-parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', require('./api'));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`listening on ${PORT}`));

module.exports = app;
