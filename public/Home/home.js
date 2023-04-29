// // select the student and professor buttons
// const studentButton = document.querySelector('.student-button');
// const profButton = document.querySelector('.prof-button');

// // add event listeners to the buttons
// studentButton.addEventListener('click', redirectToLogin);
// profButton.addEventListener('click', redirectToLogin);

// // function to redirect to the login page
// function redirectToLogin() {
//   window.location.href = 'http://127.0.0.1:3000/Login/login.html';
// }
var studentButton = document.querySelectorAll(".student-button");

studentButton.addEventListener("click", function()
{
	alert("I got clicked!");
});