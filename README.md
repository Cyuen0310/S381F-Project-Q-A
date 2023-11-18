Q&A platform
Group 42
Name:
	Fung Yin Ho (13163477)
	Kwok Wing Yan(13167777)
	Chan Sze Yuen(13342990)
	Chan Chi Ho(13340738)

Application link: https://qanda-1osh.onrender.com/
********************************************
#Introduction
	This is a Question and answer platform, user can ask and answer the question here, they can also search the question to see is there any solved problem to save the time of wait for someone to answer the question. 
********************************************
#Login

#Register a account
Input the name, password, email at the blank and press the register button.

##Go to the Login page
After register, broswer will return to the login page.

###Input the username and password
Input the username and password at the username and password blank.

####Press the Login button
Press the login button and login the Q&A system.

Default account:
[
	{userid: abc, password: 12345678},
	{userid: user, password: 87412365},
	{userid: def987, password: ab654321}

]

After successful login, userid is stored in session.
********************************************
# Logout
Each user can log out their account by clicking the logout button at the home page.
#Back to main page
If user are inside one of the question, press back to return the main page.

#Press the Logout button
Press the logout button, clean the cockie and back to the login page.

********************************************
# CRUD service
-Creating a Question
To create a new question, follow these steps:

#Click on the "Ask question" button.
#Fill in the title and description of your question.
	#Title: The title should be a unique value.
	#Description: Provide a detailed description of your question.
#Click on the "Submit" button to create the question.
#Verify that the question appears on the website's question list.

********************************************
# CRUD service
-Adding a Comment
To add a comment to a question, perform the following steps:

Click on the "Details" button on the question details page.
Scroll down to the comment section.
Enter your comment in the provided input field.
Click on the "Submit" button to add the comment.
Verify that the comment appears below the question.


********************************************
# CRUD service
-Updating account password
To update the account password, perform the following steps:

Click on the "Reset Password" button.
Enter your registered Email and the new password.
	Password: The password should have a minimum length of 8 characters and a maximum length of 20 characters.
Click on the "Reset" button to submit your new password.
You will be redirected to the login page.
Verify that the new password is valid when logging in.

********************************************
# CRUD service
-Deleting a Question
To delete your question, follow these instructions:

Locate the question you want to delete on the question list or detail page.
Click on the delete button.
Confirm the deletion when prompted.
Verify that the question and associated comments are no longer visible on the website.

********************************************
# CRUD service
-Searching specified question by Title or Questioner
To search for questions by title or questioner, follow these steps:

Enter your search query in the search bar.
Click on the "Search" button or press Enter.
The page will display the questions that match the search query in the title or questioner fields.

********************************************
# Restful
In this project, there are three  request types, ,  and .


For all restful CRUD services, login should be done at first.
