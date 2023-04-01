const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Entry = require('./models/entry');

const app = express();

mongoose.connect('mongodb+srv://abrunst:Jell.o2022@cluster0.qdazkmh.mongodb.net/bad_jokes?retryWrites=true&w=majority')
.then(() => {
  console.log('Connected to Database!');
})
.catch(() => {
  console.log('Connection Failed!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
})

app.post('/api/entries', (req, res, next) => {
  const entry = new Entry({
    joke: req.body.joke,
    answer: req.body.answer
  });
  entry.save().then(createdEntry => {
    res.status(201).json({
      message: 'Entry added successfully',
      entryId: createdEntry._id
    });
  });
});

app.get('/api/entries', (req, res, next) => {
  Entry.find()
    .then(documents => {
      res.status(200).json({
        message: 'Jokes fetched successfully!',
        entries: documents
      });
    });
});

app.delete('/api/entries/:id', (req, res, next) => {
  Entry.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({message: 'Post deleted!'});
  })
})

module.exports = app;
