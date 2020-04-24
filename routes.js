const express = require("express");
const app = express();
const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  joke: {
    type: String,
    unique: true,
    required: true,
  },
  joker: String,
  votes: {
    like: Number,
    dislike: Number,
  },
});
const Joke = mongoose.model("Joke", schema);

app.get("/joke", async (req, res) => {
  try {
    const allJokes = await Joke.find({});
    const jokeAmount = allJokes.length;
    return res.json({
      joke: allJokes[Math.floor(Math.random() * jokeAmount)],
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error,
      message: error.message,
    });
  }
});
app.post("/joke", async (req, res) => {
  try {
    const newJoke = new Joke({
      ...req.body,
    });
    await newJoke.save();
    return res.json({
      joke: newJoke,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error,
      message: error.message,
    });
  }
});
app.put("/joke/:jokeId", async (req, res) => {
  try {
    const newJoke = await Joke.findByIdAndUpdate(
      req.params.jokeId,
      req.body.liked
        ? { $inc: { "votes.like": 1 } }
        : { $inc: { "votes.dislike": 1 } },
      { new: true, useFindAndModify: false }
    );
    return res.json({
      joke: newJoke,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).json({
      error,
      message: error.message,
    });
  }
});

module.exports = app;
