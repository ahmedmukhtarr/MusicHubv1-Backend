const app = require('./app');
require('dotenv').config();
const passport = require('.//config/passport-config');

app.use(passport.initialize());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
