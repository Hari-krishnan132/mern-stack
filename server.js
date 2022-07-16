const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
  });
 }

const uri = "mongodb+srv://dbUser:dbPassword@cluster1.d4ycx.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./routes/users');
const exercisesRouter = require('./routes/exercises');
const progressionsRouter = require('./routes/progressions');
const routinesRouter = require('./routes/routines');
const workoutlogsRouter = require('./routes/workoutlogs');


app.use('/api/users', usersRouter);
app.use('/api/exercises', exercisesRouter);
app.use('/api/progressions', progressionsRouter);
app.use('/api/routines', routinesRouter);
app.use('/api/workoutlogs', workoutlogsRouter);


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
