const express = require('express');
const helmet = require('helmet');
const dotEnv = require('dotenv');
const sequelize = require('./config/database');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const userRoutes = require('./routes/user-routes');
const mediaRoutes = require('./routes/media-routes');
const commentRoutes = require('./routes/comment-routes');
const adminRoutes = require('./routes/admin-routes');


const app = express();

dotEnv.config({ path:'/config/.env'});

app.use(helmet());
app.use(cors({
  origin: function(origin, callback) {
    callback(null, true);
  },
  credentials: true
}));
app.use(cookieParser());

// a method inbuilt in express to recognize the incoming Request Object as a JSON Object
app.use(express.json());

app.use(express.static(__dirname + '/public/'));

// check port validity
const normalizePort = val => {
    const port = parseInt(val, 10);
  
    if (isNaN(port)) {
      return val;
    }
    if (port >= 0) {
      return port;
    }
    return false;
  };
  
  const port = normalizePort(process.env.PORT || '4000');

  // check database connection
  sequelize
  .authenticate()
  .then(() => {
    console.log('connexion à la database réussie');
  }).catch((err) => {
    console.log('connexion échouée avec la database', err);
  });
  
  // synchronise database table
  sequelize
    .sync()
    .then((result) => {
      //console.log(result);
    }).catch((err) => {
      console.error(err);
    });

    
    // monte les chemins
    app.use('/api/user', userRoutes);
    app.use('/api/media', mediaRoutes);
    app.use('/api/comment', commentRoutes);
    app.use('/api/admin', adminRoutes);
    
    
    // launch server
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
    
    module.exports = app;