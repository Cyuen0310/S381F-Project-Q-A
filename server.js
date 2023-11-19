const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require('cookie-parser')
const Question = require("./models/questionmd");
const Comment = require("./models/commentsmd");
const User = require("./models/usermd");
const connectdb = require("./server/db");
const secureRandomString = require("secure-random-string");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const questionRouter = require("./routes/question");

const port = process.env.PORT || 8000; 
const app = express();
const bodyParser = require('body-parser');
const ObjectId = mongoose.Types.ObjectId;
const Joi = require('joi');
const slugify = require('slugify');


connectdb();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.use(express.static("public"));
app.use("/css", express.static(__dirname + "/public/css")); 
app.use("/js", express.static(__dirname + "/public/js"));
app.use("/img", express.static(__dirname + "/public/img"));

app.use(cookieParser());
app.use(
  session({
    secret: secureRandomString({ length: 32 }),
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
  })
);

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/questions", async (req, res) => {
  try {
    if (req.session.userid) {
      let filter = {};
      const searchQuery = req.query.searchQuery;

      if (searchQuery) {
        filter = {
          $or: [
            { title: { $regex: searchQuery, $options: "i" } },
            { questionername: { $regex: searchQuery, $options: "i" } },
          ],
        };
      }
      const sessionUser = req.session.username;
      const questions = await Question.find(filter).sort({ createdAt: "desc" });
      res.render("questions/index", { questions, searchQuery, sessionUser });
    } else {
      res.redirect("/login");
    }
  } catch (error) {
    console.error(error);
    res.render("error"); 
  }
});

app.use("/questions", questionRouter);
app.use("/login", loginRouter);
app.use("/", loginRouter);
app.use("/resetPassword", loginRouter);
app.use("/register", registerRouter);

app.listen(port, () => console.info(`Server started on port ${port}`));
function generateSlug(title) {
  return title.toLowerCase().replace(/\s+/g, '-');
}
// Path 1
// GET Path get the username (from _name)
// curl -X GET localhost:8000/username/getuser
//
app.get('/username/:username', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ' + req.body);
  console.log('Username: ' + req.params.username);

  const username = req.params.username;

  User.findOne({ name: username })
    .then(user => {
      if (!user) {
        res.status(404).send('User not found');
      } else {
        res.status(200).json(user);
      }
    })
    .catch(error => {
      res.status(500).send('An error occurred');
    });
});

//Path 2
//GET Path get the T and des without user (from _id)
//curl -X GET localhost:8000/questionid/6559b368192902bac60f3209
//
app.get('/questionid/:questionid', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ' + JSON.stringify(req.body));
  console.log('db_id: ' + req.params.questionid);

  const questionId = req.params.questionid;
  
  Question.findById(questionId)
    .then(question => {
         if (!question) {
        res.status(404).send('Question not found');
      } else {
        res.status(200).json({question});
      }
      }
    )
});

//Path 3
//GET Path get the T and des without user (from _id)
//curl -X GET localhost:8000/questioner/getuser
//
app.get('/questioner/:questioner', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ' + JSON.stringify(req.body));

  const questionerName = req.params.questioner;

  Question.find({ questionername: questionerName })
    .then(questions => {
      if (questions.length === 0) {
        res.status(404).send('Questions not found for the specified questioner');
      } else {
        const questionData = questions.map(question => ({
          title: question.title,
          description: question.description
        }));

        res.status(200).json(questionData);
      }
    })
    .catch(error => {
      console.error('An error occurred:', error);
      res.status(500).send('An error occurred');
    });
});

//Path 4
//POST Path for adding user
//curl -H "Content-Type: application/json" -X POST -d '{"name": "addnewuser","password":"12345678910","email":"add@gamil.com"}' localhost:8000/users
//{"name":"addnewuser","password":"12345678910","email":"add@gamil.com", "_id":"6558e2d64adf1e08c66a17cd","createdAt":"2023-11-18T16:14:14.700Z","__v":0}
app.post('/users', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ' + JSON.stringify(req.body));

  const { name, password, email } = req.body;

  User.findOne({ name: name })
    .then(existingUser => {
      if (existingUser) {
        res.status(409).send('Username already exists');
      } else {
        const newUser = new User({ name, password ,email});
        newUser.save()
          .then(savedUser => {
            res.status(201).json(savedUser);
          })
          .catch(error => {
            res.status(500).send('An error occurred');
          });
      }
    })
    .catch(error => {
      res.status(500).send('An error occurred');
    });
});

//Path 5
// delete user by user name
//curl -X DELETE localhost:8000/username/delete1
//User and associated data deleted successfully
app.delete('/username/:username', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ', req.body);

  const username = req.params.username;

  User.findOneAndDelete({ name: username })
    .then(deletedUser => {
      if (!deletedUser) {
        res.status(404).send('User not found');
      } else {
        Question.find({ questionername: username })
          .then(questions => {
            const questionIds = questions.map(question => question._id)
            Comment.deleteMany({ questionid: { $in: questionIds } })
              .then(() => {
                Question.deleteMany({ _id: { $in: questionIds } })
                  .then(() => {
                    res.status(200).json({ message: "User and associated data deleted successfully", deletedUser });
                  })
                  .catch(err => {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                  });
              })
              .catch(err => {
                console.error(err);
                res.status(500).send('Internal Server Error');
              });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

//Path 6
// delete the question with id
//curl -X DELETE localhost:8000/questionid/6559b368192902bac60f3209
//Question and associated data deleted successfully
app.delete('/questionid/:questionId', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ', req.body);

  const questionId = req.params.questionId;

  Question.findOneAndDelete({ _id: questionId })
    .then(deletedQuestion => {
      if (!deletedQuestion) {
        res.status(404).send('Question not found');
      } else {
        Comment.deleteMany({ questionid: questionId })
          .then(() => {
            res.status(200).json({ message: "Question and associated data deleted successfully", deletedQuestion });
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});
// Path 7
// DELETE Path for deleting comment
// curl -X DELETE localhost:8000/commentid/6559b87a192902bac60f321e
//Comment deleted successfully
app.delete('/commentid/:commentid', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ', req.body);
  console.log('commentid: ' + req.params.commentid);

  const commentId = req.params.commentid;

  Comment.findByIdAndDelete(commentId)
    .then(deletedComment => {
      if (!deletedComment) {
        res.status(404).send('Comment not found');
      } else {
        Question.findOneAndUpdate(
          { comments: commentId },
          { $pull: { comments: commentId } },
          { new: true }
        )
          .then(updatedQuestion => {
            if (!updatedQuestion) {
              res.status(404).send('Question not found');
            } else {
              res.status(200).json({ message: "Comment data deleted successfully", deletedComment });
            }
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});
//Path 8
//PUT path to update name,password,updatetime from _id
//curl -H "Content-Type: application/json" -X PUT -d '{"name": "afterupdate", "password": "123456789101112","email":"au@gmail.com"}' localhost:8000/userid/6559bd063784380cce17d84d

app.put('/userid/:userid', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ' + JSON.stringify(req.body));
  console.log('user_id: ' + req.params.userid);
  
  const userId = req.params.userid;
  const updatedFields = {
    name: req.body.name,
    password: req.body.password,
    email: req.body.email
  };

  User.findByIdAndUpdate(userId, updatedFields, { new: true })
    .then(updatedUser => {
      if (!updatedUser) {
        res.status(404).send('User not found');
      } else {
        Question.updateMany({ questioner: userId }, { questionername: updatedFields.name })
          .then(() => {
            return Comment.updateMany({ respondent: userId }, { respondentname: updatedFields.name });
          })
          .then(() => {
            res.status(200).json({message:"The user have been updated!" ,updatedUser});
          })
          .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
          });
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});

//Path 9
//PUT path to update the title and description
//curl -H "Content-Type: application/json" -X PUT -d '{"title": "Updated Question", "description": "123"}' localhost:8000/questionid/6559bd1d3784380cce17d853

app.put('/questionid/:questionid', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ' + JSON.stringify(req.body));
  console.log('Question_id: ' + req.params.questionid);
  
  const questionId = req.params.questionid;

  const newSlug = generateSlug(req.body.title);

  req.body.slug = newSlug;

  Question.findByIdAndUpdate(questionId, req.body, { new: true })
    .then(updatedQuestion => {
      if (!updatedQuestion) {
        res.status(404).send('Question not found');
      } else {
        res.status(200).json({message:"The Question has been updated",updatedQuestion});
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});
//Path 10
//PUT Path to upadte the comment form the id
//curl -H "Content-Type: application/json" -X PUT -d '{"comment": "Updated Comment"}' localhost:8000/commentid/6559bd2a3784380cce17d859

app.put('/commentid/:commentid', function(req, res) {
  console.log('Incoming request: ' + req.method);
  console.log('Path: ' + req.path);
  console.log('Request body: ' + JSON.stringify(req.body));
  console.log('Comment_id: ' + req.params.commentid);
  
  const commentId = req.params.commentid;

  Comment.findByIdAndUpdate(commentId, req.body, { new: true })
    .then(updatedComment => {
      if (!updatedComment) {
        res.status(404).send('Comment not found');
      } else {
        res.status(200).json({message:"The Comment has been updated",updatedComment});
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).send('Internal Server Error');
    });
});
