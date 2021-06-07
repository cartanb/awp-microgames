const router = require('express').Router();
const path = require('path');

router.get('/', (req, res, next) => {
  try {
    res.send('hello world');
  } catch (error) {
    next(error);
  }
});

router.get('/assets/:name', (req, res, next) => {
  try {
    res.sendFile(
      path.join(__dirname, `/../../games/assets/${req.params.name}`)
    );
  } catch (error) {
    next(error);
  }
});

router.use((req, res, next) => {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

module.exports = router;
