require('dotenv/config')
const mongoose = require('mongoose');
const app = require('./app');

mongoose.connect(process.env.MONGODB_URI,
  { useNewUrlParser: true,
    })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Express server démarré sur le port ' + port);
});
  