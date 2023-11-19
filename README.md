# Q&A Platform

## Group 42
- Fung Yin Ho (13163477)
- Kwok Wing Yan (13167777)
- Chan Sze Yuen (13342990)
- Chan Chi Ho (13340738)

Application link: [Q&A Platform](https://qanda-1osh.onrender.com/)
********************************************
# Introduction
In this project, we implement a Question and answer platform using the mangoDB, This platform can handle these mentioned function:
1. Register
2. Login
3. Logout
4. Create Question
5. Adding comment
6. Update Account password
7. Delete Question
8. Searching specified question by Title or Questioner
 *******************************************
# Instruction of using at own linux device

To run at own device, follow these steps:

1. Clone the repo.
  ```
	git clone https://github.com/Cyuen0310/Q-A.git
  ``` 
2. Installing Platform Dependencies.
  ```
	npm install
  ```
3. Reinstalling nodemon.
  ```
	sudo npm install -g nodemon
  ```
4. Enter your MangoDB link in ```db.js``` at server folder.
  ```
	const uri = "Enter your MangoDB connect link";
  ```
5. Run the Platform.
  ```
	npm start
  ```
 *******************************************
# Register

To registered a account of Q&A platform, follow these steps:

1. Click on the "Register" button at Login page.
2. Fill in the non-registered username, password and email.
	> Password: The password should have a minimum length of 8 characters and a maximum length of 20 characters.
 
3. Click on the "Register" button to create account.
4. You will be redirected to the login page.
5. Verify that the account has been create using login.
 *******************************************
# Login
To login the Q&A platform, follow these steps:

1. Go to the Login page.
2. Fill in the registered username and password.
	> Password: The password should have a minimum length of 8 characters and a maximum length of 20 characters.
 
3. Click on the "Login" button.
4. Verify that the account is valid when logging in.

Default account:

> {name: "def987"  password: "ab654321"  email: "def987@gmail.com"}

> {name: "user"  password: "87412365"  email: "user@gmail.com"}

> {name: "try1"  password: "try123456"  email: "try@gmail.com"}

********************************************
# Logout
To logout the account, follow these steps:

1. Back to main page.
2. Click on the "Logout" button.
3. Valid that the cockie of login session has been clean.

********************************************
# CRUD service
For some of the restful CRUD services, login should be done first.
## Creating a Question
To create a new question, follow these steps:

1. Click on the "Ask question" button.
2.  Fill in the title and description of your question. 
	> Title: The title should be unique.

	> Description: Provide a detailed description of your question.
3. Click on the "Submit" button to create the question.
4. Verify that the question appears on the website's question list.

********************************************
## Adding a Comment
To add a comment to a question, perform the following steps:

1. Click on the "Details" button on the question details page.
2. Scroll down to the comment section.
3. Enter your comment in the provided input field.
4. Click on the "Submit" button to add the comment.
5. Verify that the comment appears below the question.


********************************************
## Updating account password
To update the account password, perform the following steps:

1. Click on the "Reset Password" button.
2. Enter your registered Email and the new password. 
	> Password: The password should have a minimum length of 8 characters and a maximum length of 20 characters.

3. Click on the "Reset" button to submit your new password.
4. You will be redirected to the login page.
5. Verify that the new password is valid when logging in.

********************************************
## Deleting a Question
To delete your question, follow these instructions:

1. Locate the question you want to delete on the question list or detail page.
2. Click on the delete button.
3. Confirm the deletion when prompted.
4. Verify that the question and associated comments are no longer visible on the website.

********************************************
## Searching specified questions by Title or Questioner
To search for questions by title or questioner, follow these steps:

1. Enter your search query in the search bar.
2. Click on the "Search" button or press Enter.
3. The page will display the questions that match the search query in the title or questioner fields.

********************************************
# Restful
Introduction

We have HTTP four request types including GET, POST, PUT, and DELETE. All the responses from the terminal all be in JSON format, except DELETE because delete will show the result in text by telling the developer the information has been deleted.

About GET
We have three paths to get different information

1. Get all the information from one user
format:/username/:username
curl: curl -X GET localhost:8000/username/getuser
respond:
explain: this curl verifies the name of the user, because the name is unique, and the whole data in the database will be shown, including name, password, and email. 

2. Get specific question information
format:/questionid/:questionid
curl: curl -X GET localhost:8000/questionid/6558e067514ddbff44f80b6c
respond:
explain： This curl will find the previous question by using the _id, the _id in every question is unique, and all the information of the question will be shown in the terminal, including title, description, and comment _id in an array.

3. Get all the questions that the user asked before
format:/questioner/:questioner
curl:curl -X GET localhost:8000/questioner/getuser
respond:
explain: this curl find out all questions asked by the users, the all title with the description will be shown.

About POST
We have one path to adding information

1. POST a new user
format:/users
curl: curl -H "Content-Type: application/json" -X POST -d '{"name": "addnewuser","password":"12345678910","email":"add@gamil.com"}' localhost:8000/users
respond:{"name":"addnewuser","password":"12345678910","email":"add@gamil.com", "_id":"6558e2d64adf1e08c66a17cd","createdAt":"2023-11-18T16:14:14.700Z","__v":0}
explain: we can add a new user by sending completed information to the terminal and add a new user to the database, after adding the web can use that information to log in.
Additional Notes: The _id and the createdAT is not fixed, the _id is generated by the MongoDB database itself and the createdAt is depends on the time you create this user.

About DELETE
We have three paths to deleting information

1. DELETE a user
format:/username/:username
curl:curl -X DELETE localhost:8000/username/delete1
respond:User and associated data deleted successfully
explain: we can delete a user via the user name, the user name is unique. The question including all the questions this user has asked and the following messages that this user has left and the messages that other users have left on this question will be deleted. At the same time, the past comments this user has left on other questions will also be deleted.

2. DELETE a question
format:/questionid/:questionId
curl:curl -X DELETE localhost:8000/questionid/6558e4514adf1e08c66a180b
respond:Question and associated data deleted successfully
explain: Deleting this question via the question _id will delete all the content and all the following comments will also be deleted.

3. DELETE a comment
format:/commentid/:commentid
curl:curl -X DELETE localhost:8000/commentid/6558e4ee4adf1e08c66a182c
respond: Comment deleted successfully
explain: Deleting this comment via the comment _id will delete all its content.

About PUT
We have three paths to updating information

1. PUT a user information
format:/userid/:userid
curl:curl -H "Content-Type: application/json" -X PUT -d '{"name": "afterupdat", "password": "123456789101112","email":"au@gmail.com"}' localhost:8000/userid/6558e6f8bbc150f255de67b2
respond:
explain: Update all user information including name, password, and email address. The user's previous name in questions and comments will also be updated when the name is updated.

2. PUT a new question title and description
format:/questionid/:questionid
curl:curl -H "Content-Type: application/json" -X PUT -d '{"title": "Updated Question", "description": "123"}' localhost:8000/questionid/6558e7eabbc150f255de67cf
respond:
explain:Update the title and description, with a new  title and description via the question _id.

3. PUT a new comment
format:/commentid/:commentid
curl:curl -H "Content-Type: application/json" -X PUT -d '{"comment": "Updated Comment"}' localhost:8000/commentid/6558e7efbbc150f255de67d4
respond:
explain:Update the comment, with a new comment via the comment _id.


