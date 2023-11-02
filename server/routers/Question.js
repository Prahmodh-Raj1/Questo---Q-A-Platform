const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const QuestionDB = require("../models/Question");
const Answer = require("../models/Answer");
const Comment = require("../models/Comment");

  router.post("/", async (req, res) => {
    const questionData = new QuestionDB({
      title: req.body.title,
      body: req.body.body,
      tags: req.body.tags,
      user: req.body.user,
    });
    await questionData
      .save()
      .then((doc) => {
        res.status(201).send(doc);
      })
      .catch((err) => {
        res.status(400).send({
          message: "Question not added successfully",
        });
      });
  }); 
router.get("/retrieve", async (req, res) => {

  try {
    const questions = await QuestionDB.countDocuments();
    const answers = await Answer.countDocuments();
    const comments = await Comment.countDocuments();

    const data = {
      labels: ['Questions', 'Answers', 'Comments'],
      datasets: [{
        label: 'Count',
        data: [questions, answers, comments],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56'
        ]
      }]
    };
    console.log(data.datasets);
    res.json(data);
  
  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving data');
  }

});

router.get('/stats', async (req, res) => {

  const questionCount = await QuestionDB.countDocuments();

  const answerCount = await Answer.countDocuments();

  const commentCount = await Comment.countDocuments();

  const latestQuestion = await QuestionDB.findOne({})
                                .sort({created_at: -1})
                                .limit(1);

  const stats = {
    questionCount,
    answerCount, 
    commentCount,
    latestQuestionTime: latestQuestion ? latestQuestion.created_at : null  
  };
  console.log(stats);
  res.json(stats);

});

router.get("/topQuestions", async (req, res) => {

  try {
    const questions = await QuestionDB.aggregate([
      {
        $lookup: {
          from: 'answers', 
          localField: '_id',
          foreignField: 'question_id',
          as: 'answers'
        }
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'question_id',
          as: 'comments'  
        }
      },
      {
        $project: {
          id: 1,
          activity: { $size: { $concatArrays: ['$answers', '$comments'] } } 
        }
      },
      { $sort : { activity : -1 } },
      { $limit : 5 }
    ]);
    console.log(questions)
    res.json(questions);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error retrieving top questions');
  }

});

router.get("/tags",async (req, res) => {
  try {
    const questions = await QuestionDB.find();
    
    // Get all tags
    let allTags = [];
    questions.forEach(q => {
      allTags.push(...q.tags); 
    });
    
    // Count frequency of each tag
    let tagCounts = {};
    allTags.forEach(t => {
      if(!tagCounts[t]) {
        tagCounts[t] = 0;
      }
      tagCounts[t]++;
    });
    
    // Sort by count to get top 5
    let topTags = Object.keys(tagCounts)
      .sort((a,b) => tagCounts[a] - tagCounts[b])
      .slice(0, 10);

    // Structure data for chart
    let chartData = {
      labels: topTags, 
      datasets: [
        {
          label: 'Frequency',
          data: topTags.map(t => tagCounts[t]) 
        }
      ]
    };
    console.log(chartData.datasets);
    res.json(chartData);
    
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error'); 
  }
})

router.get("/:id", async (req, res) => {
  try {
    const question = await QuestionDB.findOne({ _id: req.params.id }).exec();

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Use Promise.all to fetch answers and comments for the question
    const [answers, comments] = await Promise.all([
      Answer.find({ question_id: req.params.id }).exec(),
      Comment.find({ question_id: req.params.id }).exec(),
    ]);

    const questionDetails = {
      question,
      answers,
      comments,
    };
    console.log(questionDetails);
    res.status(200).json(questionDetails);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
router.get("/", async (req, res) => {
  const error = {
    message: "Error in retrieving questions",
    error: "Bad request",
  };

  QuestionDB.aggregate([
    {
      $lookup: {
        from: "comments",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              comment: 1,
              created_at: 1,
              // question_id: 1,
            },
          },
        ],
        as: "comments",
      },
    },
    {
      $lookup: {
        from: "answers",
        let: { question_id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$question_id", "$$question_id"],
              },
            },
          },
          {
            $project: {
              _id: 1,
              // user_id: 1,
              // answer: 1,
              // created_at: 1,
              // question_id: 1,
              // created_at: 1,
            },
          },
        ],
        as: "answerDetails",
      },
    },
    // {
    //   $unwind: {
    //     path: "$answerDetails",
    //     preserveNullAndEmptyArrays: true,
    //   },
    // },
    {
      $project: {
        __v: 0,
        // _id: "$_id",
        // answerDetails: { $first: "$answerDetails" },
      },
    },
  ])
    .exec()
    .then((questionDetails) => {
      res.status(200).send(questionDetails);
    })
    .catch((e) => {
      console.log("Error: ", e);
      res.status(400).send(error);
    });
});

module.exports = router;