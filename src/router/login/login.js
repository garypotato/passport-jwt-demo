const express = require('express');
const router = express.Router();
const persons = require('../../database/persons');
const generateToken = require('./serviceLogin');

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  const user = persons.filter(user => {
    return user.name == name;
  })[0];

  if (!user) return res.status(401).send('user not exist');
  if (user.password != password) return res.status(401).send('wrong password');

  res.status(200).send({
    code: 200,
    token: generateToken(user),
  });
});

module.exports = router;
