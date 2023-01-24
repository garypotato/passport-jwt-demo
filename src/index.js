const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./router/login/login');
const homeRouter = require('./router/home/home');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const persons = require('./database/persons');

const app = express();

const opts = { jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'), secretOrKey: 'shhhhh' };

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    const user = persons.filter(user => {
      return user.name == jwt_payload.user.name;
    })[0];

    if (!user) return done('user not exist', false);

    return done(null, user);
  })
);

const port = 3000;

app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/user', userRouter);
app.use('/home', passport.authenticate('jwt', { session: false }), homeRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
