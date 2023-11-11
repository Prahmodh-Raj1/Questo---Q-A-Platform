const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const AnswerDB = require('../models/Answer')

router.post('/', async (req, res) => {
    const answerData = new AnswerDB({
        question_id: req.body.question_id,
        answer: req.body.answer,
        user: req.body.user
    });

    try {
        const doc = await answerData.save();
        res.status(201).send({
            status: true,
            data: doc
        });
    } catch (err) {
        res.status(400).send({
            status: false,
            message: "Error while adding answer"
        });
    }
});
router.put('/:id/downvote', async (req, res) => {
    try {
      const answer = await AnswerDB.findById(req.params.id);
      answer.votes -= 1;
      await answer.save();
      res.json(answer);
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });

  router.put('/:id/upvote', async (req, res) => {
    try {
      const answer = await AnswerDB.findById(req.params.id);
      answer.votes += 1;
      await answer.save();
      res.json(answer); 
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });


module.exports = router