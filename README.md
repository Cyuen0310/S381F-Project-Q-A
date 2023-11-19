# Q&A Platform

## Group 42
- Fung Yin Ho (13163477)
- Kwok Wing Yan (13167777)
- Chan Sze Yuen (13342990)
- Chan Chi Ho (13340738)

Application link: [Q&A Platform](https://qanda-1osh.onrender.com/)
********************************************
# Introduction
> This is a Question and answer platform, user can ask and answer the question here, they can also search the question to see is there any solved problem to save the time of wait for someone to answer the question.
 *******************************************
# Instruction of using at own linux device

To run at own device, follow these steps:

1. Clone the repo.
   > git clone https://github.com/Cyuen0310/Q-A.git
2. Installing Platform Dependencies.
   > npm install
3. Reinstalling nodemon.
   > sudo npm install -g nodemon
4. Enter your MangoDB link in ```db.js``` at server folder.
   > const uri = "Enter your MangoDB connect link";
5. Run the Platform.
   > npm start
 *******************************************
# Register

To registered a account of Q&A platform, follow these steps:

1. Click on the "Register" button at Login page.
2. Fill in the non-registered username, password and email.
> Password: The password should have a minimum length of 8 characters and a maximum length of 20 characters.
3. Click on the "Register" button to create account.
4.  
 *******************************************
# Login
To login the Q&A platform, follow these steps:

1. Go to the Login page.
2. Fill in the registered username and password.
> Password: The password should have a minimum length of 8 characters and a maximum length of 20 characters.
3. Click on the "Login" button.

Default account:
> {username: abc, password: 12345678}
> {username: user, password: 87412365}
> {username: def987, password: ab654321}

********************************************
# Logout
To logout the account, follow these steps:

1. Back to main page.
2. Click on the "Logout" button.

********************************************
# CRUD service
## Creating a Question
To create a new question, follow these steps:

1. Click on the "Ask question" button.
2.  Fill in the title and description of your question. 
	> Title: The title should be a unique value.

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
## Searching specified question by Title or Questioner
To search for questions by title or questioner, follow these steps:

1. Enter your search query in the search bar.
2. Click on the "Search" button or press Enter.
3. The page will display the questions that match the search query in the title or questioner fields.

********************************************
# Restful
In this project, there are three  request types, ,  and .


For all restful CRUD services, login should be done at first.
